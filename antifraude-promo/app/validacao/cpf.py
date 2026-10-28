import re


def normalizar_cpf(valor: str | None) -> str:
    return re.sub(r"\D", "", valor or "")


def _dv(digitos: str) -> int:
    peso_inicial = len(digitos) + 1
    soma = sum(int(d) * (peso_inicial - i) for i, d in enumerate(digitos))
    resto = soma * 10 % 11
    return 0 if resto == 10 else resto


def cpf_valido(valor: str | None) -> bool:
    cpf = normalizar_cpf(valor)
    if len(cpf) != 11 or cpf == cpf[0] * 11:
        return False
    return _dv(cpf[:9]) == int(cpf[9]) and _dv(cpf[:10]) == int(cpf[10])


def gerar_cpf(base: str) -> str:
    """Completa 9 dígitos com os verificadores. Usado nos testes e na demonstração."""
    primeiro = _dv(base)
    return base + str(primeiro) + str(_dv(base + str(primeiro)))
