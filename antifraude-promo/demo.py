"""Demonstração do antifraude: um caso legítimo e cada tipo de fraude, do envio ao pagamento.

Uso:  python demo.py            (imprime o resultado de cada cenário)
      python demo.py --json x   (também grava o resultado em JSON)

Roda tudo em memória, com os simuladores da Sefaz e do PIX; não precisa subir a API.
"""

import argparse
import json
import sys
import warnings
from datetime import datetime
from decimal import Decimal

warnings.filterwarnings("ignore", category=DeprecationWarning)

from fastapi.testclient import TestClient  # noqa: E402

from app.api import criar_app
from app.pix.base import PixSimulado, TitularPix
from app.sefaz.base import ItemNota, NotaSefaz, SituacaoNota
from app.sefaz.simulada import SefazSimulada
from app.validacao.chave import gerar_chave
from app.validacao.cpf import gerar_cpf

LOJA = "12345678000195"
OUTRA_LOJA = "98765432000110"
ATUM = "7891000100103"
SABAO = "7896000000017"

PESSOAS = {nome: gerar_cpf(base) for nome, base in [
    ("Maria", "123456789"), ("João", "987654321"), ("Ana", "111444777"), ("Bruno", "222555888"),
    ("Carla", "333666999"), ("Diego", "444777000"), ("Elisa", "555888111"), ("Fábio", "666999222"), ("Gabriel", "777000333"),
]}

sefaz, pix = SefazSimulada(), PixSimulado()
client = TestClient(criar_app("sqlite://", sefaz=sefaz, pix=pix))
_numero = iter(range(1000, 100000, 10))
resultados: list[dict] = []


def emitir(cpf=None, valor="25.00", ean=ATUM, data=datetime(2026, 10, 15, 14, 30), numero=None, registrar=True):
    """Emite uma nota na Sefaz simulada, como se o consumidor tivesse comprado numa loja."""
    chave = gerar_chave(LOJA, numero or next(_numero), ano=data.year, mes=data.month)
    if registrar:
        sefaz.registrar(NotaSefaz(
            chave=chave, situacao=SituacaoNota.AUTORIZADA, cnpj_emitente=LOJA, data_emissao=data,
            valor_total=Decimal(valor), cpf_consumidor=cpf,
            itens=[ItemNota(descricao="Produto", valor_total=Decimal(valor), ean=ean)],
        ))
    return chave


def enviar(nome, chave, **extras):
    corpo = {"cpf": PESSOAS[nome], "chave": chave, "dispositivo_id": f"celular-{nome}", **extras}
    return client.post(f"/campanhas/{campanha}/notas", json=corpo).json()


def registrar(grupo, cenario, esperado, nota):
    resultados.append({
        "grupo": grupo, "cenario": cenario, "esperado": esperado, "status": nota["status"],
        "pontuacao": nota["pontuacao"], "motivos": [m["codigo"] for m in nota["motivos"]],
        "detalhes": [m["detalhe"] for m in nota["motivos"]],
    })


campanha = client.post("/campanhas", json={
    "nome": "Atum Premiado (demonstração)", "inicio": "2026-09-21T00:00:00", "fim": "2026-11-19T23:59:59",
    "valor_minimo": "20.00", "max_notas_dia": 4, "eans_participantes": [ATUM],
}).json()["id"]

# ── Camadas 1 e 2: regras fixas e Sefaz ─────────────────────────────────────
nota_maria = emitir(cpf=PESSOAS["Maria"])
registrar("Regras e Sefaz", "Compra legítima com CPF na nota", "aprovada",
          enviar("Maria", nota_maria, telefone="+5511900000001"))
registrar("Regras e Sefaz", "Mesma nota enviada por outro CPF", "rejeitada", enviar("João", nota_maria))
registrar("Regras e Sefaz", "Nota com o CPF de outra pessoa", "rejeitada", enviar("Bruno", emitir(cpf=PESSOAS["Carla"])))
registrar("Regras e Sefaz", "Nota inventada (chave com dígito válido, mas inexistente)", "rejeitada",
          enviar("Bruno", emitir(registrar=False)))
cancelada = emitir(cpf=PESSOAS["Bruno"])
sefaz.cancelar(cancelada)
registrar("Regras e Sefaz", "Nota cancelada na Sefaz", "rejeitada", enviar("Bruno", cancelada))
registrar("Regras e Sefaz", "Compra antes do início da campanha", "rejeitada",
          enviar("Carla", emitir(cpf=PESSOAS["Carla"], data=datetime(2026, 9, 10))))
registrar("Regras e Sefaz", "Nota sem produto participante", "rejeitada", enviar("Carla", emitir(cpf=PESSOAS["Carla"], ean=SABAO)))
registrar("Regras e Sefaz", "Valor abaixo do mínimo (R$ 12,90)", "rejeitada",
          enviar("Carla", emitir(cpf=PESSOAS["Carla"], valor="12.90")))
for _ in range(4):
    enviar("Diego", emitir(cpf=PESSOAS["Diego"]))
registrar("Regras e Sefaz", "5ª nota do mesmo CPF no dia (limite 4)", "rejeitada", enviar("Diego", emitir(cpf=PESSOAS["Diego"])))

