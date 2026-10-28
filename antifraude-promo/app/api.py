import os
from collections import Counter
from typing import Iterator

from fastapi import Depends, FastAPI, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.orm import Session

from . import schemas
from .antifraude.motor import MotorAntifraude
from .db import criar_sessoes
from .models import APROVADA, EM_VALIDACAO, REJEITADA, REVISAO, Campanha, Nota, Participante
from .pix.base import ConsultaPix, PixSimulado, TitularPix
from .sefaz.base import ConsultaSefaz, ItemNota, NotaSefaz, SituacaoNota
from .sefaz.simulada import SefazSimulada
from .validacao.chave import ChaveInvalida, interpretar_chave
from .validacao.cpf import cpf_valido, normalizar_cpf
from .validacao.qrcode import extrair_chave_qrcode


def criar_app(
    database_url: str | None = None,
    sefaz: ConsultaSefaz | None = None,
    pix: ConsultaPix | None = None,
) -> FastAPI:
    app = FastAPI(title="Antifraude de Promoções", version="0.1.0")
    app.state.sessoes = criar_sessoes(database_url or os.getenv("ANTIFRAUDE_DB", "sqlite:///./antifraude.db"))
    app.state.sefaz = sefaz or SefazSimulada()
    app.state.pix = pix or PixSimulado()

    def get_db(request: Request) -> Iterator[Session]:
        with request.app.state.sessoes() as db:
            yield db

    def get_motor(request: Request, db: Session = Depends(get_db)) -> MotorAntifraude:
        return MotorAntifraude(db, request.app.state.sefaz)

    def buscar_campanha(db: Session, campanha_id: int) -> Campanha:
        campanha = db.get(Campanha, campanha_id)
        if not campanha:
            raise HTTPException(404, "Campanha não encontrada")
        return campanha

    def buscar_participante(db: Session, campanha: Campanha, cpf: str) -> Participante:
        participante = db.scalar(
            select(Participante).where(Participante.campanha_id == campanha.id, Participante.cpf == normalizar_cpf(cpf))
        )
        if not participante:
            raise HTTPException(404, "Participante não encontrado")
        return participante

    @app.post("/campanhas", response_model=schemas.CampanhaSaida, status_code=201)
    def criar_campanha(dados: schemas.CampanhaEntrada, db: Session = Depends(get_db)):
        campanha = Campanha(**dados.model_dump())
        db.add(campanha)
        db.commit()
        return campanha

    @app.get("/campanhas/{campanha_id}", response_model=schemas.CampanhaSaida)
    def ver_campanha(campanha_id: int, db: Session = Depends(get_db)):
        return buscar_campanha(db, campanha_id)

    @app.post("/campanhas/{campanha_id}/notas", response_model=schemas.NotaSaida, status_code=201)
    def enviar_nota(
        campanha_id: int,
        envio: schemas.EnvioNota,
        db: Session = Depends(get_db),
        motor: MotorAntifraude = Depends(get_motor),
    ):
        campanha = buscar_campanha(db, campanha_id)
        cpf = normalizar_cpf(envio.cpf)
        if not cpf_valido(cpf):
            raise HTTPException(422, "CPF inválido")
        try:
            info = interpretar_chave(envio.chave or extrair_chave_qrcode(envio.qrcode or ""))
        except ChaveInvalida as erro:
            raise HTTPException(422, str(erro))

        participante = db.scalar(
            select(Participante).where(Participante.campanha_id == campanha.id, Participante.cpf == cpf)
        )
        if not participante:
            participante = Participante(campanha_id=campanha.id, cpf=cpf, nome=envio.nome, telefone=envio.telefone)
            db.add(participante)
            db.commit()

        return motor.receber_nota(
            campanha,
            participante,
            info,
            dispositivo_id=envio.dispositivo_id,
            ip=envio.ip,
            dados_ocr=envio.ocr.model_dump(mode="json") if envio.ocr else None,
        )

    @app.post("/campanhas/{campanha_id}/notas/reprocessar", response_model=list[schemas.NotaSaida])
    def reprocessar(campanha_id: int, db: Session = Depends(get_db), motor: MotorAntifraude = Depends(get_motor)):
        """Revalida na Sefaz as notas que ficaram em validação. Chame periodicamente (cron)."""
        return motor.reprocessar_pendentes(buscar_campanha(db, campanha_id))

    @app.get("/campanhas/{campanha_id}/revisao", response_model=list[schemas.NotaSaida])
    def fila_de_revisao(campanha_id: int, db: Session = Depends(get_db)):
        buscar_campanha(db, campanha_id)
        return db.scalars(
            select(Nota)
            .where(Nota.campanha_id == campanha_id, Nota.status == REVISAO)
            .order_by(Nota.pontuacao.desc(), Nota.criada_em)
        ).all()

    @app.post("/notas/{nota_id}/revisao", response_model=schemas.NotaSaida)
    def revisar_nota(
        nota_id: int,
        decisao: schemas.DecisaoRevisao,
        db: Session = Depends(get_db),
        motor: MotorAntifraude = Depends(get_motor),
    ):
        nota = db.get(Nota, nota_id)
        if not nota:
            raise HTTPException(404, "Nota não encontrada")
        if nota.status != REVISAO:
            raise HTTPException(409, f"A nota está '{nota.status}', não em revisão")
        return motor.revisar(
            nota,
            aprovar=decisao.aprovar,
            revisor=decisao.revisor,
            observacao=decisao.observacao,
            bloquear=decisao.bloquear_participante,
        )

    @app.post("/campanhas/{campanha_id}/participantes/{cpf}/bloqueio", status_code=204)
    def bloquear_participante(campanha_id: int, cpf: str, bloqueio: schemas.Bloqueio, db: Session = Depends(get_db)):
        participante = buscar_participante(db, buscar_campanha(db, campanha_id), cpf)
        participante.bloqueado = True
        participante.motivo_bloqueio = bloqueio.motivo
        db.commit()

    @app.post("/campanhas/{campanha_id}/ganhadores/verificacao", response_model=schemas.ResultadoGanhadorSaida)
    def verificar_ganhador(
        campanha_id: int,
        dados: schemas.VerificacaoGanhador,
        request: Request,
        db: Session = Depends(get_db),
        motor: MotorAntifraude = Depends(get_motor),
    ):
        campanha = buscar_campanha(db, campanha_id)
        participante = buscar_participante(db, campanha, dados.cpf)
        return motor.verificar_ganhador(
            campanha,
            participante,
            pix=request.app.state.pix,
            chave_pix=dados.chave_pix,
            identidade_verificada=dados.identidade_verificada,
        )

    @app.get("/campanhas/{campanha_id}/painel", response_model=schemas.Painel)
    def painel(campanha_id: int, db: Session = Depends(get_db)):
        buscar_campanha(db, campanha_id)
        notas = db.scalars(select(Nota).where(Nota.campanha_id == campanha_id)).all()
        por_status = Counter(n.status for n in notas)
        motivos = Counter(
            m["codigo"] for n in notas if n.status in (REJEITADA, REVISAO) for m in n.motivos
        )
        lojas = Counter(n.cnpj_emitente for n in notas if n.status == REJEITADA)
        bloqueados = db.scalars(
            select(Participante).where(Participante.campanha_id == campanha_id, Participante.bloqueado)
        ).all()
        decididas = [n for n in notas if n.status != EM_VALIDACAO]
        automaticas = [n for n in decididas if n.status == APROVADA and not n.revisado_por]
        return schemas.Painel(
            notas_por_status={s: por_status.get(s, 0) for s in (APROVADA, REVISAO, REJEITADA, EM_VALIDACAO)},
            principais_motivos=dict(motivos.most_common(10)),
            lojas_com_mais_rejeicoes=dict(lojas.most_common(10)),
            participantes_bloqueados=len(bloqueados),
            taxa_aprovacao_automatica=round(len(automaticas) / len(decididas), 4) if decididas else 0.0,
        )

    if isinstance(app.state.sefaz, SefazSimulada):
        _rotas_do_simulador(app)
    return app


