from datetime import datetime

from app.pix.base import TitularPix

from .conftest import CNPJ_LOJA, CPF_ANA, CPF_JOAO, CPF_MARIA


def codigos(nota: dict) -> set[str]:
    return {m["codigo"] for m in nota["motivos"]}


def test_nota_legitima_aprovada(emitir, enviar):
    nota = enviar(emitir(cpf=CPF_MARIA)).json()
    assert nota["status"] == "aprovada"
    assert nota["pontuacao"] == 0
    assert nota["valor_participante"] == "25.00"


def test_aceita_qrcode(emitir, client, campanha):
    chave = emitir(cpf=CPF_MARIA)
    resposta = client.post(
        f"/campanhas/{campanha['id']}/notas",
        json={"cpf": CPF_MARIA, "qrcode": f"https://www.nfce.fazenda.sp.gov.br/qrcode?p={chave}|2|1|1|ABC"},
    )
    assert resposta.json()["status"] == "aprovada"


def test_cpf_e_chave_invalidos_nao_entram(enviar, emitir):
    assert enviar(emitir(), cpf="123.456.789-00").status_code == 422
    assert enviar("1" * 44).status_code == 422


def test_nota_duplicada_em_outro_cpf(emitir, enviar):
    chave = emitir()
    assert enviar(chave).json()["status"] == "aprovada"
    segunda = enviar(chave, cpf=CPF_JOAO).json()
    assert segunda["status"] == "rejeitada"
    assert codigos(segunda) == {"nota_duplicada"}


def test_nota_com_cpf_de_terceiro(emitir, enviar):
    nota = enviar(emitir(cpf=CPF_JOAO)).json()
    assert nota["status"] == "rejeitada"
    assert codigos(nota) == {"nota_de_terceiro"}


def test_nota_cancelada_e_inexistente(emitir, enviar, sefaz):
    chave = emitir(cpf=CPF_MARIA)
    sefaz.cancelar(chave)
    assert codigos(enviar(chave).json()) == {"nota_cancelada"}
    assert codigos(enviar(emitir(registrar=False)).json()) == {"nota_nao_encontrada"}


def test_fora_do_periodo(emitir, enviar):
    # Mês fora do período: barrado só pela chave, sem consultar a Sefaz.
    assert codigos(enviar(emitir(data=datetime(2026, 12, 1))).json()) == {"fora_do_periodo"}
    # Mesmo mês do início, mas antes do dia 21.
    assert codigos(enviar(emitir(data=datetime(2026, 9, 10))).json()) == {"fora_do_periodo"}


def test_produto_e_valor_minimo(emitir, enviar):
    assert codigos(enviar(emitir(ean="7890000000000")).json()) == {"sem_produto_participante"}
    assert codigos(enviar(emitir(valor="12.90")).json()) == {"valor_abaixo_minimo"}


def test_limite_diario(emitir, enviar):
    for _ in range(4):
        assert enviar(emitir(cpf=CPF_MARIA)).json()["status"] != "rejeitada"
    assert codigos(enviar(emitir(cpf=CPF_MARIA)).json()) == {"limite_diario"}


def test_divergencia_entre_foto_e_sefaz_vai_para_revisao(emitir, enviar):
    nota = enviar(
        emitir(cpf=CPF_MARIA, valor="25.00"),
        ocr={"valor_total": "125.00", "data_emissao": "2026-10-15T14:30:00"},
    ).json()
    assert nota["status"] == "revisao"
    assert codigos(nota) == {"divergencia_ocr"}


def test_fazenda_de_cpfs_no_mesmo_aparelho(emitir, enviar):
    primeira = enviar(emitir(cpf=CPF_MARIA), telefone="+5511999990000", dispositivo_id="aparelho-1").json()
    assert primeira["status"] == "aprovada"
    # Segundo CPF, mesmo aparelho, nota sem CPF: 40 + 15 = 55 ⇒ revisão.
    segunda = enviar(emitir(), cpf=CPF_JOAO, dispositivo_id="aparelho-1").json()
    assert segunda["status"] == "revisao"
    assert codigos(segunda) == {"dispositivo_compartilhado", "sem_cpf_na_nota"}
    # Terceiro CPF, mesmo aparelho e mesmo telefone do primeiro: 40 + 30 + 15 = 85 ⇒ rejeitada.
    terceira = enviar(emitir(), cpf=CPF_ANA, telefone="+5511999990000", dispositivo_id="aparelho-1").json()
    assert terceira["status"] == "rejeitada"
    assert {"dispositivo_compartilhado", "telefone_compartilhado"} <= codigos(terceira)


def test_notas_em_sequencia_no_mesmo_caixa(emitir, enviar):
    enviar(emitir(cpf=CPF_MARIA, numero=500))
    nota = enviar(emitir(cpf=CPF_MARIA, numero=501)).json()
    assert "notas_em_sequencia" in codigos(nota)


