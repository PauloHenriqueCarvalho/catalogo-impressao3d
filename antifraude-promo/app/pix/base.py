"""Consulta do titular de uma chave PIX (no mundo real, via DICT pelo PSP do pagador)."""

from dataclasses import dataclass
from typing import Protocol


@dataclass
class TitularPix:
    nome: str
    cpf: str


class ConsultaPix(Protocol):
    def titular(self, chave_pix: str) -> TitularPix | None: ...


class PixSimulado:
    def __init__(self) -> None:
        self.chaves: dict[str, TitularPix] = {}

    def registrar(self, chave_pix: str, titular: TitularPix) -> None:
        self.chaves[chave_pix] = titular

    def titular(self, chave_pix: str) -> TitularPix | None:
        return self.chaves.get(chave_pix)
