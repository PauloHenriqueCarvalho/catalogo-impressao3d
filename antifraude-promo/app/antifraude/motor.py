"""Orquestra as camadas do antifraude para cada nota enviada."""

from dataclasses import asdict, dataclass, field
from datetime import datetime, timedelta
from typing import Callable

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..models import APROVADA, EM_VALIDACAO, REJEITADA, REVISAO, Campanha, Nota, Participante
from ..pix.base import ConsultaPix
from ..sefaz.base import ConsultaSefaz, SefazIndisponivel, SituacaoNota
from ..validacao.chave import InfoChave
from .regras import Rejeicao, verificar_chave, verificar_duplicidade, verificar_limites, verificar_sefaz
from .sinais import comparar_ocr, sinais_de_comportamento

# Nota em contingência pode demorar para aparecer na Sefaz; depois deste prazo é rejeitada.
PRAZO_CONTINGENCIA = timedelta(hours=48)


@dataclass
class ResultadoGanhador:
    apto: bool
    pendencias: list[str] = field(default_factory=list)
    notas_validas: int = 0
    notas_invalidadas: list[str] = field(default_factory=list)


class MotorAntifraude:
    def __init__(self, db: Session, sefaz: ConsultaSefaz, agora: Callable[[], datetime] = datetime.now):
        self.db = db
        self.sefaz = sefaz
        self.agora = agora

    def receber_nota(
        self,
        campanha: Campanha,
        participante: Participante,
        info: InfoChave,
        *,
        dispositivo_id: str | None = None,
        ip: str | None = None,
        dados_ocr: dict | None = None,
    ) -> Nota:
        agora = self.agora()
        nota = Nota(
            campanha_id=campanha.id,
            participante_id=participante.id,
            chave=info.chave,
            uf=info.uf,
            cnpj_emitente=info.cnpj,
            modelo=info.modelo,
            serie=info.serie,
            numero=info.numero,
            tipo_emissao=info.tipo_emissao,
            dispositivo_id=dispositivo_id,
            ip=ip,
            dados_ocr=dados_ocr,
            status=EM_VALIDACAO,
            criada_em=agora,
            motivos=[],
        )

        rejeicao = (
            (Rejeicao("participante_bloqueado", participante.motivo_bloqueio or "CPF bloqueado.") if participante.bloqueado else None)
            or verificar_chave(campanha, info)
            or verificar_duplicidade(self.db, campanha, info.chave)
            or verificar_limites(self.db, campanha, participante, agora)
        )
        if rejeicao:
            return self._salvar_rejeitada(nota, rejeicao)

        self.db.add(nota)
        try:
            self.db.flush()
        except IntegrityError:
            # Dois envios simultâneos da mesma chave: o índice único barra o segundo.
            self.db.rollback()
            return self._salvar_rejeitada(nota, Rejeicao("nota_duplicada", "Esta nota já foi cadastrada na campanha."))

        self.validar_na_sefaz(nota, campanha, participante)
        return nota

    def validar_na_sefaz(self, nota: Nota, campanha: Campanha, participante: Participante) -> Nota:
        agora = self.agora()
        nota.tentativas_sefaz += 1
        try:
            resultado = self.sefaz.consultar(nota.chave)
        except SefazIndisponivel:
            return self._manter_em_validacao(nota, "sefaz_indisponivel", "Sefaz fora do ar; nova tentativa automática.")

        if resultado.situacao == SituacaoNota.NAO_ENCONTRADA and nota.tipo_emissao != 1:
            if agora - nota.criada_em < PRAZO_CONTINGENCIA:
                return self._manter_em_validacao(
                    nota, "aguardando_contingencia", "Nota emitida em contingência; aguardando transmissão à Sefaz."
                )

        nota.dados_sefaz = resultado.para_json()
        nota.data_emissao = resultado.data_emissao
        nota.cpf_consumidor = resultado.cpf_consumidor

        rejeicao, valor = verificar_sefaz(campanha, participante, resultado)
        nota.valor_participante = valor
        if rejeicao:
            return self._salvar_rejeitada(nota, rejeicao)

        sinais = comparar_ocr(nota.dados_ocr, resultado) + sinais_de_comportamento(
            self.db, nota, participante, resultado, agora
        )
        nota.pontuacao = sum(s.pontos for s in sinais)
        nota.motivos = [asdict(s) for s in sinais]
        if nota.pontuacao <= campanha.limite_aprovacao:
            nota.status = APROVADA
        elif nota.pontuacao <= campanha.limite_rejeicao:
            nota.status = REVISAO
        else:
            nota.status = REJEITADA
        self.db.commit()
        return nota

    def reprocessar_pendentes(self, campanha: Campanha) -> list[Nota]:
        pendentes = self.db.scalars(
            select(Nota).where(Nota.campanha_id == campanha.id, Nota.status == EM_VALIDACAO)
        ).all()
        return [self.validar_na_sefaz(n, campanha, n.participante) for n in pendentes]

    def revisar(self, nota: Nota, *, aprovar: bool, revisor: str, observacao: str | None, bloquear: bool) -> Nota:
        nota.status = APROVADA if aprovar else REJEITADA
        nota.revisado_por = revisor
        nota.observacao_revisao = observacao
        if bloquear:
            nota.participante.bloqueado = True
            nota.participante.motivo_bloqueio = observacao or f"Bloqueado na revisão por {revisor}."
        self.db.commit()
        return nota

    def verificar_ganhador(
        self,
        campanha: Campanha,
        participante: Participante,
        *,
        pix: ConsultaPix,
        chave_pix: str,
        identidade_verificada: bool,
    ) -> ResultadoGanhador:
        """Camada 4: o ganhador passa por todas as checagens de novo antes de receber."""
        resultado = ResultadoGanhador(apto=False)
        if participante.bloqueado:
            resultado.pendencias.append("participante_bloqueado")

        notas = self.db.scalars(select(Nota).where(Nota.participante_id == participante.id)).all()
        for nota in (n for n in notas if n.status == APROVADA):
            try:
                atual = self.sefaz.consultar(nota.chave)
            except SefazIndisponivel:
                resultado.pendencias.append(f"revalidacao_pendente:{nota.chave}")
                continue
            if atual.situacao != SituacaoNota.AUTORIZADA:
                nota.status = REJEITADA
                nota.motivos = nota.motivos + [
                    {"codigo": "invalidada_apos_aprovacao", "pontos": 0, "detalhe": f"Situação na Sefaz: {atual.situacao.value}."}
                ]
                resultado.notas_invalidadas.append(nota.chave)
            else:
                resultado.notas_validas += 1
        self.db.commit()

        if resultado.notas_invalidadas:
            resultado.pendencias.append("notas_canceladas_apos_aprovacao")
        if not resultado.notas_validas:
            resultado.pendencias.append("sem_notas_validas")
        if any(n.status == REVISAO for n in notas):
            resultado.pendencias.append("notas_em_revisao")

        titular = pix.titular(chave_pix)
        if titular is None:
            resultado.pendencias.append("chave_pix_nao_encontrada")
        elif titular.cpf != participante.cpf:
            resultado.pendencias.append("pix_de_outro_titular")

        if not identidade_verificada:
            resultado.pendencias.append("identidade_nao_verificada")

        resultado.apto = not resultado.pendencias
        return resultado

    def _salvar_rejeitada(self, nota: Nota, rejeicao: Rejeicao) -> Nota:
        nota.status = REJEITADA
        nota.motivos = [{"codigo": rejeicao.codigo, "pontos": 0, "detalhe": rejeicao.detalhe}]
        self.db.add(nota)
        self.db.commit()
        return nota

    def _manter_em_validacao(self, nota: Nota, codigo: str, detalhe: str) -> Nota:
        nota.status = EM_VALIDACAO
        nota.motivos = [{"codigo": codigo, "pontos": 0, "detalhe": detalhe}]
        self.db.commit()
        return nota
