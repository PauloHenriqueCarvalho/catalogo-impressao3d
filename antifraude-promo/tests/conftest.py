from datetime import datetime
from decimal import Decimal
from itertools import count

import pytest
from fastapi.testclient import TestClient

from app.api import criar_app
from app.pix.base import PixSimulado
from app.sefaz.base import ItemNota, NotaSefaz, SituacaoNota
from app.sefaz.simulada import SefazSimulada
from app.validacao.chave import gerar_chave
from app.validacao.cpf import gerar_cpf

CNPJ_LOJA = "12345678000195"
EAN_PRODUTO = "7891000100103"
CPF_MARIA = gerar_cpf("123456789")
CPF_JOAO = gerar_cpf("987654321")
CPF_ANA = gerar_cpf("111444777")


@pytest.fixture
def sefaz():
    return SefazSimulada()


@pytest.fixture
def pix():
    return PixSimulado()


@pytest.fixture
def client(sefaz, pix):
    return TestClient(criar_app("sqlite://", sefaz=sefaz, pix=pix))


@pytest.fixture
def campanha(client):
    resposta = client.post(
        "/campanhas",
        json={
            "nome": "Atum Premiado",
            "inicio": "2026-09-21T00:00:00",
            "fim": "2026-11-19T23:59:59",
            "valor_minimo": "20.00",
            "max_notas_dia": 4,
            "eans_participantes": [EAN_PRODUTO],
        },
    )
    assert resposta.status_code == 201
    return resposta.json()


@pytest.fixture
def emitir(sefaz):
    """Emite uma nota na Sefaz simulada e devolve a chave."""
    numeros = count(1000, 10)

    def _emitir(
        *,
        cpf: str | None = None,
        valor: str = "25.00",
        ean: str = EAN_PRODUTO,
        data: datetime = datetime(2026, 10, 15, 14, 30),
        numero: int | None = None,
        cnpj: str = CNPJ_LOJA,
        tipo_emissao: int = 1,
        registrar: bool = True,
    ) -> str:
        chave = gerar_chave(cnpj, numero or next(numeros), ano=data.year, mes=data.month, tipo_emissao=tipo_emissao)
        if registrar:
            sefaz.registrar(
                NotaSefaz(
                    chave=chave,
                    situacao=SituacaoNota.AUTORIZADA,
                    cnpj_emitente=cnpj,
                    data_emissao=data,
                    valor_total=Decimal(valor),
                    cpf_consumidor=cpf,
                    itens=[ItemNota(descricao="Atum sólido 170g", valor_total=Decimal(valor), ean=ean)],
                )
            )
        return chave

    return _emitir


@pytest.fixture
def enviar(client, campanha):
    def _enviar(chave: str, cpf: str = CPF_MARIA, **extras):
        corpo = {"cpf": cpf, "chave": chave, **extras}
        return client.post(f"/campanhas/{campanha['id']}/notas", json=corpo)

    return _enviar
