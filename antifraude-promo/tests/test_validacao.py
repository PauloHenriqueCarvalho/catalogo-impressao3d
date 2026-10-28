import pytest

from app.validacao.chave import ChaveInvalida, calcular_dv, gerar_chave, interpretar_chave
from app.validacao.cpf import cpf_valido, gerar_cpf
from app.validacao.qrcode import extrair_chave_qrcode

CHAVE = gerar_chave("12345678000195", 4321, codigo_uf=31, ano=2026, mes=10, serie=2)


def test_interpreta_os_campos_da_chave():
    info = interpretar_chave(CHAVE)
    assert (info.uf, info.ano, info.mes) == ("MG", 2026, 10)
    assert info.cnpj == "12345678000195"
    assert (info.modelo, info.serie, info.numero, info.tipo_emissao) == ("65", 2, 4321, 1)
    assert not info.em_contingencia


def test_aceita_chave_com_espacos():
    agrupada = " ".join(CHAVE[i : i + 4] for i in range(0, 44, 4))
    assert interpretar_chave(agrupada).chave == CHAVE


def test_rejeita_digito_verificador_errado():
    errada = CHAVE[:43] + str((int(CHAVE[43]) + 1) % 10)
    with pytest.raises(ChaveInvalida, match="Dígito verificador"):
        interpretar_chave(errada)


@pytest.mark.parametrize(
    "chave",
    [
        "123",
        gerar_chave("12345678000195", 1, codigo_uf=99),
        gerar_chave("12345678000195", 1, mes=13),
        gerar_chave("12345678000195", 1, modelo="59"),
    ],
)
def test_rejeita_chave_malformada(chave):
    with pytest.raises(ChaveInvalida):
        interpretar_chave(chave)


def test_dv_calculado_a_mao():
    # Pesos 2..9 da direita para a esquerda, recomeçando em 2 na 9ª posição; DV = 11 - (soma % 11).
    assert calcular_dv("0" * 42 + "1") == 9  # 1×2 = 2
    assert calcular_dv("0" * 41 + "10") == 8  # 1×3 = 3
    assert calcular_dv("0" * 34 + "1" + "0" * 8) == 9  # 9ª posição volta ao peso 2
    assert calcular_dv("0" * 43) == 0  # resto 0 ⇒ DV 0


def test_aceita_cnpj_alfanumerico():
    chave = gerar_chave("12ABC34501DE35", 10)
    assert interpretar_chave(chave).cnpj == "12ABC34501DE35"


@pytest.mark.parametrize(
    "conteudo",
    [
        f"https://www.nfce.fazenda.sp.gov.br/qrcode?p={CHAVE}|2|1|1|3B4A1F",
        f"https://www.nfce.fazenda.sp.gov.br/qrcode?p={CHAVE}%7C2%7C1%7C1%7C3B4A1F",
        f"http://nfce.sefaz.xx.gov.br/consulta?chNFe={CHAVE}&nVersao=100",
        CHAVE,
    ],
)
def test_extrai_chave_do_qrcode(conteudo):
    assert extrair_chave_qrcode(conteudo) == CHAVE


def test_qrcode_sem_chave():
    with pytest.raises(ChaveInvalida):
        extrair_chave_qrcode("https://exemplo.com/?p=123")


def test_cpf():
    assert cpf_valido("529.982.247-25")
    assert not cpf_valido("529.982.247-26")
    assert not cpf_valido("111.111.111-11")
    assert cpf_valido(gerar_cpf("123456789"))
