# Verissimo Arte · Catálogo de Personalizados

Landing page de catálogo de chaveiros impressos em 3D, com expositor em andares e uma página separada para cada cliente.

## Páginas

| Rota | Para quem | Andares |
|---|---|---|
| `/` | Catálogo geral da loja | Todas as categorias |
| `/gustavo-campassi/` | Gustavo Campassi (salão Beauté Naturelle) | Brindes para Clientes, Outras Peças — tema natural |
| `/itamaraty/` | Itamaraty (55 anos, 450 funcionários) | Chaveiros 55 Anos, Para a Mesa e a Cozinha — tema azul |
| `/encomendas/` | Anúncios: encomendas grandes de festas, eventos e empresas | Kits, Chaveiros, Bottons, Quadros, Caixinhas, Outras Lembranças — tema claro "loja"; pergunta os dados do evento antes de enviar |

As páginas de cliente não aparecem no Google (`noindex`) e o nome do cliente só vai na mensagem do WhatsApp.

### Criar a página de um novo cliente

1. Copie a pasta `gustavo-campassi/` com o nome do cliente (ex.: `maria-silva/`).
2. No `index.html` da pasta nova, edite o bloco `CATALOGO`:

```js
const CATALOGO = {
  cliente: "Maria Silva",
  tema: "natural",          // opcional: "natural", "azul" ou "loja" (claro com laranja); sem isso usa a escura
  subtitulo: "Texto do topo", // opcional
  precos: { "itamaraty-chaveiros": 4.5 }, // opcional: preço por categoria ou por id de produto
  andares: [
    "animes",                                               // categoria inteira
    { categoria: "artes-marciais", produtos: ["kimono", "faixa"] }, // só alguns
  ],
};
```

A ordem de `andares` é a ordem do expositor (de cima para baixo).

Opcionais (usados em `/encomendas/`; sem eles a página fica igual às outras):

```js
  textos: { botaoVer: "Ver produtos", tituloExpositor: "Tudo o que fazemos" }, // troca os textos padrão (lista em TEXTOS no app.js)
  quantidade: 10,                          // quantidade sugerida ao abrir uma peça
  perguntas: ["Seu nome", "Data do evento"], // perguntadas antes de enviar; vão na mensagem do WhatsApp
  galeria: { titulo: "...", descricao: "...", fotos: [{ foto: "img/trabalhos/x.jpg", legenda: "..." }] }, // seção “Trabalhos entregues”
``` Os ids dos produtos e as categorias estão em `assets/produtos.js`.

## Chaveiros

- **Artes Marciais:** faixa, faixa com nome, kimonos (branco, azul, rosa, traço) com escolha da cor da faixa, luva de boxe, luva dourada, medalhão lutador, placa com frase, medalha, troféu, katana, nunchaku, shuriken, yin-yang, kanji 武, portal torii
- **Salão de beleza — Brindes para Clientes:** Tag NFC de Agendamento, Porta-OB, porta-anel, porta-batom, porta-óleo capilar, porta-xuxinha, espelhinho de bolsa, pente de bolso, cápsula de grampos, porta-comprimidos, gancho de bolsa, abre-porta sem toque
- **Salão de beleza — Outras Peças (não são chaveiros):** Display NFC Instagram + Google, Placa NFC do Instagram, Placa NFC de Avaliação, Porta-Cartão com NFC
- **Itamaraty — Chaveiros 55 Anos:** Selo 55 Anos, Chaveiro com Nome, Abridor de Garrafa 55, Xícara de Café, Grão de Café, Wafer Itamaraty, Ramo de Trigo, Coração Paixão, Barrinha de Chocolate, Biscoito Recheado, Pacotinho de Café
- **Itamaraty — Para a Mesa e a Cozinha (não são chaveiros):** Porta-Copos 55 Anos, Prendedor de Pacote, Ímã de Geladeira
- **Encomendas — Kits Montados (não são chaveiros):** Kit Lembrança, Kit Boas-Vindas, Kit Homenagem, Kit Festa, Kit Formatura, Kit Encontro, Kit Fim de Ano, Kit Dia dos Professores
- **Encomendas — Chaveiros Personalizados:** com a sua arte, com nome, com frase, abridor, com QR Code, esqueleto articulado
- **Encomendas — Bottons:** 4,5 cm, 3,5 cm, com nome, espelho, abridor, ímã, chaveiro
- **Encomendas — Quadros e Plaquinhas:** quadro 15×20 cm, quadro com nomes, mini quadro 10×10 cm, plaquinha de mesa, placa QR Code de balcão
- **Encomendas — Caixinhas e Papelaria:** caixinha para chaveiro e botton, caixa para quadro, cartão de mensagem, tag para bombom, sacolinha, adesivos
- **Encomendas — Canecas, Copos e Garrafinhas:** caneca de porcelana, caneca com colherzinha, caneca de alumínio, copo com tampa e canudo, garrafinha
- **Encomendas — Cadernos e Agendas:** agenda, caderno
- **Encomendas — Presentes Personalizados:** pantufa, caixa com nome, caixa presente com fita, jogo da velha
- **Encomendas — Decoração 3D:** letras e palavras 3D, vaso com planta 3D, imagem religiosa 3D
- **Encomendas — Outras Lembranças:** ímã de geladeira, marcador de página, topo de bolo, porta-copos, suporte de celular, medalha com fita, topper de docinho, tag de mala, crachá com nome
- **Animes & Desenhos:** bonequinhos (Goku, Vegeta, Naruto, Sasuke, Kakashi, Luffy, Zoro, Tanjiro, Nezuko, Pikachu, Bob Esponja, Patrick), Goku, Esfera do Dragão, Nuvem Voadora, bandana da Folha, Sharingan, Kunai, Nuvem Akatsuki, Chapéu de Palha, bandeira pirata, Brinco do Tanjiro, Pokébola, Raio do Pikachu

O cliente escolhe os chaveiros e envia o pedido pronto pelo WhatsApp.

## Como editar

- **WhatsApp, categorias e produtos:** `assets/produtos.js`.
- **Fotos reais:** coloque em `img/chaveiros/` com os nomes listados em `img/chaveiros/LEIA-ME.md` (quadradas, uns 800 px). As fotos de trabalhos entregues ficam em `img/trabalhos/`.
- **Visual:** `assets/style.css`. **Estrutura da página:** `assets/app.js`.

## Ver localmente

Rode um servidor na pasta do projeto e abra `http://localhost:8000/` ou `http://localhost:8000/gustavo-campassi/`:

```bash
python3 -m http.server 8000
```

## Publicar grátis

GitHub → Settings → Pages → Branch `main`, pasta `/ (root)`.
