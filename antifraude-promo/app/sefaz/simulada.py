from .base import NotaSefaz, SefazIndisponivel, SituacaoNota


class SefazSimulada:
    """Sefaz em memória para desenvolvimento, demonstração e testes."""

    def __init__(self) -> None:
        self.notas: dict[str, NotaSefaz] = {}
        self.indisponivel = False

    def registrar(self, nota: NotaSefaz) -> None:
        self.notas[nota.chave] = nota

    def cancelar(self, chave: str) -> None:
        self.notas[chave].situacao = SituacaoNota.CANCELADA

    def consultar(self, chave: str) -> NotaSefaz:
        if self.indisponivel:
            raise SefazIndisponivel("Sefaz simulada fora do ar")
        return self.notas.get(chave) or NotaSefaz(chave=chave, situacao=SituacaoNota.NAO_ENCONTRADA)
