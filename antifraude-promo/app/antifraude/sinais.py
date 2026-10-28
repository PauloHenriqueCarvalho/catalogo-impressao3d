"""Camada 3: sinais de risco. Cada sinal soma pontos; a soma decide aprovação, revisão ou rejeição."""

from dataclasses import dataclass
from datetime import datetime, timedelta
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..models import REJEITADA, Nota, Participante
from ..sefaz.base import NotaSefaz

PESOS = {
    "divergencia_ocr": 35,
    "indicio_edicao": 30,
    "foto_de_tela": 20,
    "sem_cpf_na_nota": 15,
    "dispositivo_compartilhado": 40,
    "telefone_compartilhado": 30,
    "ip_compartilhado": 15,
    "envio_acelerado": 20,
    "conta_nova_intensa": 15,
    "notas_em_sequencia": 25,
    "historico_de_rejeicoes": 20,
}

# Um IP é compartilhado por muita gente legítima (rede móvel, Wi-Fi do shopping), então só pesa a partir daqui.
MIN_OUTROS_CPFS_NO_IP = 3
ENVIOS_POR_HORA = 5
SEQUENCIA_MAXIMA = 3
REJEICOES_ANTERIORES = 3


@dataclass
class Sinal:
    codigo: str
    pontos: int
    detalhe: str


def _sinal(codigo: str, detalhe: str) -> Sinal:
    return Sinal(codigo, PESOS[codigo], detalhe)


def comparar_ocr(dados_ocr: dict | None, sefaz: NotaSefaz) -> list[Sinal]:
    if not dados_ocr:
        return []
    sinais = []
    divergencias = []
    if dados_ocr.get("valor_total") is not None and sefaz.valor_total is not None:
        if abs(Decimal(str(dados_ocr["valor_total"])) - sefaz.valor_total) > Decimal("0.01"):
            divergencias.append(f"valor {dados_ocr['valor_total']} x {sefaz.valor_total}")
    if dados_ocr.get("data_emissao") and sefaz.data_emissao:
        data_ocr = datetime.fromisoformat(str(dados_ocr["data_emissao"])).date()
        if data_ocr != sefaz.data_emissao.date():
            divergencias.append(f"data {data_ocr} x {sefaz.data_emissao.date()}")
    if dados_ocr.get("cnpj_emitente") and sefaz.cnpj_emitente and dados_ocr["cnpj_emitente"] != sefaz.cnpj_emitente:
        divergencias.append(f"CNPJ {dados_ocr['cnpj_emitente']} x {sefaz.cnpj_emitente}")
    if divergencias:
        sinais.append(_sinal("divergencia_ocr", "Foto diferente da Sefaz: " + "; ".join(divergencias)))
    if dados_ocr.get("indicio_edicao"):
        sinais.append(_sinal("indicio_edicao", "A análise da imagem apontou sinais de edição."))
    if dados_ocr.get("foto_de_tela"):
        sinais.append(_sinal("foto_de_tela", "A imagem é foto de uma tela, não do papel."))
    return sinais


def _outros_participantes(db: Session, nota: Nota, coluna, valor) -> int:
    return db.scalar(
        select(func.count(func.distinct(Nota.participante_id))).where(
            Nota.campanha_id == nota.campanha_id, coluna == valor, Nota.participante_id != nota.participante_id
        )
    )


def sinais_de_comportamento(
    db: Session, nota: Nota, participante: Participante, sefaz: NotaSefaz, agora: datetime
) -> list[Sinal]:
    sinais = []
    if not sefaz.cpf_consumidor:
        sinais.append(_sinal("sem_cpf_na_nota", "A nota não tem CPF do consumidor."))

    if nota.dispositivo_id:
        outros = _outros_participantes(db, nota, Nota.dispositivo_id, nota.dispositivo_id)
        if outros:
            sinais.append(_sinal("dispositivo_compartilhado", f"Aparelho usado por mais {outros} CPF(s)."))

    if participante.telefone:
        outros = db.scalar(
            select(func.count()).select_from(Participante).where(
                Participante.campanha_id == participante.campanha_id,
                Participante.telefone == participante.telefone,
                Participante.id != participante.id,
            )
        )
        if outros:
            sinais.append(_sinal("telefone_compartilhado", f"Telefone cadastrado em mais {outros} CPF(s)."))

    if nota.ip:
        outros = _outros_participantes(db, nota, Nota.ip, nota.ip)
        if outros >= MIN_OUTROS_CPFS_NO_IP:
            sinais.append(_sinal("ip_compartilhado", f"IP usado por mais {outros} CPFs."))

    do_participante = select(func.count()).select_from(Nota).where(
        Nota.participante_id == participante.id, Nota.id != nota.id
    )
    ultima_hora = db.scalar(do_participante.where(Nota.criada_em >= agora - timedelta(hours=1)))
    if ultima_hora >= ENVIOS_POR_HORA:
        sinais.append(_sinal("envio_acelerado", f"{ultima_hora} envios na última hora."))
    if participante.criado_em >= agora - timedelta(hours=1) and ultima_hora >= 3:
        sinais.append(_sinal("conta_nova_intensa", "Conta criada há menos de 1 hora e já com vários envios."))

    vizinhas = db.scalar(
        do_participante.where(
            Nota.cnpj_emitente == nota.cnpj_emitente,
            Nota.serie == nota.serie,
            Nota.numero.between(nota.numero - SEQUENCIA_MAXIMA, nota.numero + SEQUENCIA_MAXIMA),
        )
    )
    if vizinhas:
        sinais.append(
            _sinal("notas_em_sequencia", "Notas com numeração seguida no mesmo caixa: possível compra fracionada ou conluio.")
        )

    rejeitadas = db.scalar(do_participante.where(Nota.status == REJEITADA))
    if rejeitadas >= REJEICOES_ANTERIORES:
        sinais.append(_sinal("historico_de_rejeicoes", f"{rejeitadas} notas rejeitadas antes."))
    return sinais