# ── Camada 3: pontuação de risco ─────────────────────────────────────────────
registrar("Pontuação de risco", "Foto adulterada (foto diz R$ 125, Sefaz diz R$ 25)", "revisao",
          enviar("Elisa", emitir(cpf=PESSOAS["Elisa"]), ocr={"valor_total": "125.00", "data_emissao": "2026-10-15T14:30:00"}))
suspeita_joao = enviar("João", emitir(), dispositivo_id="celular-Maria")
registrar("Pontuação de risco", "2º CPF no celular da Maria, nota sem CPF", "revisao", suspeita_joao)
registrar("Pontuação de risco", "3º CPF no celular e no telefone da Maria", "rejeitada",
          enviar("Ana", emitir(), dispositivo_id="celular-Maria", telefone="+5511900000001"))
enviar("Fábio", emitir(numero=50001))
registrar("Pontuação de risco", "Notas seguidas no mesmo caixa (nº 50001 e 50002)", "revisao",
          enviar("Fábio", emitir(numero=50002)))

# ── Sefaz fora do ar ─────────────────────────────────────────────────────────
sefaz.indisponivel = True
pendente = enviar("Elisa", emitir(cpf=PESSOAS["Elisa"]))
registrar("Sefaz fora do ar", "Envio com a Sefaz fora do ar", "em_validacao", pendente)
sefaz.indisponivel = False
reprocessada = next(n for n in client.post(f"/campanhas/{campanha}/notas/reprocessar").json() if n["id"] == pendente["id"])
registrar("Sefaz fora do ar", "Mesma nota reprocessada quando a Sefaz volta", "aprovada", reprocessada)

# ── Revisão manual ───────────────────────────────────────────────────────────
fila = client.get(f"/campanhas/{campanha}/revisao").json()
revisada = client.post(f"/notas/{suspeita_joao['id']}/revisao", json={
    "aprovar": False, "revisor": "analista", "observacao": "CPF da mesma família no celular da Maria",
    "bloquear_participante": True,
}).json()
registrar("Revisão manual", f"Analista rejeita a nota do João e bloqueia o CPF ({len(fila)} notas na fila)", "rejeitada", revisada)
registrar("Revisão manual", "João tenta de novo com uma nota legítima", "rejeitada", enviar("João", emitir(cpf=PESSOAS["João"])))

# ── Camada 4: ganhadores ─────────────────────────────────────────────────────
def verificar(nome, chave_pix, identidade):
    return client.post(f"/campanhas/{campanha}/ganhadores/verificacao", json={
        "cpf": PESSOAS[nome], "chave_pix": chave_pix, "identidade_verificada": identidade,
    }).json()

pix.registrar("maria@email.com", TitularPix("Maria", PESSOAS["Maria"]))
ganhadores = [{"cenario": "Maria: nota válida, PIX no próprio CPF, identidade conferida",
               "esperado": True, **verificar("Maria", "maria@email.com", True)}]
nota_gabriel = emitir(cpf=PESSOAS["Gabriel"])
enviar("Gabriel", nota_gabriel)
sefaz.cancelar(nota_gabriel)  # cancelada pela loja depois de aprovada na promoção
pix.registrar("+5511900000002", TitularPix("João", PESSOAS["João"]))
ganhadores.append({"cenario": "Gabriel: nota cancelada depois de aprovada e PIX no CPF de outra pessoa",
                   "esperado": False, **verificar("Gabriel", "+5511900000002", False)})

painel = client.get(f"/campanhas/{campanha}/painel").json()

# ── Saída ────────────────────────────────────────────────────────────────────
NOMES = {"aprovada": "APROVADA", "revisao": "REVISÃO", "rejeitada": "REJEITADA", "em_validacao": "EM VALIDAÇÃO"}
erros = 0
grupo_atual = None
for r in resultados:
    if r["grupo"] != grupo_atual:
        grupo_atual = r["grupo"]
        print(f"\n== {grupo_atual} ==")
    ok = r["status"] == r["esperado"]
    erros += not ok
    print(f"{'OK ' if ok else 'ERRO'} {NOMES[r['status']]:<12} {r['pontuacao']:>3} pts  {r['cenario']}")
    for detalhe in r["detalhes"]:
        print(f"{'':22}· {detalhe}")

print("\n== Checagem do ganhador ==")
for g in ganhadores:
    ok = g["apto"] == g["esperado"]
    erros += not ok
    print(f"{'OK ' if ok else 'ERRO'} {'APTO' if g['apto'] else 'NÃO APTO':<12}        {g['cenario']}")
    for p in g["pendencias"]:
        print(f"{'':22}· {p}")

print("\n== Painel da campanha ==")
print(json.dumps(painel, indent=2, ensure_ascii=False))
print(f"\n{len(resultados) + len(ganhadores) - erros} de {len(resultados) + len(ganhadores)} cenários com o resultado esperado.")

parser = argparse.ArgumentParser()
parser.add_argument("--json")
saida = parser.parse_args().json
if saida:
    with open(saida, "w", encoding="utf-8") as f:
        json.dump({"cenarios": resultados, "ganhadores": ganhadores, "painel": painel}, f, ensure_ascii=False, indent=2)
sys.exit(1 if erros else 0)
