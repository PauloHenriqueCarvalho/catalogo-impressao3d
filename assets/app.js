// ============================================================
// Monta o catálogo a partir da configuração CATALOGO, definida no
// index.html de cada página (raiz ou pasta de cliente):
//
//   const CATALOGO = {
//     cliente: "Nome",              // opcional: entra na mensagem do WhatsApp
//     tema: "natural",              // opcional: "natural" ou "azul" (padrão: escuro)
//     subtitulo: "Texto do topo",   // opcional
//     precos: { "categoria-ou-id": 4 }, // opcional: preço em reais por categoria ou produto
//     andares: [
//       "artes-marciais",            // categoria inteira
//       { categoria: "animes", produtos: ["boneco-goku", "esfera"] }, // só alguns
//     ],
//     // Opcionais para páginas de encomenda (sem eles, a página fica como sempre foi):
//     textos: { botaoVer: "Ver produtos", ... }, // troca os textos padrão (veja TEXTOS abaixo)
//     quantidade: 10,               // quantidade sugerida; o botão do card abre o detalhe
//     perguntas: ["Tipo de evento", "Data"], // perguntadas antes de enviar; vão na mensagem
//   };
// ============================================================
const $ = (sel) => document.querySelector(sel);

// Raiz do site (pasta acima de assets/), para achar as fotos de qualquer página
const BASE = new URL("..", document.currentScript.src);

const FAIXAS_CLARAS = ["Branca", "Cinza", "Amarela"];

// Textos da página. Os padrões são os do catálogo de chaveiros;
// uma página pode trocar qualquer um em CATALOGO.textos.
const TEXTOS = {
  menuExpositor: "Chaveiros",
  seloHero: "Catálogo · Chaveiros",
  subtitulo: "Chaveiros impressos em 3D, leves, resistentes e feitos sob encomenda.",
  botaoVer: "Ver chaveiros",
  info: [["PLA", "material ecológico"], ["~5 cm", "tamanho médio"], ["Cores", "personalizáveis"]],
  tituloExpositor: "Nossos chaveiros",
  dicaExpositor: "Toque em um chaveiro para ver os detalhes.",
  passos: [
    ["Escolha", "Adicione os chaveiros ao pedido pelo expositor ou pelo catálogo."],
    ["Envie", "Clique em “Enviar pelo WhatsApp” e a lista vai pronta na mensagem."],
    ["Imprimimos", "Combinamos cores e prazo, e sua peça é impressa camada por camada."],
  ],
  ...CATALOGO.textos,
};
const PERGUNTAS = CATALOGO.perguntas || [];

const reais = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
// Preço definido na página do cliente (por produto ou por categoria); sem preço, não mostra
const preco = (p) => CATALOGO.precos?.[p.id] ?? CATALOGO.precos?.[p.categoria] ?? null;

// Andares normalizados: { categoria, nome, descricao, produtos: [...] }
const ANDARES = CATALOGO.andares.map((a) => {
  const cfg = typeof a === "string" ? { categoria: a } : a;
  const cat = CATEGORIAS[cfg.categoria];
  const produtos = cfg.produtos
    ? cfg.produtos.map((id) => PRODUTOS.find((p) => p.id === id)).filter(Boolean)
    : PRODUTOS.filter((p) => p.categoria === cfg.categoria);
  return {
    categoria: cfg.categoria,
    nome: cfg.nome || cat.nome,
    curto: cfg.curto || cat.curto || cat.nome.split(" & ")[0],
    descricao: cfg.descricao || cat.descricao,
    produtos,
  };
});

