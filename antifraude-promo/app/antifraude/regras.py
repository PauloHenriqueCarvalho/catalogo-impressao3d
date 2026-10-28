"""Camadas 1 e 2: regras fixas. Qualquer uma que falhe rejeita a nota na hora."""

from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..models import REJEITADA, Campanha, Nota, Participante
from ..sefaz.base import NotaSefaz, SituacaoNota
from ..validacao.chave import InfoChave


@dataclass
class Rejeicao:
    codigo: str
    detalhe: str


def verificar_chave(campanha: Campanha, info: InfoChave) -> Rejeicao | None:
    mes_emissao = (info.ano, info.mes)
    if not (campanha.inicio.year, campanha.inicio.month) <= mes_emissao <= (campanha.fim.year, campanha.fim.month):
        return Rejeicao("fora_do_periodo", f"Nota emitida em {info.mes:02d}/{info.ano}, fora do período da campanha.")
    if campanha.cnpjs_participantes and info.cnpj not in campanha.cnpjs_participantes:
        return Rejeicao("loja_nao_participante", f"CNPJ {info.cnpj} não está entre as lojas participantes.")
    return None


def verificar_duplicidade(db: Session, campanha: Campanha, chave: str) -> Rejeicao | None:
    existente = db.scalar(
        select(Nota).where(Nota.campanha_id == campanha.id, Nota.chave == chave, Nota.status != REJEITADA)
    )
    if existente:
        return Rejeicao("nota_duplicada", "Esta nota já foi cadastrada na campanha.")
    return None


def verificar_limites(db: Session, campanha: Campanha, participante: Participante, agora: datetime) -> Rejeicao | None:
    ativas = select(func.count()).select_from(Nota).where(
        Nota.participante_id == participante.id, Nota.status != REJEITADA
    )
    if campanha.max_notas_total is not None and db.scalar(ativas) >= campanha.max_notas_total:
        return Rejeicao("limite_total", f"Limite de {campanha.max_notas_total} notas por CPF atingido.")
    inicio_do_dia = agora.replace(hour=0, minute=0, second=0, microsecond=0)
    if campanha.max_notas_dia is not None and db.scalar(ativas.where(Nota.criada_em >= inicio_do_dia)) >= campanha.max_notas_dia:
        return Rejeicao("limite_diario", f"Limite de {campanha.max_notas_dia} notas por dia atingido.")
    return None


def verificar_sefaz(
    campanha: Campanha, participante: Participante, nota: NotaSefaz
) -> tuple[Rejeicao | None, Decimal | None]:
    """Retorna a rejeição (se houver) e o valor em produtos participantes."""
    if nota.situacao == SituacaoNota.CANCELADA:
        return Rejeicao("nota_cancelada", "A nota foi cancelada na Sefaz."), None
    if nota.situacao == SituacaoNota.DENEGADA:
        return Rejeicao("nota_denegada", "A nota foi denegada na Sefaz."), None
    if nota.situacao == SituacaoNota.NAO_ENCONTRADA:
        return Rejeicao("nota_nao_encontrada", "A nota não existe na Sefaz."), None

    if nota.data_emissao and not campanha.inicio <= nota.data_emissao <= campanha.fim:
        return Rejeicao("fora_do_periodo", f"Nota emitida em {nota.data_emissao:%d/%m/%Y %H:%M}, fora do período."), None
    if nota.cpf_consumidor and nota.cpf_consumidor != participante.cpf:
        return Rejeicao("nota_de_terceiro", "O CPF impresso na nota é de outra pessoa."), None

    eans = set(campanha.eans_participantes or [])
    itens = [i for i in nota.itens if i.ean in eans] if eans else nota.itens
    if eans and not itens:
        return Rejeicao("sem_produto_participante", "Nenhum produto participante na nota."), None
    valor = sum((i.valor_total for i in itens), Decimal("0")) if itens else (nota.valor_total or Decimal("0"))
    if valor < campanha.valor_minimo:
        return Rejeicao(
            "valor_abaixo_minimo", f"R$ {valor:.2f} em produtos participantes; o mínimo é R$ {campanha.valor_minimo:.2f}."
        ), valor
    return None, valor
