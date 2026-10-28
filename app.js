const $ = (sel) => document.querySelector(sel);

// Chaveiro completo: argola + corrente + peça
function svgChaveiro(p) {
  return `
    <svg viewBox="0 -46 100 146" class="chaveiro-svg" aria-hidden="true">
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
function imagemProduto(p) {
  const arte = `<div class="arte">${svgChaveiro(p)}</div>`;
  if (!p.foto) return arte;
  return `<img src="${p.foto}" alt="Chaveiro ${p.nome}" loading="lazy"
            onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'arte',innerHTML:this.dataset.arte}))"
            data-arte='${svgChaveiro(p).replace(/'/g, "&#39;")}'>`;
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
          <button class="btn btn-primario btn-pequeno" type="button">Adicionar</button>
        </div>
      </div>`;
    card.querySelector(".card-imagem").addEventListener("click", () => abrirModal(p));
    card.querySelector(".card-rodape button").addEventListener("click", () => adicionar(p));
    alvo.appendChild(card);
  });
}

// ---------- Modal ----------
let produtoAberto = null;
function abrirModal(p) {
  produtoAberto = p;
  $("#modal-imagem").innerHTML = imagemProduto(p);
  $("#modal-categoria").textContent = p.andar === "cima" ? "Artes Marciais" : "Animes & Desenhos";
  $("#modal-nome").textContent = p.nome;
  $("#modal-descricao").textContent = p.descricao;
  $("#modal").showModal();
}
$("#modal-fechar").addEventListener("click", () => $("#modal").close());
$("#modal").addEventListener("click", (e) => { if (e.target === e.currentTarget) $("#modal").close(); });
$("#modal-adicionar").addEventListener("click", () => { adicionar(produtoAberto); $("#modal").close(); });

// ---------- Pedido ----------
const pedido = new Map(); // id -> quantidade

function adicionar(p) {
  pedido.set(p.id, (pedido.get(p.id) || 0) + 1);
  atualizarPedido();
  avisar(`${p.nome} adicionado ao pedido`);
}

function atualizarPedido() {
  const itens = [...pedido].map(([id, qtd]) => ({ p: PRODUTOS.find((x) => x.id === id), qtd }));
  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);

  $("#pedido").hidden = qtdTotal === 0;
  $("#pedido-qtd").textContent = `${qtdTotal} ${qtdTotal === 1 ? "item" : "itens"}`;

  const linhas = itens.map((i) => `• ${i.qtd}x ${i.p.nome}`).join("\n");
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