// ---------- Estrutura da página ----------
function montarPagina() {
  if (CATALOGO.tema) document.body.classList.add("tema-claro", `tema-${CATALOGO.tema}`);
  const temPersonagens = ANDARES.some((a) => a.categoria === "animes");

  const secoes = ANDARES.map((a) => `
    <section class="secao" id="${a.categoria}">
      <div class="secao-cabecalho">
        <p class="selo">Coleção</p>
        <h2>${a.nome}</h2>
        <p>${a.descricao}</p>
      </div>
      <div class="grade" data-grade="${a.categoria}"></div>
    </section>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="topo">
      <a class="logo" href="#inicio">
        <span class="logo-cubo" aria-hidden="true"></span>
        <span>Verissimo <b>3D</b></span>
      </a>
      <nav>
        <a href="#expositor">${TEXTOS.menuExpositor}</a>
        ${ANDARES.map((a) => `<a href="#${a.categoria}">${a.curto}</a>`).join("")}
        <a href="#como-funciona">Como pedir</a>
      </nav>
    </header>

    <section class="hero" id="inicio">
      <div class="hero-texto">
        <p class="selo">${TEXTOS.seloHero}</p>
        <h1>Verissimo <span>3D</span></h1>
        <p class="hero-sub">${CATALOGO.subtitulo || TEXTOS.subtitulo}</p>
        <div class="hero-acoes">
          <a class="btn btn-primario" href="#expositor">${TEXTOS.botaoVer}</a>
          <a class="btn btn-secundario" href="#como-funciona">Como fazer o pedido</a>
        </div>
        <ul class="hero-info">
          ${TEXTOS.info.map(([forte, texto]) => `<li><b>${forte}</b> ${texto}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="secao" id="expositor">
      <div class="secao-cabecalho">
        <p class="selo">Coleção</p>
        <h2>${TEXTOS.tituloExpositor}</h2>
        <p>${TEXTOS.dicaExpositor}</p>
      </div>
      <div class="expositor">
        <div class="expositor-placa">VERISSIMO 3D</div>
        <div class="expositor-corpo">
          ${ANDARES.map((a) => `
            <div class="andar">
              <span class="andar-rotulo">${a.nome}</span>
              <div data-andar="${a.categoria}"></div>
            </div>`).join("")}
        </div>
        <div class="expositor-base"></div>
      </div>
    </section>

    ${secoes}

    <section class="secao" id="como-funciona">
      <div class="secao-cabecalho">
        <p class="selo">Como pedir</p>
        <h2>Simples assim</h2>
      </div>
      <ol class="passos">
        ${TEXTOS.passos.map(([titulo, texto], i) => `<li><span>${i + 1}</span><h3>${titulo}</h3><p>${texto}</p></li>`).join("")}
      </ol>
    </section>

    <footer class="rodape">
      <p><b>Verissimo 3D</b> · Impressão 3D sob encomenda</p>
      <p class="rodape-pequeno">Imagens ilustrativas. Cores e tamanhos podem variar.${temPersonagens ? " Personagens pertencem aos seus respectivos criadores." : ""}</p>
    </footer>

    <div class="pedido" id="pedido" hidden>
      <div class="pedido-resumo">
        <b id="pedido-qtd">0 itens</b>
        <span id="pedido-total">no seu pedido</span>
      </div>
      <button class="btn btn-secundario btn-pequeno" id="pedido-limpar" type="button">Limpar</button>
      <a class="btn btn-primario btn-pequeno" id="pedido-enviar" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>
    </div>

    <dialog class="modal" id="modal">
      <button class="modal-fechar" id="modal-fechar" type="button" aria-label="Fechar">×</button>
      <div class="modal-imagem" id="modal-imagem"></div>
      <div class="modal-texto">
        <p class="selo" id="modal-categoria"></p>
        <h3 id="modal-nome"></h3>
        <p id="modal-descricao"></p>
        <p class="preco" id="modal-preco" hidden></p>
        <div class="cores" id="modal-cores" hidden></div>
        <label class="quantidade">Quantidade <input type="number" id="modal-qtd" min="1" value="1" inputmode="numeric"></label>
        <button class="btn btn-primario" id="modal-adicionar" type="button">Adicionar ao pedido</button>
      </div>
    </dialog>

    ${PERGUNTAS.length ? `
    <dialog class="modal modal-evento" id="evento">
      <button class="modal-fechar" id="evento-fechar" type="button" aria-label="Fechar">×</button>
      <form class="modal-texto" id="evento-form" method="dialog">
        <p class="selo">Quase lá</p>
        <h3>Conte sobre a sua encomenda</h3>
        <p>Assim já te passo o orçamento certo. Pode deixar em branco o que ainda não sabe.</p>
        ${PERGUNTAS.map((q, i) => `<label class="campo">${q}<input type="text" name="p${i}" autocomplete="off"></label>`).join("")}
        <a class="btn btn-primario" id="evento-enviar" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>
      </form>
    </dialog>` : ""}

    <div class="aviso" id="aviso" role="status"></div>`);
}

// Peças que não são chaveiros (displays, suportes) ficam apoiadas, sem argola
const ehPeca = (p) => Boolean(CATEGORIAS[p.categoria].peca);

// Chaveiro completo: argola + corrente + peça (com a cor da faixa, se houver)
function svgChaveiro(p, cor = p.faixa) {
  if (ehPeca(p)) {
    return `<svg viewBox="0 0 100 100" class="chaveiro-svg peca-svg" aria-hidden="true"><g>${ARTES[p.arte]}</g></svg>`;
  }
  const estilo = cor
    ? `style="--faixa: ${CORES_FAIXA[cor]}; --faixa-texto: ${FAIXAS_CLARAS.includes(cor) ? "#1d1d1f" : "#f3f1ec"}"`
    : "";
  return `
    <svg viewBox="0 -46 100 146" class="chaveiro-svg" aria-hidden="true" ${estilo}>
      <circle cx="50" cy="-34" r="10" fill="none" stroke="#c9ced6" stroke-width="3.5"/>
      <g fill="none" stroke="#aab0b9" stroke-width="2.5">
        <ellipse cx="50" cy="-19" rx="3" ry="5"/>
        <ellipse cx="50" cy="-10" rx="3" ry="5"/>
        <ellipse cx="50" cy="-1" rx="3" ry="5"/>
      </g>
      <g>${ARTES[p.arte]}</g>
    </svg>`;
}

// Foto real se existir, senão a ilustração
function imagemProduto(p, cor) {
  const arte = `<div class="arte">${svgChaveiro(p, cor)}</div>`;
  if (!p.foto) return arte;
  return `<img src="${new URL(p.foto, BASE).href}" alt="${p.nome}" loading="lazy"
            onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'arte',innerHTML:this.dataset.arte}))"
            data-arte='${svgChaveiro(p, cor).replace(/'/g, "&#39;")}'>`;
}

// ---------- Expositor ----------
function montarExpositor() {
  for (const andar of ANDARES) {
    const alvo = document.querySelector(`[data-andar="${andar.categoria}"]`);
    let fileira;
    andar.produtos.forEach((p, i) => {
      // Cada fileira do expositor tem sua própria barra com 6 ganchos
      if (i % 6 === 0) {
        fileira = document.createElement("div");
        fileira.className = ehPeca(p) ? "fileira prateleira" : "fileira";
        fileira.innerHTML = `<div class="barra"></div><div class="ganchos"></div>`;
        alvo.appendChild(fileira);
      }
      const b = document.createElement("button");
      b.type = "button";
      b.className = ehPeca(p) ? "gancho apoiado" : "gancho";
      b.style.setProperty("--atraso", `${(i * 0.37) % 1.6}s`);
      b.setAttribute("aria-label", `Ver ${p.nome}`);
      b.innerHTML = `<span class="pino"></span><span class="pendente">${svgChaveiro(p)}</span><span class="etiqueta">${p.nome}</span>`;
      b.addEventListener("click", () => abrirModal(p));
      fileira.querySelector(".ganchos").appendChild(b);
    });
  }
}

// ---------- Catálogo ----------
function montarGrades() {
  for (const andar of ANDARES) {
    const alvo = document.querySelector(`[data-grade="${andar.categoria}"]`);
    andar.produtos.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <button class="card-imagem" type="button" aria-label="Ver ${p.nome}">${imagemProduto(p)}</button>
        <div class="card-corpo">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="card-rodape">
            ${preco(p) !== null ? `<span class="preco">${reais(preco(p))} <small>cada</small></span>` : ""}
            <button class="btn btn-primario btn-pequeno" type="button">${p.faixa ? "Escolher cor" : "Adicionar"}</button>
          </div>
        </div>`;
      card.querySelector(".card-imagem").addEventListener("click", () => abrirModal(p));
      card.querySelector(".card-rodape button").addEventListener("click", () => (p.faixa || CATALOGO.quantidade ? abrirModal(p) : adicionar(p)));
      alvo.appendChild(card);
    });
  }
}

// ---------- Modal ----------
let produtoAberto = null;
let corAberta = null;
function abrirModal(p) {
  produtoAberto = p;
  corAberta = p.faixa || null;
  $("#modal-imagem").innerHTML = imagemProduto(p, corAberta);
  montarCores(p);
  $("#modal-categoria").textContent = CATEGORIAS[p.categoria].nome;
  $("#modal-nome").textContent = p.nome;
  $("#modal-descricao").textContent = p.descricao;
  $("#modal-preco").hidden = preco(p) === null;
  if (preco(p) !== null) $("#modal-preco").innerHTML = `${reais(preco(p))} <small>cada</small>`;
  $("#modal-qtd").value = CATALOGO.quantidade || 1;
  $("#modal").showModal();
}
// Seletor de cor da faixa
function montarCores(p) {
  const alvo = $("#modal-cores");
  alvo.hidden = !p.faixa;
  if (!p.faixa) return;
  alvo.innerHTML = `<p class="cores-titulo">Cor da faixa: <b>${corAberta}</b></p><div class="cores-lista"></div>`;
  for (const [nome, hex] of Object.entries(CORES_FAIXA)) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cor";
    b.style.background = hex;
    b.title = nome;
    b.setAttribute("aria-label", `Faixa ${nome}`);
    b.setAttribute("aria-pressed", nome === corAberta);
    b.addEventListener("click", () => {
      corAberta = nome;
      $("#modal-imagem").innerHTML = imagemProduto(p, nome);
      montarCores(p);
    });
    alvo.querySelector(".cores-lista").appendChild(b);
  }
}

// ---------- Pedido ----------
const pedido = new Map(); // "id|cor" -> quantidade
const respostas = []; // respostas das PERGUNTAS, na mesma ordem

const nomeItem = (p, cor) => (cor ? `${p.nome} (faixa ${cor.toLowerCase()})` : p.nome);

function adicionar(p, cor = null, qtd = 1) {
  const chave = `${p.id}|${cor || ""}`;
  pedido.set(chave, (pedido.get(chave) || 0) + qtd);
  atualizarPedido();
  avisar(`${qtd > 1 ? `${qtd}x ` : ""}${nomeItem(p, cor)} adicionado ao pedido`);
}

function atualizarPedido() {
  const itens = [...pedido].map(([chave, qtd]) => {
    const [id, cor] = chave.split("|");
    const p = PRODUTOS.find((x) => x.id === id);
    return { nome: nomeItem(p, cor), qtd, preco: preco(p) };
  });
  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);
  const comPreco = itens.some((i) => i.preco !== null);
  const total = itens.reduce((s, i) => s + i.qtd * (i.preco ?? 0), 0);

  $("#pedido").hidden = qtdTotal === 0;
  $("#pedido-qtd").textContent = `${qtdTotal} ${qtdTotal === 1 ? "item" : "itens"}`;
  $("#pedido-total").textContent = comPreco ? `Total ${reais(total)}` : "no seu pedido";

  const linhas = itens
    .map((i) => `• ${i.qtd}x ${i.nome}${i.preco !== null ? ` — ${reais(i.preco)} cada = ${reais(i.qtd * i.preco)}` : ""}`)
    .join("\n");
  const msg = `Olá, ${LOJA.nome}! Quero encomendar:\n\n${linhas}`
    + (comPreco ? `\n\nTotal: ${reais(total)}` : "")
    + (PERGUNTAS.length ? `\n\n${PERGUNTAS.map((q, i) => `${q}: ${respostas[i] || ""}`).join("\n")}` : "")
    + (CATALOGO.cliente ? `\n\nCliente: ${CATALOGO.cliente}` : "");
  const link = `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`;
  $("#pedido-enviar").href = link;
  if (PERGUNTAS.length) $("#evento-enviar").href = link;
}

let timerAviso;
function avisar(texto) {
  const el = $("#aviso");
  el.textContent = texto;
  el.classList.add("visivel");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => el.classList.remove("visivel"), 1800);
}

montarPagina();
montarExpositor();
montarGrades();

$("#modal-fechar").addEventListener("click", () => $("#modal").close());
$("#modal").addEventListener("click", (e) => { if (e.target === e.currentTarget) $("#modal").close(); });
$("#modal-adicionar").addEventListener("click", () => {
  const qtd = Math.max(1, parseInt($("#modal-qtd").value, 10) || 1);
  adicionar(produtoAberto, corAberta, qtd);
  $("#modal").close();
});
$("#pedido-limpar").addEventListener("click", () => { pedido.clear(); atualizarPedido(); });

// Perguntas antes de enviar: o botão da barra abre o formulário
if (PERGUNTAS.length) {
  $("#pedido-enviar").addEventListener("click", (e) => { e.preventDefault(); $("#evento").showModal(); });
  $("#evento-fechar").addEventListener("click", () => $("#evento").close());
  $("#evento").addEventListener("click", (e) => { if (e.target === e.currentTarget) $("#evento").close(); });
  $("#evento-form").addEventListener("input", (e) => {
    respostas[Number(e.target.name.slice(1))] = e.target.value.trim();
    atualizarPedido();
  });
  $("#evento-enviar").addEventListener("click", () => $("#evento").close());
}
