// ============================================================
// CONFIGURAÇÃO DA LOJA — edite aqui
// ============================================================
const LOJA = {
  nome: "Verissimo 3D",
  // Número do WhatsApp com DDI + DDD, só números. Ex.: "5511999998888"
  whatsapp: "5500000000000",
};

// ============================================================
// PRODUTOS
// - andar: "cima" (artes marciais) ou "baixo" (animes e desenhos)
// - foto: caminho de uma foto real em img/chaveiros/. Se o arquivo
//   não existir, a ilustração (arte) é usada no lugar.
// ============================================================
const PRODUTOS = [
  // ---------- 1º ANDAR · ARTES MARCIAIS ----------
  {
    id: "faixa", andar: "cima", nome: "Faixa de Graduação",
    descricao: "Nó de faixa de karatê, judô ou jiu-jitsu. Escolha a cor da sua graduação.",
    foto: "img/chaveiros/faixa.jpg", arte: "faixa",
  },
  {
    id: "kimono", andar: "cima", nome: "Kimono",
    descricao: "Mini kimono com faixa. Branco, azul ou preto, com a faixa na cor que quiser.",
    foto: "img/chaveiros/kimono.jpg", arte: "kimono",
  },
  {
    id: "luva", andar: "cima", nome: "Luva de Boxe",
    descricao: "Luva de boxe / muay thai em miniatura. Clássica vermelha ou personalizada.",
    foto: "img/chaveiros/luva.jpg", arte: "luva",
  },
  {
    id: "yinyang", andar: "cima", nome: "Yin-Yang",
    descricao: "Símbolo do equilíbrio, em duas cores com relevo.",
    foto: "img/chaveiros/yinyang.jpg", arte: "yinyang",
  },
  {
    id: "nunchaku", andar: "cima", nome: "Nunchaku",
    descricao: "Nunchaku com dois bastões articulados — eles balançam de verdade.",
    foto: "img/chaveiros/nunchaku.jpg", arte: "nunchaku",
  },
  {
    id: "kanji", andar: "cima", nome: "Kanji 武 (Bu)",
    descricao: "Medalha com o kanji “Bu”, de Budō — o caminho marcial.",
    foto: "img/chaveiros/kanji.jpg", arte: "kanji",
  },

  {
    id: "faixanome", andar: "cima", nome: "Faixa com Nome",
    descricao: "Faixa personalizada com o seu nome ou o nome da academia, na cor da graduação.",
    foto: "img/chaveiros/faixanome.jpg", arte: "faixanome",
  },
  {
    id: "medalha", andar: "cima", nome: "Medalha",
    descricao: "Medalha de campeão com fita, em dourado, prata ou bronze.",
    foto: "img/chaveiros/medalha.jpg", arte: "medalha",
  },
  {
    id: "trofeu", andar: "cima", nome: "Troféu",
    descricao: "Mini troféu dourado com estrela, para quem vive de competição.",
    foto: "img/chaveiros/trofeu.jpg", arte: "trofeu",
  },
  {
    id: "katana", andar: "cima", nome: "Katana",
    descricao: "Espada samurai com cabo trançado em vermelho e preto.",
    foto: "img/chaveiros/katana.jpg", arte: "katana",
  },
  {
    id: "shuriken", andar: "cima", nome: "Shuriken",
    descricao: "Estrela ninja de quatro pontas em tom metálico.",
    foto: "img/chaveiros/shuriken.jpg", arte: "shuriken",
  },
  {
    id: "torii", andar: "cima", nome: "Portal Torii",
    descricao: "O portal japonês dos dojôs e templos, em vermelho.",
    foto: "img/chaveiros/torii.jpg", arte: "torii",
  },

  // ---------- 2º ANDAR · ANIMES & DESENHOS ----------
  {
    id: "goku", andar: "baixo", nome: "Goku · Símbolo",
    descricao: "Medalha laranja com o kanji do uniforme do Goku (Dragon Ball).",
    foto: "img/chaveiros/goku.jpg", arte: "goku",
  },
  {
    id: "esfera", andar: "baixo", nome: "Esfera do Dragão",
    descricao: "Esfera de 4 estrelas, com acabamento translúcido laranja (Dragon Ball).",
    foto: "img/chaveiros/esfera.jpg", arte: "esfera",
  },
  {
    id: "naruto", andar: "baixo", nome: "Bandana da Folha",
    descricao: "Bandana ninja da Vila da Folha, com placa em tom metálico (Naruto).",
    foto: "img/chaveiros/naruto.jpg", arte: "naruto",
  },
  {
    id: "sharingan", andar: "baixo", nome: "Sharingan",
    descricao: "O olho vermelho com três tomoes do clã Uchiha (Naruto).",
    foto: "img/chaveiros/sharingan.jpg", arte: "sharingan",
  },
  {
    id: "chapeu", andar: "baixo", nome: "Chapéu de Palha",
    descricao: "O chapéu do Luffy, com fita vermelha (One Piece).",
    foto: "img/chaveiros/chapeu.jpg", arte: "chapeu",
  },
  {
    id: "pokebola", andar: "baixo", nome: "Pokébola",
    descricao: "Pokébola clássica em vermelho e branco (Pokémon).",
    foto: "img/chaveiros/pokebola.jpg", arte: "pokebola",
  },
  {
    id: "kunai", andar: "baixo", nome: "Kunai",
    descricao: "A faca ninja clássica, com cabo enrolado e argola (Naruto).",
    foto: "img/chaveiros/kunai.jpg", arte: "kunai",
  },
  {
    id: "akatsuki", andar: "baixo", nome: "Nuvem Akatsuki",
    descricao: "A nuvem vermelha da Akatsuki em fundo preto (Naruto).",
    foto: "img/chaveiros/akatsuki.jpg", arte: "akatsuki",
  },
  {
    id: "nuvem", andar: "baixo", nome: "Nuvem Voadora",
    descricao: "A nuvem dourada do Goku (Dragon Ball).",
    foto: "img/chaveiros/nuvem.jpg", arte: "nuvem",
  },
  {
    id: "tanjiro", andar: "baixo", nome: "Brinco do Tanjiro",
    descricao: "O brinco hanafuda do sol nascente (Demon Slayer).",
    foto: "img/chaveiros/tanjiro.jpg", arte: "tanjiro",
  },
  {
    id: "raio", andar: "baixo", nome: "Raio do Pikachu",
    descricao: "Raio amarelo, inspirado na cauda do Pikachu (Pokémon).",
    foto: "img/chaveiros/raio.jpg", arte: "raio",
  },
  {
    id: "jollyroger", andar: "baixo", nome: "Bandeira Pirata",
    descricao: "A caveira pirata com o chapéu do Luffy (One Piece).",
    foto: "img/chaveiros/jollyroger.jpg", arte: "jollyroger",
  },
];

