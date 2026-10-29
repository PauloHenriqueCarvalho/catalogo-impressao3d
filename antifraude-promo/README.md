# Antifraude de Promoções (MVP)

API que recebe as notas fiscais cadastradas numa promoção (pelo site ou pelo WhatsApp) e decide, para cada uma, **aprovar**, **mandar para revisão manual** ou **rejeitar**. Também confere o ganhador antes de o prêmio ser pago.

## Como funciona

```
Envio (site / WhatsApp)
  │
  ├─ Camada 1 · Regras fixas ............ chave de acesso válida (DV módulo 11), mês dentro do período,
  │                                       loja participante, nota já usada, limites por dia e por CPF
  ├─ Camada 2 · Sefaz .................... situação (autorizada/cancelada/denegada), data exata,
  │                                       CPF da nota = CPF do participante, produtos e valor mínimo
  ├─ Camada 3 · Pontuação de risco ....... foto x Sefaz, aparelho/telefone/IP em vários CPFs,
  │                                       ritmo de envio, notas seguidas no mesmo caixa, histórico
  │     0–30 aprova · 31–70 revisão · >70 rejeita   (limites ajustáveis por campanha)
  │
  └─ Camada 4 · Ganhador ................. revalida todas as notas na Sefaz, PIX no CPF do
                                          ganhador, identidade conferida
```

| Sinal de risco | Pontos | O que pega |
|---|---|---|
| `dispositivo_compartilhado` | 40 | Fazenda de CPFs no mesmo aparelho |
| `divergencia_ocr` | 35 | Foto adulterada (valor, data ou CNPJ diferente da Sefaz) |
| `indicio_edicao` | 30 | Edição detectada pela análise de imagem |
| `telefone_compartilhado` | 30 | Mesmo telefone em vários CPFs |
| `notas_em_sequencia` | 25 | Compra fracionada ou conluio com o caixa |
| `foto_de_tela` | 20 | Foto de tela em vez do papel |
| `envio_acelerado` | 20 | Robô ou fraude em lote (5+ envios por hora) |
| `historico_de_rejeicoes` | 20 | CPF com 3+ notas rejeitadas |
| `sem_cpf_na_nota` | 15 | Nota sem CPF pode ser de qualquer pessoa |
| `ip_compartilhado` | 15 | IP com 4+ CPFs (limite alto por causa de Wi-Fi público e rede móvel) |
| `conta_nova_intensa` | 15 | Conta criada há menos de 1 hora e já com vários envios |

Os pesos ficam em `app/antifraude/sinais.py`.

Outros comportamentos:
- **Sefaz fora do ar:** a nota fica `em_validacao`, e `POST /campanhas/{id}/notas/reprocessar` tenta de novo. Chame esse endpoint por cron.
- **Nota em contingência:** quando a chave tem tipo de emissão ≠ 1 e a nota ainda não chegou à Sefaz, ela fica aguardando até 48 h.
- **Chaves com CNPJ alfanumérico** (a partir de julho/2026) são aceitas.
- **Envios simultâneos da mesma chave:** um índice único no banco barra o segundo envio.

## Rodar

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

A documentação interativa fica em http://localhost:8000/docs. Para rodar os testes:

```bash
python -m pytest
```

O banco padrão é SQLite (`antifraude.db`). Para usar Postgres, defina `ANTIFRAUDE_DB=postgresql+psycopg://...` e instale o driver.

## Demonstração completa

```bash
python demo.py
```

Roda em memória 19 cenários (compra legítima, cada tipo de fraude, Sefaz fora do ar, revisão manual e checagem do ganhador) e mostra o resultado de cada um. Não precisa subir a API.

## Página de teste (QR code)

Abra http://localhost:8000/teste para usar uma tela simples:

1. **Criar campanha de teste**
2. Leia o QR code da nota com **Usar câmera** (webcam) ou **Foto do QR code** (celular), ou cole o link
3. Informe o CPF do participante
4. Informe o que a Sefaz responderia (valor, data e CPF impresso na nota), já que a Sefaz ainda é simulada
5. **Enviar nota** e veja o status, a pontuação e os motivos

