# Verissimo 3D · Catálogo de Chaveiros

Landing page de catálogo de chaveiros impressos em 3D, com expositor em andares e uma página separada para cada cliente.

## Páginas

| Rota | Para quem | Andares |
|---|---|---|
| `/` | Catálogo geral da loja | Todas as categorias |
| `/gustavo-campassi/` | Gustavo Campassi (salão Beauté Naturelle) | Brindes para Clientes, Uso no Salão — tema natural |

As páginas de cliente não aparecem no Google (`noindex`) e o nome do cliente só vai na mensagem do WhatsApp.

### Criar a página de um novo cliente

1. Copie a pasta `gustavo-campassi/` com o nome do cliente (ex.: `maria-silva/`).
2. No `index.html` da pasta nova, edite o bloco `CATALOGO`:

```js
const CATALOGO = {
  cliente: "Maria Silva",
  tema: "natural",          // opcional: paleta clara; sem isso usa a escura
  subtitulo: "Texto do topo", // opcional
  andares: [
    "animes",                                               // categoria inteira
    { categoria: "artes-marciais", produtos: ["kimono", "faixa"] }, // só alguns
  ],
};
```

A ordem de `andares` é a ordem do expositor (de cima para baixo). Os ids dos produtos e as categorias estão em `assets/produtos.js`.

## Chaveiros

- **Artes Marciais:** faixa, faixa com nome, kimonos (branco, azul, rosa, traço) com escolha da cor da faixa, luva de boxe, luva dourada, medalhão lutador, placa com frase, medalha, troféu, katana, nunchaku, shuriken, yin-yang, kanji 武, portal torii
- **Salão de beleza — Brindes para Clientes:** logo do salão, tesoura, secador, pente de bolso, escova redonda, chapinha, gota de óleo, folha, espelhinho de bolsa, porta-xuxinha, QR code de agendamento, cartão fidelidade
- **Salão de beleza — Uso no Salão:** ficha de guarda-volumes, identificador de chaves, crachá da equipe, cartela de cores, porta-grampos, abre-porta sem toque
- **Animes & Desenhos:** bonequinhos (Goku, Vegeta, Naruto, Sasuke, Kakashi, Luffy, Zoro, Tanjiro, Nezuko, Pikachu, Bob Esponja, Patrick), Goku, Esfera do Dragão, Nuvem Voadora, bandana da Folha, Sharingan, Kunai, Nuvem Akatsuki, Chapéu de Palha, bandeira pirata, Brinco do Tanjiro, Pokébola, Raio do Pikachu

O cliente escolhe os chaveiros e envia o pedido pronto pelo WhatsApp.

## Como editar

- **WhatsApp, categorias e produtos:** `assets/produtos.js`.
- **Fotos reais:** coloque em `img/chaveiros/` com os nomes listados em `img/chaveiros/LEIA-ME.md`.
- **Visual:** `assets/style.css`. **Estrutura da página:** `assets/app.js`.

## Ver localmente

Rode um servidor na pasta do projeto e abra `http://localhost:8000/` ou `http://localhost:8000/gustavo-campassi/`:

```bash
python3 -m http.server 8000
```

## Publicar grátis

GitHub → Settings → Pages → Branch `main`, pasta `/ (root)`.
