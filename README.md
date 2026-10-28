# Verissimo 3D · Catálogo de Chaveiros

Landing page de catálogo de chaveiros impressos em 3D, com expositor de dois andares:

- **1º andar (em cima):** Artes Marciais — faixa, kimono, luva de boxe, yin-yang, nunchaku, kanji 武
- **2º andar (embaixo):** Animes & Desenhos — Goku, Esfera do Dragão, bandana da Folha (Naruto), Sharingan, Chapéu de Palha, Pokébola

O cliente escolhe os chaveiros e envia o pedido pronto pelo WhatsApp.

## Como editar

- **WhatsApp, produtos e preços:** `produtos.js` (no topo do arquivo, troque `whatsapp` pelo seu número).
- **Fotos reais:** coloque em `img/chaveiros/` com os nomes listados em `img/chaveiros/LEIA-ME.md`.
- **Visual:** `style.css`.

## Ver localmente

Abra o `index.html` no navegador, ou:

```bash
python3 -m http.server 8000
```

## Publicar grátis

GitHub → Settings → Pages → Branch `main`, pasta `/ (root)`.
