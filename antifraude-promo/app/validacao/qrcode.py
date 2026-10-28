import re
from urllib.parse import unquote

from .chave import ChaveInvalida

# NFC-e versão 2/3: https://<sefaz>/qrcode?p=<chave>|2|1|1|<hash>
_PARAM_P = re.compile(r"[?&]P=([0-9A-Z]{44})")
# Algumas UFs e a versão 1 usam chNFe=<chave>
_PARAM_CHNFE = re.compile(r"CHNFE=([0-9A-Z]{44})")
_SEQUENCIA_44 = re.compile(r"(?<![0-9A-Z])(\d{44})(?![0-9A-Z])")


def extrair_chave_qrcode(conteudo: str) -> str:
    texto = unquote(conteudo or "").upper()
    for padrao in (_PARAM_P, _PARAM_CHNFE, _SEQUENCIA_44):
        achado = padrao.search(texto)
        if achado:
            return achado.group(1)
    raise ChaveInvalida("Não foi possível encontrar a chave de acesso no QR code.")
