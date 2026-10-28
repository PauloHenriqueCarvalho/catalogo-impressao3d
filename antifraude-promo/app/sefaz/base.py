"""Contrato da consulta de notas na Sefaz.

Cada UF tem uma página de consulta diferente (algumas com captcha ou instáveis),
então a integração real é um adaptador por UF que implementa ``ConsultaSefaz``.
O motor de antifraude só conhece este contrato.
"""

from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal
from enum import Enum
from typing import Protocol


class SituacaoNota(str, Enum):
    AUTORIZADA = "autorizada"
    CANCELADA = "cancelada"
    DENEGADA = "denegada"
    NAO_ENCONTRADA = "nao_encontrada"


class SefazIndisponivel(Exception):
    """A Sefaz não respondeu. A nota fica em validação para nova tentativa."""


@dataclass
class ItemNota:
    descricao: str
    valor_total: Decimal
    quantidade: Decimal = Decimal("1")
    ean: str | None = None


@dataclass
class NotaSefaz:
    chave: str
    situacao: SituacaoNota
    cnpj_emitente: str | None = None
    data_emissao: datetime | None = None
    valor_total: Decimal | None = None
    cpf_consumidor: str | None = None
    itens: list[ItemNota] = field(default_factory=list)

    def para_json(self) -> dict:
        return {
            "situacao": self.situacao.value,
            "cnpj_emitente": self.cnpj_emitente,
            "data_emissao": self.data_emissao.isoformat() if self.data_emissao else None,
            "valor_total": str(self.valor_total) if self.valor_total is not None else None,
            "cpf_consumidor": self.cpf_consumidor,
            "itens": [
                {
                    "descricao": i.descricao,
                    "ean": i.ean,
                    "quantidade": str(i.quantidade),
                    "valor_total": str(i.valor_total),
                }
                for i in self.itens
            ],
        }


class ConsultaSefaz(Protocol):
    def consultar(self, chave: str) -> NotaSefaz:
        """Retorna a nota ou levanta ``SefazIndisponivel``."""
        ...