Para testar pelo celular, suba a API com `uvicorn app.main:app --host 0.0.0.0` e abra `http://IP-DO-COMPUTADOR:8000/teste` (celular e computador na mesma rede Wi-Fi). Por `http` o navegador do celular não libera a câmera ao vivo; use **Foto do QR code**.

Testes de fraude para fazer:
- Enviar a mesma nota duas vezes → `nota_duplicada`
- Colocar outro CPF em "CPF impresso na nota" → `nota_de_terceiro`
- Valor abaixo de R$ 10,00 → `valor_abaixo_minimo`
- Marcar "Simular foto adulterada" → `divergencia_ocr` (revisão)
- Trocar o CPF do participante mantendo o mesmo "Aparelho" e deixar a nota sem CPF → `dispositivo_compartilhado` (revisão)
- Enviar 5 notas no mesmo dia com o mesmo CPF → `limite_diario`

## Endpoints

| Método | Rota | Uso |
|---|---|---|
| POST | `/campanhas` | Cria a campanha: período, valor mínimo, limites, CNPJs e EANs participantes |
| POST | `/campanhas/{id}/notas` | Envia uma nota (`chave` ou `qrcode`, `cpf`, `dispositivo_id`, `ip`, `ocr`) |
| POST | `/campanhas/{id}/notas/reprocessar` | Revalida as notas pendentes na Sefaz |
| GET | `/campanhas/{id}/revisao` | Fila de revisão manual, da mais suspeita para a menos suspeita |
| POST | `/notas/{id}/revisao` | Aprova ou rejeita, com a opção de bloquear o CPF |
| POST | `/campanhas/{id}/participantes/{cpf}/bloqueio` | Bloqueia um CPF |
| POST | `/campanhas/{id}/ganhadores/verificacao` | Checagem final do ganhador |
| GET | `/campanhas/{id}/painel` | Números da campanha: status, motivos, lojas com mais rejeições, taxa de aprovação automática |

Exemplo de envio vindo do bot de WhatsApp:

```json
{
  "cpf": "529.982.247-25",
  "telefone": "+5511999990000",
  "dispositivo_id": "whatsapp:+5511999990000",
  "qrcode": "https://www.nfce.fazenda.sp.gov.br/qrcode?p=3526...|2|1|1|ABC",
  "ocr": { "valor_total": "25.00", "data_emissao": "2026-10-15T14:30:00" }
}
```

No WhatsApp, não envie `ip`: seria o IP do servidor do bot, igual para todo mundo.

## O que ainda é simulado

Sem credenciais reais, o projeto sobe com **simuladores** da Sefaz e do PIX. As rotas `/simulador/...` permitem cadastrar notas e chaves PIX fictícias para demonstrar o funcionamento e só existem nesse modo.

Para produção:

1. **Sefaz real:** implemente `ConsultaSefaz` (`app/sefaz/base.py`), com um adaptador por UF que lê a consulta pública da NFC-e. Comece por SP, MG, RJ, PR e RS. Inclua novas tentativas e trate o captcha. Depois passe o adaptador para `criar_app(sefaz=...)`.
2. **PIX real:** implemente `ConsultaPix` (`app/pix/base.py`) com a consulta de titular do seu PSP (DICT).
3. **Leitura da foto (OCR):** fica fora deste serviço. O bot ou o site lê a foto e envia o resultado no campo `ocr`. Os campos `indicio_edicao` e `foto_de_tela` já pontuam se o serviço de análise de imagem os preencher.
4. **Prova de vida e documento do ganhador:** use um fornecedor de verificação de identidade e envie `identidade_verificada: true`.
5. **Autenticação da API, auditoria das revisões e LGPD:** a base legal é a prevenção à fraude, que precisa constar na política de privacidade. Peça biometria só do ganhador.

## Próximas fases

- Grafo de conexões entre CPF, aparelho, PIX, endereço e loja para achar aglomerados de fraude
- Análise de imagem própria para detectar edição
- Pesos ajustados por aprendizado de máquina, usando as decisões da revisão manual
- Painel da marca com o valor de prêmio protegido