def _rotas_do_simulador(app: FastAPI) -> None:
    """Rotas para montar demonstrações sem Sefaz e PIX reais. Só existem com os simuladores ativos."""

    @app.post("/simulador/sefaz/notas", status_code=201, tags=["simulador"])
    def registrar_nota(dados: schemas.NotaSimulada, request: Request):
        try:
            info = interpretar_chave(dados.chave)
        except ChaveInvalida as erro:
            raise HTTPException(422, str(erro))
        request.app.state.sefaz.registrar(
            NotaSefaz(
                chave=info.chave,
                situacao=SituacaoNota.AUTORIZADA,
                cnpj_emitente=info.cnpj,
                data_emissao=dados.data_emissao,
                valor_total=dados.valor_total,
                cpf_consumidor=normalizar_cpf(dados.cpf_consumidor) or None,
                itens=[ItemNota(**i.model_dump()) for i in dados.itens],
            )
        )

    @app.post("/simulador/sefaz/notas/{chave}/cancelamento", status_code=204, tags=["simulador"])
    def cancelar_nota(chave: str, request: Request):
        if chave not in request.app.state.sefaz.notas:
            raise HTTPException(404, "Nota não registrada no simulador")
        request.app.state.sefaz.cancelar(chave)

    @app.post("/simulador/pix", status_code=201, tags=["simulador"])
    def registrar_pix(dados: schemas.PixSimuladoEntrada, request: Request):
        request.app.state.pix.registrar(dados.chave_pix, TitularPix(nome=dados.nome, cpf=normalizar_cpf(dados.cpf)))