// ============================================================
// ILUSTRAÇÕES (SVG, viewBox 0 0 100 100) — usadas quando não há foto
// ============================================================
const ARTES = {
  faixa: `
    <rect x="8" y="34" width="84" height="16" rx="3" fill="#1d1d1f" stroke="#5a5d66" stroke-width="2"/>
    <rect x="8" y="38" width="84" height="2" fill="#3a3a3d"/>
    <path d="M44 48 L30 88 L42 90 L50 56 Z" fill="#1d1d1f" stroke="#5a5d66" stroke-width="2"/>
    <path d="M56 48 L70 88 L58 90 L50 56 Z" fill="#2a2a2d" stroke="#5a5d66" stroke-width="2"/>
    <rect x="62" y="74" width="10" height="6" transform="rotate(-20 67 77)" fill="#d6262b"/>
    <rect x="40" y="30" width="20" height="24" rx="5" fill="#2a2a2d" stroke="#5a5d66" stroke-width="2"/>
    <rect x="44" y="34" width="12" height="16" rx="3" fill="#3a3a3d"/>`,
  kimono: `
    <path d="M30 14 L50 26 L70 14 L92 30 L82 46 L72 40 L72 90 L28 90 L28 40 L18 46 L8 30 Z" fill="#f3f1ec" stroke="#cfcac0" stroke-width="2"/>
    <path d="M38 14 L50 46 L62 14" fill="none" stroke="#cfcac0" stroke-width="3"/>
    <path d="M50 46 L50 90" stroke="#e2ded6" stroke-width="2"/>
    <rect x="28" y="56" width="44" height="8" fill="#1d1d1f"/>
    <path d="M46 62 L40 80 L46 80 L50 64 Z M54 62 L60 80 L54 80 L50 64 Z" fill="#1d1d1f"/>`,
  luva: `
    <path d="M26 46 C22 20 44 10 62 14 C80 18 86 36 80 54 C76 66 70 70 66 72 L66 80 L34 80 L34 70 C28 64 27 56 26 46 Z" fill="#d6262b"/>
    <path d="M26 46 C18 44 14 54 20 62 C24 66 30 64 32 60" fill="#b51d22"/>
    <path d="M40 30 C50 24 64 26 70 34" fill="none" stroke="#ef5a5e" stroke-width="5" stroke-linecap="round"/>
    <rect x="32" y="78" width="36" height="14" rx="3" fill="#f3f1ec"/>
    <rect x="32" y="82" width="36" height="3" fill="#d6262b"/>`,
  yinyang: `
    <circle cx="50" cy="50" r="40" fill="#f3f1ec" stroke="#1d1d1f" stroke-width="3"/>
    <path d="M50 10 A40 40 0 0 1 50 90 A20 20 0 0 1 50 50 A20 20 0 0 0 50 10 Z" fill="#1d1d1f"/>
    <circle cx="50" cy="30" r="6" fill="#f3f1ec"/>
    <circle cx="50" cy="70" r="6" fill="#1d1d1f"/>`,
  nunchaku: `
    <rect x="16" y="20" width="14" height="66" rx="7" fill="#8a5a2b" transform="rotate(-14 23 53)"/>
    <rect x="70" y="20" width="14" height="66" rx="7" fill="#8a5a2b" transform="rotate(14 77 53)"/>
    <path d="M22 22 C34 6 66 6 78 22" fill="none" stroke="#9aa0a6" stroke-width="3" stroke-dasharray="4 3"/>
    <g stroke="#6b4320" stroke-width="2"><line x1="16" y1="58" x2="29" y2="55"/><line x1="19" y1="70" x2="32" y2="67"/><line x1="71" y1="55" x2="84" y2="58"/><line x1="68" y1="67" x2="81" y2="70"/></g>`,
  kanji: `
    <circle cx="50" cy="50" r="40" fill="#1d1d1f"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#d6262b" stroke-width="3"/>
    <text x="50" y="66" text-anchor="middle" font-size="44" font-weight="700" fill="#f3f1ec" font-family="'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif">武</text>`,
  goku: `
    <circle cx="50" cy="50" r="40" fill="#f08a24"/>
    <circle cx="50" cy="50" r="30" fill="#f3f1ec"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="#1d3c8f" stroke-width="3"/>
    <text x="50" y="64" text-anchor="middle" font-size="38" font-weight="700" fill="#1d1d1f" font-family="'Noto Sans JP','Hiragino Sans','Yu Gothic',sans-serif">悟</text>`,
  esfera: `
    <defs><radialGradient id="g-esfera" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".55" stop-color="#f6941e"/><stop offset="1" stop-color="#c25a07"/></radialGradient></defs>
    <circle cx="50" cy="50" r="40" fill="url(#g-esfera)"/>
    <g fill="#d6262b">
      <path id="estrela" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" transform="translate(40 40)"/>
      <use href="#estrela" transform="translate(20 0)"/>
      <use href="#estrela" transform="translate(0 20)"/>
      <use href="#estrela" transform="translate(20 20)"/>
    </g>
    <ellipse cx="36" cy="28" rx="10" ry="5" fill="#fff" opacity=".45" transform="rotate(-30 36 28)"/>`,
  naruto: `
    <path d="M4 44 L22 40 L22 66 L4 62 Z M96 44 L78 40 L78 66 L96 62 Z" fill="#1d3c8f"/>
    <rect x="20" y="34" width="60" height="38" rx="5" fill="#b9c0c8" stroke="#7d858f" stroke-width="2"/>
    <circle cx="25" cy="39" r="1.8" fill="#7d858f"/><circle cx="75" cy="39" r="1.8" fill="#7d858f"/>
    <circle cx="25" cy="67" r="1.8" fill="#7d858f"/><circle cx="75" cy="67" r="1.8" fill="#7d858f"/>
    <path d="M50 64 C38 64 36 50 46 48 C54 46 56 56 49 57 C45 57 45 52 48 52 M50 64 L62 44" fill="none" stroke="#3a3f46" stroke-width="3" stroke-linecap="round"/>`,
  sharingan: `
    <circle cx="50" cy="50" r="40" fill="#1d1d1f"/>
    <circle cx="50" cy="50" r="34" fill="#c4161c"/>
    <circle cx="50" cy="50" r="20" fill="none" stroke="#1d1d1f" stroke-width="2.5"/>
    <circle cx="50" cy="50" r="7" fill="#1d1d1f"/>
    <g fill="#1d1d1f">
      <path id="tomoe" d="M0 -20 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M5 -20 C6 -12 2 -8 -4 -7 C0 -11 2 -15 1 -20 Z" transform="translate(50 50)"/>
      <use href="#tomoe" transform="rotate(120 50 50)"/>
      <use href="#tomoe" transform="rotate(240 50 50)"/>
    </g>`,
  chapeu: `
    <ellipse cx="50" cy="64" rx="44" ry="14" fill="#e3b75c"/>
    <path d="M24 62 C24 30 76 30 76 62 Z" fill="#edc36a"/>
    <path d="M25 56 C34 60 66 60 75 56 L76 62 C66 67 34 67 24 62 Z" fill="#d6262b"/>
    <g stroke="#c99a3c" stroke-width="1.5" fill="none" opacity=".8">
      <path d="M12 64 C30 72 70 72 88 64"/><path d="M34 42 C44 38 56 38 66 42"/>
    </g>`,
  pokebola: `
    <circle cx="50" cy="50" r="40" fill="#f3f1ec" stroke="#1d1d1f" stroke-width="4"/>
    <path d="M10 50 A40 40 0 0 1 90 50 Z" fill="#d6262b" stroke="#1d1d1f" stroke-width="4"/>
    <rect x="10" y="46" width="80" height="8" fill="#1d1d1f"/>
    <circle cx="50" cy="50" r="12" fill="#f3f1ec" stroke="#1d1d1f" stroke-width="4"/>
    <circle cx="50" cy="50" r="5" fill="#f3f1ec" stroke="#1d1d1f" stroke-width="2"/>`,
  faixanome: `
    <rect x="6" y="36" width="88" height="28" rx="4" fill="#1d1d1f" stroke="#5a5d66" stroke-width="2"/>
    <rect x="72" y="36" width="10" height="28" fill="#d6262b"/>
    <text x="38" y="54.5" text-anchor="middle" font-size="11" font-weight="700" fill="#f3f1ec" font-family="Inter,sans-serif">SEU NOME</text>`,
  medalha: `
    <path d="M34 8 L44 8 L56 40 L46 44 Z" fill="#1d3c8f"/>
    <path d="M66 8 L56 8 L44 40 L54 44 Z" fill="#d6262b"/>
    <circle cx="50" cy="64" r="26" fill="#e8b33a" stroke="#b9861c" stroke-width="3"/>
    <circle cx="50" cy="64" r="18" fill="none" stroke="#b9861c" stroke-width="2"/>
    <text x="50" y="73" text-anchor="middle" font-size="24" font-weight="700" fill="#8a5f0e" font-family="Inter,sans-serif">1</text>`,
  trofeu: `
    <path d="M30 20 C16 20 16 40 32 42 M70 20 C84 20 84 40 68 42" fill="none" stroke="#e8b33a" stroke-width="5"/>
    <path d="M30 14 H70 V34 C70 50 60 58 50 58 C40 58 30 50 30 34 Z" fill="#e8b33a"/>
    <path d="M50 22 l3 6 6 .5 -4.5 4 1.5 6 -6 -3.5 -6 3.5 1.5 -6 -4.5 -4 6 -.5z" fill="#fff3c4"/>
    <rect x="45" y="56" width="10" height="14" fill="#c8961f"/>
    <rect x="34" y="70" width="32" height="8" rx="2" fill="#e8b33a"/>
    <rect x="28" y="78" width="44" height="12" rx="2" fill="#3a2a1a"/>`,
  katana: `
    <path d="M47 10 C52 20 54 40 54 66 L46 66 C46 40 46 22 47 10 Z" fill="#dfe4ea" stroke="#9aa3ad" stroke-width="1.5"/>
    <ellipse cx="50" cy="68" rx="12" ry="4" fill="#c79a2e"/>
    <rect x="45.5" y="70" width="9" height="24" rx="2" fill="#1d1d1f"/>
    <path d="M46 74 L54 78 M54 74 L46 78 M46 82 L54 86 M54 82 L46 86" stroke="#c4161c" stroke-width="2"/>`,
  shuriken: `
    <path d="M50 8 L58 42 L92 50 L58 58 L50 92 L42 58 L8 50 L42 42 Z" fill="#9aa3ad" stroke="#5f6770" stroke-width="2" stroke-linejoin="round"/>
    <path d="M50 8 L58 42 L50 50 Z M92 50 L58 58 L50 50 Z M50 92 L42 58 L50 50 Z M8 50 L42 42 L50 50 Z" fill="#c9ced6"/>
    <circle cx="50" cy="50" r="7" fill="#1d1d1f" stroke="#5f6770" stroke-width="2"/>`,
  torii: `
    <path d="M10 22 C30 28 70 28 90 22 L88 32 C70 37 30 37 12 32 Z" fill="#c4161c"/>
    <path d="M8 18 C30 26 70 26 92 18 L90 23 C70 30 30 30 10 23 Z" fill="#1d1d1f"/>
    <rect x="18" y="42" width="64" height="7" fill="#c4161c"/>
    <rect x="46" y="34" width="8" height="8" fill="#c4161c"/>
    <rect x="26" y="34" width="8" height="56" fill="#c4161c"/>
    <rect x="66" y="34" width="8" height="56" fill="#c4161c"/>
    <rect x="24" y="86" width="12" height="5" fill="#1d1d1f"/><rect x="64" y="86" width="12" height="5" fill="#1d1d1f"/>`,
  kunai: `
    <rect x="46" y="10" width="8" height="39" fill="#3a3f46"/>
    <path d="M46 14 L54 18 M46 21 L54 25 M46 28 L54 32 M46 35 L54 39 M46 42 L54 46" stroke="#c9ced6" stroke-width="1.5"/>
    <path d="M50 48 L64 60 L50 94 L36 60 Z" fill="#9aa3ad" stroke="#5f6770" stroke-width="2" stroke-linejoin="round"/>
    <path d="M50 50 L50 92" stroke="#c9ced6" stroke-width="1.5"/>`,
  akatsuki: `
    <rect x="6" y="22" width="88" height="56" rx="12" fill="#1d1d1f"/>
    <path d="M24 62 C14 62 14 48 24 48 C24 36 40 34 44 42 C48 30 66 32 66 44 C78 40 88 52 78 60 C76 66 68 66 64 62 C58 68 46 68 42 62 C36 68 26 68 24 62 Z" fill="#c4161c" stroke="#f3f1ec" stroke-width="3"/>`,
  nuvem: `
    <path d="M82 66 C90 70 96 66 96 58" fill="none" stroke="#e0a800" stroke-width="4" stroke-linecap="round"/>
    <path d="M18 66 C6 66 6 48 20 48 C20 34 38 30 44 40 C50 26 72 28 72 42 C86 40 94 58 82 66 Z" fill="#ffd84a" stroke="#e0a800" stroke-width="3"/>
    <path d="M28 52 C32 46 40 46 42 50 M54 44 C58 40 64 40 66 46" fill="none" stroke="#fff1a8" stroke-width="3" stroke-linecap="round"/>`,
  tanjiro: `
    <rect x="28" y="12" width="44" height="80" rx="4" fill="#f3f1ec" stroke="#cfcac0" stroke-width="2"/>
    <rect x="28" y="70" width="44" height="22" fill="#c4161c"/>
    <circle cx="50" cy="44" r="13" fill="#c4161c"/>
    <g stroke="#c4161c" stroke-width="3" stroke-linecap="round">
      <line x1="50" y1="27" x2="50" y2="23"/><line x1="67" y1="44" x2="71" y2="44"/><line x1="50" y1="61" x2="50" y2="65"/><line x1="33" y1="44" x2="29" y2="44"/>
      <line x1="62" y1="32" x2="64.8" y2="29.2"/><line x1="62" y1="56" x2="64.8" y2="58.8"/><line x1="38" y1="56" x2="35.2" y2="58.8"/><line x1="38" y1="32" x2="35.2" y2="29.2"/>
    </g>`,
  raio: `
    <path d="M58 8 L26 54 L46 54 L36 92 L76 40 L54 40 L66 8 Z" fill="#ffd84a" stroke="#c48f00" stroke-width="3" stroke-linejoin="round"/>`,
  jollyroger: `
    <circle cx="50" cy="50" r="40" fill="#1d1d1f"/>
    <g stroke="#f3f1ec" stroke-width="7" stroke-linecap="round"><line x1="24" y1="74" x2="76" y2="42"/><line x1="24" y1="42" x2="76" y2="74"/></g>
    <circle cx="50" cy="52" r="18" fill="#f3f1ec"/>
    <rect x="41" y="60" width="18" height="12" rx="3" fill="#f3f1ec"/>
    <circle cx="43" cy="52" r="4.5" fill="#1d1d1f"/><circle cx="57" cy="52" r="4.5" fill="#1d1d1f"/>
    <path d="M30 40 C30 26 70 26 70 40 Z" fill="#edc36a"/>
    <rect x="24" y="38" width="52" height="5" rx="2" fill="#e3b75c"/>
    <rect x="31" y="35" width="38" height="3" fill="#d6262b"/>`,
};
