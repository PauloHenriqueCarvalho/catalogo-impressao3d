// ============================================================
// Monta o catálogo a partir da configuração CATALOGO, definida no
// index.html de cada página (raiz ou pasta de cliente):
//
//   const CATALOGO = {
//     cliente: "Nome",              // opcional: entra na mensagem do WhatsApp
//     tema: "natural",              // opcional: "natural" ou "azul" (padrão: escuro)
//     subtitulo: "Texto do topo",   // opcional
//     andares: [
//       "artes-marciais",            // categoria inteira
//       { categoria: "animes", produtos: ["boneco-goku", "esfera"] }, // só alguns
//     ],
//   };
// ============================================================
const $ = (sel) => document.querySelector(sel);

// Raiz do site (pasta acima de assets/), para achar as fotos de qualquer página
const BASE = new URL("..", document.currentScript.src);

const FAIXAS_CLARAS = ["Branca", "Cinza", "Amarela"];

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
        <a href="#expositor">Chaveiros</a>
        ${ANDARES.map((a) => `<a href="#${a.categoria}">${a.curto}</a>`).join("")}
        <a href="#como-funciona">Como pedir</a>
      </nav>
    </header>

    <section class="hero" id="inicio">
      <div class="hero-texto">
        <p class="selo">Catálogo · Chaveiros</p>
        <h1>Verissimo <span>3D</span></h1>
        <p class="hero-sub">${CATALOGO.subtitulo || "Chaveiros impressos em 3D, leves, resistentes e feitos sob encomenda."}</p>
        <div class="hero-acoes">
          <a class="btn btn-primario" href="#expositor">Ver chaveiros</a>
          <a class="btn btn-secundario" href="#como-funciona">Como fazer o pedido</a>
        </div>
        <ul class="hero-info">
          <li><b>PLA</b> material ecológico</li>
          <li><b>~5 cm</b> tamanho médio</li>
          <li><b>Cores</b> personalizáveis</li>
        </ul>
      </div>
    </section>

    <section class="secao" id="expositor">
      <div class="secao-cabecalho">
        <p class="selo">Coleção</p>
        <h2>Nossos chaveiros</h2>
        <p>Toque em um chaveiro para ver os detalhes.</p>
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
        <li><span>1</span><h3>Escolha</h3><p>Adicione os chaveiros ao pedido pelo expositor ou pelo catálogo.</p></li>
        <li><span>2</span><h3>Envie</h3><p>Clique em “Enviar pelo WhatsApp” e a lista vai pronta na mensagem.</p></li>
        <li><span>3</span><h3>Imprimimos</h3><p>Combinamos cores e prazo, e sua peça é impressa camada por camada.</p></li>
      </ol>
    </section>

    <footer class="rodape">
      <p><b>Verissimo 3D</b> · Impressão 3D sob encomenda</p>
      <p class="rodape-pequeno">Imagens ilustrativas. Cores e tamanhos podem variar.${temPersonagens ? " Personagens pertencem aos seus respectivos criadores." : ""}</p>
    </footer>

    <div class="pedido" id="pedido" hidden>
      <div class="pedido-resumo">
        <b id="pedido-qtd">0 itens</b>
        <span>no seu pedido</span>
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
        <div class="cores" id="modal-cores" hidden></div>
        <button class="btn btn-primario" id="modal-adicionar" type="button">Adicionar ao pedido</button>
      </div>
    </dialog>

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
            <button class="btn btn-primario btn-pequeno" type="button">${p.faixa ? "Escolher cor" : "Adicionar"}</button>
          </div>
        </div>`;
      card.querySelector(".card-imagem").addEventListener("click", () => abrirModal(p));
      card.querySelector(".card-rodape button").addEventListener("click", () => (p.faixa ? abrirModal(p) : adicionar(p)));
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

const nomeItem = (p, cor) => (cor ? `${p.nome} (faixa ${cor.toLowerCase()})` : p.nome);

function adicionar(p, cor = null) {
  const chave = `${p.id}|${cor || ""}`;
  pedido.set(chave, (pedido.get(chave) || 0) + 1);
  atualizarPedido();
  avisar(`${nomeItem(p, cor)} adicionado ao pedido`);
}

function atualizarPedido() {
  const itens = [...pedido].map(([chave, qtd]) => {
    const [id, cor] = chave.split("|");
    return { nome: nomeItem(PRODUTOS.find((x) => x.id === id), cor), qtd };
  });
  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);

  $("#pedido").hidden = qtdTotal === 0;
  $("#pedido-qtd").textContent = `${qtdTotal} ${qtdTotal === 1 ? "item" : "itens"}`;

  const linhas = itens.map((i) => `• ${i.qtd}x ${i.nome}`).join("\n");
  const apresentacao = CATALOGO.cliente ? ` Aqui é ${CATALOGO.cliente}.` : "";
  const msg = `Olá, ${LOJA.nome}!${apresentacao} Quero encomendar:\n\n${linhas}`;
  $("#pedido-enviar").href = `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`;
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
$("#modal-adicionar").addEventListener("click", () => { adicionar(produtoAberto, corAberta); $("#modal").close(); });
$("#pedido-limpar").addEventListener("click", () => { pedido.clear(); atualizarPedido(); });