def test_sefaz_fora_do_ar_e_reprocessamento(emitir, enviar, sefaz, client, campanha):
    chave = emitir(cpf=CPF_MARIA)
    sefaz.indisponivel = True
    nota = enviar(chave).json()
    assert nota["status"] == "em_validacao"
    # Enquanto pendente, a mesma chave não pode entrar em outro CPF.
    assert codigos(enviar(chave, cpf=CPF_JOAO).json()) == {"nota_duplicada"}

    sefaz.indisponivel = False
    reprocessadas = client.post(f"/campanhas/{campanha['id']}/notas/reprocessar").json()
    assert [n["status"] for n in reprocessadas] == ["aprovada"]


def test_contingencia_aguarda_a_sefaz(emitir, enviar, sefaz, client, campanha):
    chave = emitir(cpf=CPF_MARIA, tipo_emissao=9, registrar=False)
    nota = enviar(chave).json()
    assert nota["status"] == "em_validacao"
    assert codigos(nota) == {"aguardando_contingencia"}


def test_revisao_manual_com_bloqueio(emitir, enviar, client, campanha):
    enviar(emitir(cpf=CPF_MARIA), dispositivo_id="aparelho-1")
    suspeita = enviar(emitir(), cpf=CPF_JOAO, dispositivo_id="aparelho-1").json()

    fila = client.get(f"/campanhas/{campanha['id']}/revisao").json()
    assert [n["id"] for n in fila] == [suspeita["id"]]

    revisada = client.post(
        f"/notas/{suspeita['id']}/revisao",
        json={"aprovar": False, "revisor": "analista@empresa", "observacao": "Mesma família de CPFs", "bloquear_participante": True},
    ).json()
    assert revisada["status"] == "rejeitada"
    assert client.post(f"/notas/{suspeita['id']}/revisao", json={"aprovar": True, "revisor": "x"}).status_code == 409

    # CPF bloqueado não consegue mais participar.
    assert codigos(enviar(emitir(cpf=CPF_JOAO), cpf=CPF_JOAO).json()) == {"participante_bloqueado"}


def test_ganhador_apto(emitir, enviar, client, campanha, pix):
    enviar(emitir(cpf=CPF_MARIA))
    pix.registrar("maria@email.com", TitularPix(nome="Maria Souza", cpf=CPF_MARIA))
    resultado = client.post(
        f"/campanhas/{campanha['id']}/ganhadores/verificacao",
        json={"cpf": CPF_MARIA, "chave_pix": "maria@email.com", "identidade_verificada": True},
    ).json()
    assert resultado == {"apto": True, "pendencias": [], "notas_validas": 1, "notas_invalidadas": []}


def test_ganhador_com_nota_cancelada_depois_e_pix_de_outra_pessoa(emitir, enviar, client, campanha, pix, sefaz):
    chave = emitir(cpf=CPF_MARIA)
    enviar(chave)
    sefaz.cancelar(chave)  # comprou, cadastrou e devolveu o produto
    pix.registrar("11999990000", TitularPix(nome="João", cpf=CPF_JOAO))

    resultado = client.post(
        f"/campanhas/{campanha['id']}/ganhadores/verificacao",
        json={"cpf": CPF_MARIA, "chave_pix": "11999990000"},
    ).json()
    assert not resultado["apto"]
    assert resultado["notas_invalidadas"] == [chave]
    assert set(resultado["pendencias"]) == {
        "notas_canceladas_apos_aprovacao",
        "sem_notas_validas",
        "pix_de_outro_titular",
        "identidade_nao_verificada",
    }


def test_painel(emitir, enviar, client, campanha):
    enviar(emitir(cpf=CPF_MARIA))
    enviar(emitir(cpf=CPF_JOAO))
    enviar(emitir(valor="5.00"))
    painel = client.get(f"/campanhas/{campanha['id']}/painel").json()
    assert painel["notas_por_status"] == {"aprovada": 1, "revisao": 0, "rejeitada": 2, "em_validacao": 0}
    assert painel["principais_motivos"] == {"nota_de_terceiro": 1, "valor_abaixo_minimo": 1}
    assert painel["lojas_com_mais_rejeicoes"] == {CNPJ_LOJA: 2}
    assert painel["taxa_aprovacao_automatica"] == round(1 / 3, 4)


def test_simulador(client, campanha):
    from app.validacao.chave import gerar_chave

    chave = gerar_chave(CNPJ_LOJA, 77)
    assert client.post(
        "/simulador/sefaz/notas",
        json={
            "chave": chave,
            "data_emissao": "2026-10-20T10:00:00",
            "valor_total": "30.00",
            "cpf_consumidor": CPF_MARIA,
            "itens": [{"descricao": "Atum", "valor_total": "30.00", "ean": "7891000100103"}],
        },
    ).status_code == 201
    nota = client.post(f"/campanhas/{campanha['id']}/notas", json={"cpf": CPF_MARIA, "chave": chave}).json()
    assert nota["status"] == "aprovada"


def test_pagina_de_teste(client):
    resposta = client.get("/teste")
    assert resposta.status_code == 200
    assert "Teste do Antifraude" in resposta.text
