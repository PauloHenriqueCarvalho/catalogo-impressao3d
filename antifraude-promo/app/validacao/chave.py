"""Chave de acesso da NF-e / NFC-e (44 posições).

Layout: cUF(2) AAMM(4) CNPJ(14) modelo(2) série(3) número(9) tpEmis(1) cNF(8) DV(1).

O CNPJ pode ser alfanumérico (a partir de julho/2026): as 12 primeiras posições
aceitam A-Z e os 2 dígitos verificadores continuam numéricos. No cálculo do DV
cada caractere vale ``ord(c) - 48``, o que mantém o mesmo resultado para chaves
só com números.
"""

import re
from dataclasses import dataclass

CODIGOS_UF = {
    11: "RO", 12: "AC", 13: "AM", 14: "RR", 15: "PA", 16: "AP", 17: "TO",
    21: "MA", 22: "PI", 23: "CE", 24: "RN", 25: "PB", 26: "PE", 27: "AL",
    28: "SE", 29: "BA", 31: "MG", 32: "ES", 33: "RJ", 35: "SP", 41: "PR",
    42: "SC", 43: "RS", 50: "MS", 51: "MT", 52: "GO", 53: "DF",
}
MODELOS = {"55": "NF-e", "65": "NFC-e"}

_FORMATO = re.compile(r"^\d{6}[0-9A-Z]{12}\d{2}\d{2}\d{3}\d{9}\d\d{8}\d$")


class ChaveInvalida(ValueError):
    pass


@dataclass(frozen=True)
class InfoChave:
    chave: str
    codigo_uf: int
    uf: str
    ano: int
    mes: int
    cnpj: str
    modelo: str
    serie: int
    numero: int
    tipo_emissao: int

    @property
    def em_contingencia(self) -> bool:
        # 1 = emissão normal; os demais tipos podem chegar à Sefaz com atraso.
        return self.tipo_emissao != 1


def normalizar_chave(valor: str) -> str:
    return re.sub(r"[\s.\-/]", "", valor or "").upper()


def calcular_dv(base: str) -> int:
    """Módulo 11 com pesos 2..9 aplicados da direita para a esquerda."""
    soma, peso = 0, 2
    for c in reversed(base):
        soma += (ord(c) - 48) * peso
        peso = 2 if peso == 9 else peso + 1
    resto = soma % 11
    return 0 if resto < 2 else 11 - resto


def interpretar_chave(valor: str) -> InfoChave:
    chave = normalizar_chave(valor)
    if len(chave) != 44 or not _FORMATO.match(chave):
        raise ChaveInvalida("A chave de acesso deve ter 44 posições no formato oficial.")
    if calcular_dv(chave[:43]) != int(chave[43]):
        raise ChaveInvalida("Dígito verificador da chave de acesso não confere.")

    codigo_uf = int(chave[0:2])
    if codigo_uf not in CODIGOS_UF:
        raise ChaveInvalida(f"Código de UF {codigo_uf} inexistente.")
    mes = int(chave[4:6])
    if not 1 <= mes <= 12:
        raise ChaveInvalida(f"Mês de emissão {mes} inválido.")
    modelo = chave[20:22]
    if modelo not in MODELOS:
        raise ChaveInvalida(f"Modelo {modelo} não é NF-e (55) nem NFC-e (65).")

    return InfoChave(
        chave=chave,
        codigo_uf=codigo_uf,
        uf=CODIGOS_UF[codigo_uf],
        ano=2000 + int(chave[2:4]),
        mes=mes,
        cnpj=chave[6:20],
        modelo=modelo,
        serie=int(chave[22:25]),
        numero=int(chave[25:34]),
        tipo_emissao=int(chave[34]),
    )


def gerar_chave(
    cnpj: str,
    numero: int,
    *,
    codigo_uf: int = 35,
    ano: int = 2026,
    mes: int = 10,
    modelo: str = "65",
    serie: int = 1,
    tipo_emissao: int = 1,
    codigo: str = "12345678",
) -> str:
    """Monta uma chave válida. Usado pelo simulador da Sefaz e pelos testes."""
    base = (
        f"{codigo_uf:02d}{ano % 100:02d}{mes:02d}{cnpj.upper():0>14}{modelo}"
        f"{serie:03d}{numero:09d}{tipo_emissao}{codigo}"
    )
    return base + str(calcular_dv(base))
