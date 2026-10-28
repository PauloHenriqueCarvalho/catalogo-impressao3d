const $ = (sel) => document.querySelector(sel);

const FAIXAS_CLARAS = ["Branca", "Cinza", "Amarela"];

// Chaveiro completo: argola + corrente + peça (com a cor da faixa, se houver)
function svgChaveiro(p, cor = p.faixa) {
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
  return `<img src="${p.foto}" alt="Chaveiro ${p.nome}" loading="lazy"
            onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'arte',innerHTML:this.dataset.arte}))"
            data-arte='${svgChaveiro(p, cor).replace(/'/g, "&#39;")}'>`;
}

// ---------- Expositor ----------
function montarExpositor() {
  for (const andar of ["cima", "baixo"]) {
    const alvo = $(andar === "cima" ? "#andar-cima" : "#andar-baixo");
    let fileira;
    PRODUTOS.filter((p) => p.andar === andar).forEach((p, i) => {
      // Cada fileira do expositor tem sua própria barra com 6 ganchos
      if (i % 6 === 0) {
        fileira = document.createElement("div");
        fileira.className = "fileira";
        fileira.innerHTML = `<div class="barra"></div><div class="ganchos"></div>`;
        alvo.appendChild(fileira);
      }
      const b = document.createElement("button");
      b.type = "button";
      b.className = "gancho";
      b.style.setProperty("--atraso", `${(i * 0.37) % 1.6}s`);
      b.setAttribute("aria-label", `Ver ${p.nome}`);
      b.innerHTML = `<span class="pino"></span><span class="pendente">${svgChaveiro(p)}</span><span class="etiqueta">${p.nome}</span>`;
      b.addEventListener("click", () => abrirModal(p));
      fileira.querySelector(".ganchos").appendChild(b);
    });
  }
}

// ---------- Catálogo ----------
function montarGrade(andar, seletor) {
  const alvo = $(seletor);
  PRODUTOS.filter((p) => p.andar === andar).forEach((p) => {
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

// ---------- Modal ----------
let produtoAberto = null;
let corAberta = null;
function abrirModal(p) {
  produtoAberto = p;
  corAberta = p.faixa || null;
  $("#modal-imagem").innerHTML = imagemProduto(p, corAberta);
  montarCores(p);
  $("#modal-categoria").textContent = p.andar === "cima" ? "Artes Marciais" : "Animes & Desenhos";
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

$("#modal-fechar").addEventListener("click", () => $("#modal").close());
$("#modal").addEventListener("click", (e) => { if (e.target === e.currentTarget) $("#modal").close(); });
$("#modal-adicionar").addEventListener("click", () => { adicionar(produtoAberto, corAberta); $("#modal").close(); });

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
  const msg = `Olá, ${LOJA.nome}! Quero encomendar estes chaveiros:\n\n${linhas}`;
  $("#pedido-enviar").href = `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`;
}

$("#pedido-limpar").addEventListener("click", () => { pedido.clear(); atualizarPedido(); });

let timerAviso;
function avisar(texto) {
  const el = $("#aviso");
  el.textContent = texto;
  el.classList.add("visivel");
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => el.classList.remove("visivel"), 1800);
}

montarExpositor();
montarGrade("cima", "#grade-artes");
montarGrade("baixo", "#grade-animes");
