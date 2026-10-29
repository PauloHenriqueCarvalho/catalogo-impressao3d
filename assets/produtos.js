// ============================================================
// CONFIGURAÇÃO DA LOJA — edite aqui
// ============================================================
const LOJA = {
  nome: "Verissimo Arte",
  instagram: "verissimo.arte", // sem o @
  // Número do WhatsApp com DDI + DDD, só números. Ex.: "5511999998888"
  whatsapp: "5543991950011",
};

// ============================================================
// CATEGORIAS — cada andar do expositor mostra uma categoria
// ============================================================
const CATEGORIAS = {
  "artes-marciais": {
    nome: "Artes Marciais",
    descricao: "Karatê, judô, jiu-jitsu, boxe, muay thai e kung fu.",
  },
  animes: {
    nome: "Animes & Desenhos",
    descricao: "Dragon Ball, Naruto, One Piece, Demon Slayer, Pokémon e mais.",
  },
  "salao-brindes": {
    nome: "Brindes para Clientes",
    curto: "Brindes",
    descricao: "Chaveiros úteis de verdade, que as clientes usam todo dia — e lembram do salão a cada uso.",
  },
  "itamaraty-chaveiros": {
    nome: "Chaveiros 55 Anos",
    curto: "55 Anos",
    descricao: "Lembranças dos 55 anos para a equipe levar todo dia — com a marca, o café e o trigo da Itamaraty.",
  },
  "itamaraty-mesa": {
    nome: "Para a Mesa e a Cozinha",
    curto: "Mesa e Cozinha",
    descricao: "Peças úteis para o trabalho e para casa, com o selo dos 55 anos.",
    peca: true,
  },
  "salao-outros": {
    nome: "Outras Peças",
    curto: "Outras Peças",
    descricao: "Displays com NFC para o balcão: a cliente encosta o celular e segue, avalia ou agenda.",
    peca: true, // não são chaveiros: aparecem apoiadas na prateleira
  },
  // ---------- ENCOMENDAS (festas, eventos e empresas) ----------
  "enc-kits": {
    nome: "Kits Montados",
    curto: "Kits",
    descricao: "Tudo junto na caixinha, pronto para entregar. É só mandar o tema e a quantidade.",
    peca: true,
  },
  "enc-chaveiros": {
    nome: "Chaveiros Personalizados",
    curto: "Chaveiros",
    descricao: "Com a arte, o nome ou a frase do seu evento. A lembrança que a pessoa usa todo dia.",
  },
  "enc-bottons": {
    nome: "Bottons",
    curto: "Bottons",
    descricao: "Bottons com alfinete e a arte do seu evento, para usar no dia e guardar de lembrança.",
    peca: true,
  },
  "enc-quadros": {
    nome: "Quadros e Plaquinhas",
    curto: "Quadros",
    descricao: "Para homenagear, presentear e sinalizar: quadros em relevo e placas de mesa.",
    peca: true,
  },
  "enc-caixas": {
    nome: "Caixinhas e Papelaria",
    curto: "Papelaria",
    descricao: "Caixinhas, cartões, tags e adesivos com a arte do evento, para o presente chegar bonito.",
    peca: true,
  },
  "enc-canecas": {
    nome: "Canecas, Copos e Garrafinhas",
    curto: "Canecas",
    descricao: "Com nome, frase ou a arte do evento. Presente útil que vai para a mesa todo dia.",
    peca: true,
  },
  "enc-cadernos": {
    nome: "Cadernos e Agendas",
    curto: "Agendas",
    descricao: "Capa personalizada com nome, arte ou foto. Úteis o ano inteiro.",
    peca: true,
  },
  "enc-presentes": {
    nome: "Presentes Personalizados",
    curto: "Presentes",
    descricao: "Peças com nome, frase ou tema para presentear em datas especiais.",
    peca: true,
  },
  "enc-decoracao": {
    nome: "Decoração 3D",
    curto: "Decoração",
    descricao: "Peças impressas em 3D para decorar a casa, a festa ou o escritório.",
    peca: true,
  },
  "enc-lembrancas": {
    nome: "Outras Lembranças",
    curto: "Lembranças",
    descricao: "Mais peças úteis para completar o kit ou pedir separado.",
    peca: true,
  },
};

// ============================================================
// PRODUTOS
// - categoria: uma das chaves de CATEGORIAS
// - faixa: cor padrão da faixa; quando existe, o cliente escolhe a cor
// - foto: caminho (a partir da raiz do site) de uma foto real em
//   img/chaveiros/. Se o arquivo não existir, a ilustração é usada.
// ============================================================
const CORES_FAIXA = {
  Branca: "#f3f1ec", Cinza: "#8d939c", Amarela: "#f2c230", Laranja: "#f07a1a",
  Verde: "#2e9e4f", Azul: "#1f5fbf", Roxa: "#7b3fb0", Marrom: "#7a4a26",
  Preta: "#1d1d1f", Vermelha: "#c4161c",
};

const PRODUTOS = [
  // ---------- ARTES MARCIAIS ----------
  {
    id: "faixa", categoria: "artes-marciais", nome: "Faixa de Graduação",
    descricao: "Nó de faixa de karatê, judô ou jiu-jitsu. Escolha a cor da sua graduação.",
    faixa: "Preta", foto: "img/chaveiros/faixa.jpg", arte: "faixa",
  },
  {
    id: "kimono", categoria: "artes-marciais", nome: "Kimono Branco",
    descricao: "Mini kimono branco com a faixa na cor da sua graduação.",
    faixa: "Preta", foto: "img/chaveiros/kimono.jpg", arte: "kimono",
  },
  {
    id: "kimonoazul", categoria: "artes-marciais", nome: "Kimono Azul",
    descricao: "Kimono azul com kanji de jiu-jitsu no peito e faixa na cor que quiser.",
    faixa: "Preta", foto: "img/chaveiros/kimonoazul.jpg", arte: "kimonoazul",
  },
  {
    id: "kimonorosa", categoria: "artes-marciais", nome: "Kimono Rosa",
    descricao: "Kimono rosa com a faixa na cor da sua graduação.",
    faixa: "Branca", foto: "img/chaveiros/kimonorosa.jpg", arte: "kimonorosa",
  },
  {
    id: "kimonotraco", categoria: "artes-marciais", nome: "Kimono Traço",
    descricao: "Kimono branco com contorno preto marcado, estilo desenho.",
    faixa: "Amarela", foto: "img/chaveiros/kimonotraco.jpg", arte: "kimonotraco",
  },
  {
    id: "luva", categoria: "artes-marciais", nome: "Luva de Boxe",
    descricao: "Luva de boxe / muay thai em miniatura. Clássica vermelha ou personalizada.",
    foto: "img/chaveiros/luva.jpg", arte: "luva",
  },
  {
    id: "luvadourada", categoria: "artes-marciais", nome: "Luva Dourada",
    descricao: "Luva de boxe dourada com o nome que quiser no punho.",
    foto: "img/chaveiros/luvadourada.jpg", arte: "luvadourada",
  },
  {
    id: "yinyang", categoria: "artes-marciais", nome: "Yin-Yang",
    descricao: "Símbolo do equilíbrio, em duas cores com relevo.",
    foto: "img/chaveiros/yinyang.jpg", arte: "yinyang",
  },
  {
    id: "nunchaku", categoria: "artes-marciais", nome: "Nunchaku",
    descricao: "Nunchaku com dois bastões articulados — eles balançam de verdade.",
    foto: "img/chaveiros/nunchaku.jpg", arte: "nunchaku",
  },
  {
    id: "kanji", categoria: "artes-marciais", nome: "Kanji 武 (Bu)",
    descricao: "Medalha com o kanji “Bu”, de Budō — o caminho marcial.",
    foto: "img/chaveiros/kanji.jpg", arte: "kanji",
  },

  {
    id: "faixanome", categoria: "artes-marciais", nome: "Faixa com Nome",
    descricao: "Faixa personalizada com o seu nome ou o nome da academia, na cor da graduação.",
    faixa: "Azul", foto: "img/chaveiros/faixanome.jpg", arte: "faixanome",
  },
  {
    id: "medalha", categoria: "artes-marciais", nome: "Medalha",
    descricao: "Medalha de campeão com fita, em dourado, prata ou bronze.",
    foto: "img/chaveiros/medalha.jpg", arte: "medalha",
  },
  {
    id: "trofeu", categoria: "artes-marciais", nome: "Troféu",
    descricao: "Mini troféu dourado com estrela, para quem vive de competição.",
    foto: "img/chaveiros/trofeu.jpg", arte: "trofeu",
  },
  {
    id: "katana", categoria: "artes-marciais", nome: "Katana",
    descricao: "Espada samurai com cabo trançado em vermelho e preto.",
    foto: "img/chaveiros/katana.jpg", arte: "katana",
  },
  {
    id: "shuriken", categoria: "artes-marciais", nome: "Shuriken",
    descricao: "Estrela ninja de quatro pontas em tom metálico.",
    foto: "img/chaveiros/shuriken.jpg", arte: "shuriken",
  },
  {
    id: "torii", categoria: "artes-marciais", nome: "Portal Torii",
    descricao: "O portal japonês dos dojôs e templos, em vermelho.",
    foto: "img/chaveiros/torii.jpg", arte: "torii",
  },
  {
    id: "lutador", categoria: "artes-marciais", nome: "Medalhão Lutador",
    descricao: "Medalhão com silhueta de chute, para karatê, taekwondo e kickboxing.",
    foto: "img/chaveiros/lutador.jpg", arte: "lutador",
  },
  {
    id: "frase", categoria: "artes-marciais", nome: "Placa com Frase",
    descricao: "Placa “Só perde quem desiste” — ou com a frase que você quiser.",
    foto: "img/chaveiros/frase.jpg", arte: "frase",
  },

  // ---------- ANIMES & DESENHOS ----------
  // Bonequinhos
  {
    id: "boneco-goku", categoria: "animes", nome: "Gokuzinho",
    descricao: "Bonequinho do Goku com o uniforme laranja (Dragon Ball).",
    foto: "img/chaveiros/boneco-goku.jpg", arte: "boneco-goku",
  },
  {
    id: "boneco-vegeta", categoria: "animes", nome: "Vegetinha",
    descricao: "Bonequinho do Vegeta com armadura saiyajin (Dragon Ball).",
    foto: "img/chaveiros/boneco-vegeta.jpg", arte: "boneco-vegeta",
  },
  {
    id: "boneco-naruto", categoria: "animes", nome: "Narutinho",
    descricao: "Bonequinho do Naruto com bandana da Folha (Naruto).",
    foto: "img/chaveiros/boneco-naruto.jpg", arte: "boneco-naruto",
  },
  {
    id: "boneco-sasuke", categoria: "animes", nome: "Sasukinho",
    descricao: "Bonequinho do Sasuke (Naruto).",
    foto: "img/chaveiros/boneco-sasuke.jpg", arte: "boneco-sasuke",
  },
  {
    id: "boneco-kakashi", categoria: "animes", nome: "Kakashizinho",
    descricao: "Bonequinho do Kakashi com máscara e colete jōnin (Naruto).",
    foto: "img/chaveiros/boneco-kakashi.jpg", arte: "boneco-kakashi",
  },
  {
    id: "boneco-luffy", categoria: "animes", nome: "Luffyzinho",
    descricao: "Bonequinho do Luffy com o chapéu de palha (One Piece).",
    foto: "img/chaveiros/boneco-luffy.jpg", arte: "boneco-luffy",
  },
  {
    id: "boneco-zoro", categoria: "animes", nome: "Zorozinho",
    descricao: "Bonequinho do Zoro com os brincos e a faixa verde (One Piece).",
    foto: "img/chaveiros/boneco-zoro.jpg", arte: "boneco-zoro",
  },
  {
    id: "boneco-tanjiro", categoria: "animes", nome: "Tanjirozinho",
    descricao: "Bonequinho do Tanjiro com o haori xadrez (Demon Slayer).",
    foto: "img/chaveiros/boneco-tanjiro.jpg", arte: "boneco-tanjiro",
  },
  {
    id: "boneco-nezuko", categoria: "animes", nome: "Nezukinha",
    descricao: "Boneca da Nezuko com o bambu e o kimono rosa (Demon Slayer).",
    foto: "img/chaveiros/boneco-nezuko.jpg", arte: "boneco-nezuko",
  },
  {
    id: "boneco-pikachu", categoria: "animes", nome: "Pikachuzinho",
    descricao: "Bonequinho do Pikachu com o rabo de raio (Pokémon).",
    foto: "img/chaveiros/boneco-pikachu.jpg", arte: "boneco-pikachu",
  },
  {
    id: "boneco-bob", categoria: "animes", nome: "Bob Esponja",
    descricao: "Bonequinho do Bob Esponja de gravata (Bob Esponja).",
    foto: "img/chaveiros/boneco-bob.jpg", arte: "boneco-bob",
  },
  {
    id: "boneco-patrick", categoria: "animes", nome: "Patrick",
    descricao: "Bonequinho do Patrick de bermuda florida (Bob Esponja).",
    foto: "img/chaveiros/boneco-patrick.jpg", arte: "boneco-patrick",
  },
  // Símbolos
  {
    id: "goku", categoria: "animes", nome: "Goku · Símbolo",
    descricao: "Medalha laranja com o kanji do uniforme do Goku (Dragon Ball).",
    foto: "img/chaveiros/goku.jpg", arte: "goku",
  },
  {
    id: "esfera", categoria: "animes", nome: "Esfera do Dragão",
    descricao: "Esfera de 4 estrelas, com acabamento translúcido laranja (Dragon Ball).",
    foto: "img/chaveiros/esfera.jpg", arte: "esfera",
  },
  {
    id: "naruto", categoria: "animes", nome: "Bandana da Folha",
    descricao: "Bandana ninja da Vila da Folha, com placa em tom metálico (Naruto).",
    foto: "img/chaveiros/naruto.jpg", arte: "naruto",
  },
  {
    id: "sharingan", categoria: "animes", nome: "Sharingan",
    descricao: "O olho vermelho com três tomoes do clã Uchiha (Naruto).",
    foto: "img/chaveiros/sharingan.jpg", arte: "sharingan",
  },
  {
    id: "chapeu", categoria: "animes", nome: "Chapéu de Palha",
    descricao: "O chapéu do Luffy, com fita vermelha (One Piece).",
    foto: "img/chaveiros/chapeu.jpg", arte: "chapeu",
  },
  {
    id: "pokebola", categoria: "animes", nome: "Pokébola",
    descricao: "Pokébola clássica em vermelho e branco (Pokémon).",
    foto: "img/chaveiros/pokebola.jpg", arte: "pokebola",
  },
  {
    id: "kunai", categoria: "animes", nome: "Kunai",
    descricao: "A faca ninja clássica, com cabo enrolado e argola (Naruto).",
    foto: "img/chaveiros/kunai.jpg", arte: "kunai",
  },
  {
    id: "akatsuki", categoria: "animes", nome: "Nuvem Akatsuki",
    descricao: "A nuvem vermelha da Akatsuki em fundo preto (Naruto).",
    foto: "img/chaveiros/akatsuki.jpg", arte: "akatsuki",
  },
  {
    id: "nuvem", categoria: "animes", nome: "Nuvem Voadora",
    descricao: "A nuvem dourada do Goku (Dragon Ball).",
    foto: "img/chaveiros/nuvem.jpg", arte: "nuvem",
  },
  {
    id: "tanjiro", categoria: "animes", nome: "Brinco do Tanjiro",
    descricao: "O brinco hanafuda do sol nascente (Demon Slayer).",
    foto: "img/chaveiros/tanjiro.jpg", arte: "tanjiro",
  },
  {
    id: "raio", categoria: "animes", nome: "Raio do Pikachu",
    descricao: "Raio amarelo, inspirado na cauda do Pikachu (Pokémon).",
    foto: "img/chaveiros/raio.jpg", arte: "raio",
  },
  {
    id: "jollyroger", categoria: "animes", nome: "Bandeira Pirata",
    descricao: "A caveira pirata com o chapéu do Luffy (One Piece).",
    foto: "img/chaveiros/jollyroger.jpg", arte: "jollyroger",
  },
  // ---------- SALÃO DE BELEZA ----------
  {
    id: "salao-nfc-agenda", categoria: "salao-brindes", nome: "Tag NFC de Agendamento",
    descricao: "Encostou o celular, abre o agendamento direto com o Gustavo. Funciona em iPhone e Android, sem aplicativo.",
    foto: "img/chaveiros/salao-nfc-agenda.jpg", arte: "salao-nfc-agenda",
  },
  {
    id: "salao-porta-ob", categoria: "salao-brindes", nome: "Porta-OB",
    descricao: "Cápsula com tampa de rosca que guarda absorventes internos com discrição na bolsa ou na chave.",
    foto: "img/chaveiros/salao-porta-ob.jpg", arte: "salao-porta-ob",
  },
  {
    id: "salao-porta-anel", categoria: "salao-brindes", nome: "Porta-Anel",
    descricao: "Fecho que segura os anéis na hora de lavar as mãos, passar creme ou fazer as unhas — sem perder nenhum.",
    foto: "img/chaveiros/salao-porta-anel.jpg", arte: "salao-porta-anel",
  },
  {
    id: "salao-porta-batom", categoria: "salao-brindes", nome: "Porta-Batom",
    descricao: "Capa para batom ou hidratante labial sempre à mão, presa na chave.",
    foto: "img/chaveiros/salao-porta-batom.jpg", arte: "salao-porta-batom",
  },
  {
    id: "salao-porta-oleo", categoria: "salao-brindes", nome: "Porta-Óleo Capilar",
    descricao: "Suporte para o frasquinho de óleo ou sérum de bolso — perfeito junto com um mini óleo do salão.",
    foto: "img/chaveiros/salao-porta-oleo.jpg", arte: "salao-porta-oleo",
  },
  {
    id: "salao-elastico", categoria: "salao-brindes", nome: "Porta-Xuxinha",
    descricao: "Guarda os elásticos de cabelo presos na chave — nunca mais perde.",
    foto: "img/chaveiros/salao-elastico.jpg", arte: "salao-elastico",
  },
  {
    id: "salao-espelho", categoria: "salao-brindes", nome: "Espelhinho de Bolsa",
    descricao: "Chaveiro com espelho de verdade para retocar o visual.",
    foto: "img/chaveiros/salao-espelho.jpg", arte: "salao-espelho",
  },
  {
    id: "salao-pente", categoria: "salao-brindes", nome: "Pente de Bolso",
    descricao: "Pente funcional de verdade: penteia e cabe no chaveiro.",
    foto: "img/chaveiros/salao-pente.jpg", arte: "salao-pente",
  },
  {
    id: "salao-capsula-grampos", categoria: "salao-brindes", nome: "Cápsula de Grampos",
    descricao: "Estojinho com tampa para grampos e presilhas de emergência.",
    foto: "img/chaveiros/salao-capsula-grampos.jpg", arte: "salao-capsula-grampos",
  },
  {
    id: "salao-porta-comprimido", categoria: "salao-brindes", nome: "Porta-Comprimidos",
    descricao: "Cápsula de rosca para levar remédio ou vitamina do dia.",
    foto: "img/chaveiros/salao-porta-comprimido.jpg", arte: "salao-porta-comprimido",
  },
  {
    id: "salao-gancho-bolsa", categoria: "salao-brindes", nome: "Gancho de Bolsa",
    descricao: "Pendura a bolsa na mesa ou no balcão, sem deixar no chão.",
    foto: "img/chaveiros/salao-gancho-bolsa.jpg", arte: "salao-gancho-bolsa",
  },
  {
    id: "salao-abre-porta", categoria: "salao-brindes", nome: "Abre-Porta Sem Toque",
    descricao: "Gancho para abrir portas e apertar botões sem encostar a mão.",
    foto: "img/chaveiros/salao-abre-porta.jpg", arte: "salao-abre-porta",
  },
  {
    id: "salao-display-duplo", categoria: "salao-outros", nome: "Display NFC Instagram + Google",
    descricao: "Placa de balcão com duas áreas: encostou o celular de um lado, abre o Instagram do salão; do outro, a avaliação no Google.",
    foto: "img/chaveiros/salao-display-duplo.jpg", arte: "salao-display-duplo",
  },
  {
    id: "salao-placa-instagram", categoria: "salao-outros", nome: "Placa NFC do Instagram",
    descricao: "Placa de pé para a recepção ou o espelho: a cliente encosta o celular e já cai no Instagram para seguir.",
    foto: "img/chaveiros/salao-placa-instagram.jpg", arte: "salao-placa-instagram",
  },
  {
    id: "salao-placa-google", categoria: "salao-outros", nome: "Placa NFC de Avaliação",
    descricao: "Encostou o celular, abre a página de avaliação do salão no Google. Ideal para o caixa, na hora de pagar.",
    foto: "img/chaveiros/salao-placa-google.jpg", arte: "salao-placa-google",
  },
  {
    id: "salao-porta-cartao", categoria: "salao-outros", nome: "Porta-Cartão com NFC",
    descricao: "Suporte de balcão que segura os cartões de visita do salão. Na frente tem um NFC: quem não quiser levar o cartão de papel encosta o celular e abre o WhatsApp para agendar com o Gustavo.",
    foto: "img/chaveiros/salao-porta-cartao.jpg", arte: "salao-porta-cartao",
  },
  // ---------- ITAMARATY · 55 ANOS ----------
  {
    id: "itm-55-anos", categoria: "itamaraty-chaveiros", nome: "Selo 55 Anos",
    descricao: "O selo comemorativo em azul e dourado, com relevo. A lembrança oficial do aniversário.",
    foto: "img/chaveiros/itm-55-anos.jpg", arte: "itm-55-anos",
  },
  {
    id: "itm-nome", categoria: "itamaraty-chaveiros", nome: "Chaveiro com Nome",
    descricao: "Cada funcionário recebe o seu, com o próprio nome e o selo dos 55 anos. É o que mais emociona.",
    foto: "img/chaveiros/itm-nome.jpg", arte: "itm-nome",
  },
  {
    id: "itm-abridor", categoria: "itamaraty-chaveiros", nome: "Abridor de Garrafa 55",
    descricao: "Chaveiro abridor com inserto de metal: útil no dia a dia e com a marca da festa.",
    foto: "img/chaveiros/itm-abridor.jpg", arte: "itm-abridor",
  },
  {
    id: "itm-xicara", categoria: "itamaraty-chaveiros", nome: "Xícara de Café",
    descricao: "Xícara com o “55” na frente, lembrando a origem da Itamaraty no café.",
    foto: "img/chaveiros/itm-xicara.jpg", arte: "itm-xicara",
  },
  {
    id: "itm-grao", categoria: "itamaraty-chaveiros", nome: "Grão de Café",
    descricao: "Grão de café em relevo, com o detalhe dourado dos 55 anos.",
    foto: "img/chaveiros/itm-grao.jpg", arte: "itm-grao",
  },
  {
    id: "itm-wafer", categoria: "itamaraty-chaveiros", nome: "Wafer Itamaraty",
    descricao: "Um wafer em miniatura com a marca — divertido e a cara dos produtos da casa.",
    foto: "img/chaveiros/itm-wafer.jpg", arte: "itm-wafer",
  },
  {
    id: "itm-trigo", categoria: "itamaraty-chaveiros", nome: "Ramo de Trigo",
    descricao: "O ramo de trigo dourado da marca, com o “55” no centro.",
    foto: "img/chaveiros/itm-trigo.jpg", arte: "itm-trigo",
  },
  {
    id: "itm-coracao", categoria: "itamaraty-chaveiros", nome: "Coração Paixão",
    descricao: "Coração com o lema “Paixão em tudo que faz” — o espírito dos 55 anos.",
    foto: "img/chaveiros/itm-coracao.jpg", arte: "itm-coracao",
  },
  {
    id: "itm-chocolate", categoria: "itamaraty-chaveiros", nome: "Barrinha de Chocolate",
    descricao: "Mini barra de chocolate com a embalagem azul e dourada da festa.",
    foto: "img/chaveiros/itm-chocolate.jpg", arte: "itm-chocolate",
  },
  {
    id: "itm-biscoito", categoria: "itamaraty-chaveiros", nome: "Biscoito Recheado",
    descricao: "Biscoito recheado em miniatura, com a marca carimbada como os de verdade.",
    foto: "img/chaveiros/itm-biscoito.jpg", arte: "itm-biscoito",
  },
  {
    id: "itm-pacote-cafe", categoria: "itamaraty-chaveiros", nome: "Pacotinho de Café",
    descricao: "Pacote de café em miniatura, homenagem à origem da empresa no café.",
    foto: "img/chaveiros/itm-pacote-cafe.jpg", arte: "itm-pacote-cafe",
  },
  {
    id: "itm-porta-copos", categoria: "itamaraty-mesa", nome: "Porta-Copos 55 Anos",
    descricao: "Porta-copos para a xícara de café na mesa do trabalho ou em casa.",
    foto: "img/chaveiros/itm-porta-copos.jpg", arte: "itm-porta-copos",
  },
  {
    id: "itm-prendedor", categoria: "itamaraty-mesa", nome: "Prendedor de Pacote",
    descricao: "Prendedor para fechar o pacote de café ou biscoito e manter tudo fresquinho.",
    foto: "img/chaveiros/itm-prendedor.jpg", arte: "itm-prendedor",
  },
  {
    id: "itm-ima", categoria: "itamaraty-mesa", nome: "Ímã de Geladeira",
    descricao: "Ímã com o selo “Paixão em tudo que faz” para a geladeira de casa.",
    foto: "img/chaveiros/itm-ima.jpg", arte: "itm-ima",
  },
  // ---------- ENCOMENDAS · Kits ----------
  {
    id: "enc-kit-lembranca", categoria: "enc-kits", nome: "Kit Lembrança",
    descricao: "Chaveiro + botton na caixinha com a arte do evento. O mais pedido para festas, eventos e encontros.",
    foto: "img/chaveiros/enc-kit-lembranca.jpg", arte: "enc-kit-lembranca",
  },
  {
    id: "enc-kit-boas-vindas", categoria: "enc-kits", nome: "Kit Boas-Vindas",
    descricao: "Caixinha com chaveiro da marca, ímã e cartão de mensagem. Para receber funcionários, alunos ou clientes.",
    foto: "img/chaveiros/enc-kit-boas-vindas.jpg", arte: "enc-kit-boas-vindas",
  },
  {
    id: "enc-kit-homenagem", categoria: "enc-kits", nome: "Kit Homenagem",
    descricao: "Quadro 15×20 cm com a arte ou os nomes, na caixa própria. Para líderes, professores, formandos e parceiros.",
    foto: "img/chaveiros/enc-kit-homenagem.jpg", arte: "enc-kit-homenagem",
  },
  {
    id: "enc-kit-festa", categoria: "enc-kits", nome: "Kit Festa",
    descricao: "Toppers de docinho, ímã com nome e data e porta-copos, tudo no tema da festa. Para 15 anos, casamentos e aniversários.",
    foto: "img/chaveiros/enc-kit-festa.jpg", arte: "enc-kit-festa",
  },
  {
    id: "enc-kit-formatura", categoria: "enc-kits", nome: "Kit Formatura",
    descricao: "Medalha com fita e botton com o nome de cada aluno, na caixinha. Para formaturas, gincanas e campeonatos.",
    foto: "img/chaveiros/enc-kit-formatura.jpg", arte: "enc-kit-formatura",
  },
  {
    id: "enc-kit-encontro", categoria: "enc-kits", nome: "Kit Encontro",
    descricao: "Marcador de página, botton, tag de mala e cartão. Para encontros, viagens, acampamentos e congressos.",
    foto: "img/chaveiros/enc-kit-encontro.jpg", arte: "enc-kit-encontro",
  },
  {
    id: "enc-kit-fim-de-ano", categoria: "enc-kits", nome: "Kit Fim de Ano",
    descricao: "Chaveiro abridor, ímã e cartão de boas-festas na caixinha. O brinde de fim de ano para a equipe e os clientes.",
    foto: "img/chaveiros/enc-kit-fim-de-ano.jpg", arte: "enc-kit-fim-de-ano",
  },
  {
    id: "enc-kit-professores", categoria: "enc-kits", nome: "Kit Dia dos Professores",
    descricao: "Caixa com caneca personalizada e cartão de mensagem. Para a escola homenagear cada professor.",
    foto: "img/chaveiros/enc-kit-professores.jpg", arte: "enc-kit-professores",
  },

  // ---------- ENCOMENDAS · Chaveiros ----------
  {
    id: "enc-chav-arte", categoria: "enc-chaveiros", nome: "Chaveiro com a Sua Arte",
    descricao: "Logo, tema ou símbolo do evento, no formato da arte e com relevo em duas cores.",
    foto: "img/chaveiros/enc-chav-arte.jpg", arte: "enc-chav-arte",
  },
  {
    id: "enc-chav-nome", categoria: "enc-chaveiros", nome: "Chaveiro com Nome",
    descricao: "Um para cada pessoa, com o nome dela. É o que mais emociona quem recebe.",
    foto: "img/chaveiros/enc-chav-nome.jpg", arte: "enc-chav-nome",
  },
  {
    id: "enc-chav-frase", categoria: "enc-chaveiros", nome: "Chaveiro com Frase",
    descricao: "Plaquinha com uma frase, um nome ou a data do evento.",
    foto: "img/chaveiros/enc-chav-frase.jpg", arte: "enc-chav-frase",
  },
  {
    id: "enc-chav-abridor", categoria: "enc-chaveiros", nome: "Chaveiro Abridor",
    descricao: "Abridor de garrafa com a sua marca: útil e sempre à mão.",
    foto: "img/chaveiros/enc-chav-abridor.jpg", arte: "enc-chav-abridor",
  },
  {
    id: "enc-chav-qr", categoria: "enc-chaveiros", nome: "Chaveiro com QR Code",
    descricao: "Leva para o Instagram, o site ou o WhatsApp da empresa. Brinde que vira divulgação.",
    foto: "img/chaveiros/enc-chav-qr.jpg", arte: "enc-chav-qr",
  },
  {
    id: "enc-chav-esqueleto", categoria: "enc-chaveiros", nome: "Chaveiro Esqueleto Articulado",
    descricao: "Esqueleto com braços e pernas que mexem. Divertido para o Halloween e para a criançada.",
    foto: "img/chaveiros/enc-chav-esqueleto.jpg", arte: "enc-chav-esqueleto",
  },

  // ---------- ENCOMENDAS · Bottons ----------
  {
    id: "enc-botton-grande", categoria: "enc-bottons", nome: "Botton 4,5 cm",
    descricao: "O tamanho que mais aparece. Ideal para a arte principal do evento.",
    foto: "img/chaveiros/enc-botton-grande.jpg", arte: "enc-botton-grande",
  },
  {
    id: "enc-botton-pequeno", categoria: "enc-bottons", nome: "Botton 3,5 cm",
    descricao: "Mais discreto, para usar na roupa, na bolsa ou na mochila.",
    foto: "img/chaveiros/enc-botton-pequeno.jpg", arte: "enc-botton-pequeno",
  },
  {
    id: "enc-botton-nome", categoria: "enc-bottons", nome: "Botton com Nome",
    descricao: "Identifica a equipe, os voluntários ou a organização no dia do evento.",
    foto: "img/chaveiros/enc-botton-nome.jpg", arte: "enc-botton-nome",
  },
  {
    id: "enc-botton-espelho", categoria: "enc-bottons", nome: "Botton Espelho",
    descricao: "A arte na frente e um espelhinho atrás. Vai na bolsa e é usado todo dia.",
    foto: "img/chaveiros/enc-botton-espelho.jpg", arte: "enc-botton-espelho",
  },
  {
    id: "enc-botton-abridor", categoria: "enc-bottons", nome: "Botton Abridor",
    descricao: "A arte na frente e um abridor de garrafa atrás. Ótimo para festas e brindes de empresa.",
    foto: "img/chaveiros/enc-botton-abridor.jpg", arte: "enc-botton-abridor",
  },
  {
    id: "enc-botton-ima", categoria: "enc-bottons", nome: "Botton Ímã",
    descricao: "Com ímã no lugar do alfinete, para a geladeira ou o quadro de avisos.",
    foto: "img/chaveiros/enc-botton-ima.jpg", arte: "enc-botton-ima",
  },
  {
    id: "enc-botton-chaveiro", categoria: "enc-bottons", nome: "Botton Chaveiro",
    descricao: "O botton com argola de chaveiro: leve, em cores e com a arte inteira.",
    foto: "img/chaveiros/enc-botton-chaveiro.jpg", arte: "enc-botton-chaveiro",
  },

  // ---------- ENCOMENDAS · Quadros e plaquinhas ----------
  {
    id: "enc-quadro-arte", categoria: "enc-quadros", nome: "Quadro 15×20 cm",
    descricao: "A arte do evento em relevo, em duas ou três cores. Fica em pé na mesa ou vai na parede.",
    foto: "img/chaveiros/enc-quadro-arte.jpg", arte: "enc-quadro-arte",
  },
  {
    id: "enc-quadro-nomes", categoria: "enc-quadros", nome: "Quadro com Nomes",
    descricao: "Os nomes da equipe, da turma ou da família num quadro só. Uma homenagem que fica.",
    foto: "img/chaveiros/enc-quadro-nomes.jpg", arte: "enc-quadro-nomes",
  },
  {
    id: "enc-mini-quadro", categoria: "enc-quadros", nome: "Mini Quadro 10×10 cm",
    descricao: "A versão menor do quadro em relevo, para dar a todos os convidados.",
    foto: "img/chaveiros/enc-mini-quadro.jpg", arte: "enc-mini-quadro",
  },
  {
    id: "enc-placa-mesa", categoria: "enc-quadros", nome: "Plaquinha de Mesa",
    descricao: "Número ou nome da mesa, ou “reservado”. Para casamentos, festas e jantares.",
    foto: "img/chaveiros/enc-placa-mesa.jpg", arte: "enc-placa-mesa",
  },
  {
    id: "enc-placa-qr", categoria: "enc-quadros", nome: "Placa QR Code de Balcão",
    descricao: "QR Code do Pix, do Instagram ou do cardápio, em pé no balcão.",
    foto: "img/chaveiros/enc-placa-qr.jpg", arte: "enc-placa-qr",
  },

  // ---------- ENCOMENDAS · Caixinhas e embalagens ----------
  {
    id: "enc-caixa-kit", categoria: "enc-caixas", nome: "Caixinha para Chaveiro e Botton",
    descricao: "Cabe o chaveiro e o botton, com a arte do evento na tampa.",
    foto: "img/chaveiros/enc-caixa-kit.jpg", arte: "enc-caixa-kit",
  },
  {
    id: "enc-caixa-quadro", categoria: "enc-caixas", nome: "Caixa para Quadro",
    descricao: "Caixa sob medida para o quadro 15×20 cm, com fita, pronta para presentear.",
    foto: "img/chaveiros/enc-caixa-quadro.jpg", arte: "enc-caixa-quadro",
  },
  {
    id: "enc-cartao", categoria: "enc-caixas", nome: "Cartão de Mensagem",
    descricao: "Vai dentro da caixinha: agradecimento, boas-vindas ou uma frase especial, com a arte do evento.",
    foto: "img/chaveiros/enc-cartao.jpg", arte: "enc-cartao",
  },
  {
    id: "enc-tag-bombom", categoria: "enc-caixas", nome: "Tag para Bombom",
    descricao: "Etiqueta com a arte e uma mensagem para bombom, pirulito ou docinho. Transforma o kit em presente.",
    foto: "img/chaveiros/enc-tag-bombom.jpg", arte: "enc-tag-bombom",
  },
  {
    id: "enc-sacolinha", categoria: "enc-caixas", nome: "Sacolinha com a Arte",
    descricao: "Sacolinha de papel com a arte do evento, para quando não precisa de caixinha.",
    foto: "img/chaveiros/enc-sacolinha.jpg", arte: "enc-sacolinha",
  },
  {
    id: "enc-adesivos", categoria: "enc-caixas", nome: "Adesivos com a Arte",
    descricao: "Para fechar as embalagens ou entregar soltos para colar no caderno, na garrafinha e no celular.",
    foto: "img/chaveiros/enc-adesivos.jpg", arte: "enc-adesivos",
  },

  // ---------- ENCOMENDAS · Outras lembranças ----------
  {
    id: "enc-ima", categoria: "enc-lembrancas", nome: "Ímã de Geladeira",
    descricao: "Com a arte ou a frase do evento, para lembrar todo dia na cozinha.",
    foto: "img/chaveiros/enc-ima.jpg", arte: "enc-ima",
  },
  {
    id: "enc-marcador", categoria: "enc-lembrancas", nome: "Marcador de Página",
    descricao: "Para o livro, a agenda ou o caderno. Leve, fino e com a arte que quiser.",
    foto: "img/chaveiros/enc-marcador.jpg", arte: "enc-marcador",
  },
  {
    id: "enc-topo-bolo", categoria: "enc-lembrancas", nome: "Topo de Bolo",
    descricao: "Com o nome, a idade ou o tema da festa, combinando com as lembrancinhas.",
    foto: "img/chaveiros/enc-topo-bolo.jpg", arte: "enc-topo-bolo",
  },
  {
    id: "enc-porta-copos", categoria: "enc-lembrancas", nome: "Porta-Copos",
    descricao: "Protege a mesa e deixa a marca da empresa ou do evento à vista.",
    foto: "img/chaveiros/enc-porta-copos.jpg", arte: "enc-porta-copos",
  },
  {
    id: "enc-suporte-celular", categoria: "enc-lembrancas", nome: "Suporte de Celular",
    descricao: "Deixa o celular em pé na mesa do trabalho ou de casa, com a sua marca na frente.",
    foto: "img/chaveiros/enc-suporte-celular.jpg", arte: "enc-suporte-celular",
  },
  {
    id: "enc-medalha", categoria: "enc-lembrancas", nome: "Medalha com Fita",
    descricao: "Em relevo, com a arte ou o nome, e fita colorida. Para formaturas, gincanas, corridas e campeonatos.",
    foto: "img/chaveiros/enc-medalha.jpg", arte: "enc-medalha",
  },
  {
    id: "enc-topper-docinho", categoria: "enc-lembrancas", nome: "Topper de Docinho",
    descricao: "Plaquinhas com palito para brigadeiros e cupcakes, com o nome, a idade ou o tema da festa.",
    foto: "img/chaveiros/enc-topper-docinho.jpg", arte: "enc-topper-docinho",
  },
  {
    id: "enc-tag-mala", categoria: "enc-lembrancas", nome: "Tag de Mala",
    descricao: "Com o nome e a arte, para mochilas e malas. Útil em viagens, encontros e acampamentos.",
    foto: "img/chaveiros/enc-tag-mala.jpg", arte: "enc-tag-mala",
  },
  {
    id: "enc-cracha", categoria: "enc-lembrancas", nome: "Crachá com Nome",
    descricao: "Identifica a equipe e os convidados no evento. Combina com o botton com nome.",
    foto: "img/chaveiros/enc-cracha.jpg", arte: "enc-cracha",
  },
  {
    id: "enc-caneca", categoria: "enc-canecas", nome: "Caneca de Porcelana",
    descricao: "Caneca branca com a arte, o nome ou uma frase. Para professores, aniversários e datas especiais.",
    foto: "img/chaveiros/enc-caneca.jpg", arte: "enc-caneca",
  },
  {
    id: "enc-caneca-colher", categoria: "enc-canecas", nome: "Caneca com Colherzinha",
    descricao: "Colorida por dentro, com colher combinando. Ainda mais caprichada para presente.",
    foto: "img/chaveiros/enc-caneca-colher.jpg", arte: "enc-caneca-colher",
  },
  {
    id: "enc-caneca-aluminio", categoria: "enc-canecas", nome: "Caneca de Alumínio",
    descricao: "Não quebra: ótima para crianças, festas e para levar na bolsa.",
    foto: "img/chaveiros/enc-caneca-aluminio.jpg", arte: "enc-caneca-aluminio",
  },
  {
    id: "enc-copo-canudo", categoria: "enc-canecas", nome: "Copo com Tampa e Canudo",
    descricao: "O queridinho das festas infantis e de 15 anos, com o nome e o tema da festa.",
    foto: "img/chaveiros/enc-copo-canudo.jpg", arte: "enc-copo-canudo",
  },
  {
    id: "enc-garrafinha", categoria: "enc-canecas", nome: "Garrafinha Personalizada",
    descricao: "Com a inicial ou o nome, para a academia, a escola e o trabalho.",
    foto: "img/chaveiros/enc-garrafinha.jpg", arte: "enc-garrafinha",
  },
  {
    id: "enc-agenda", categoria: "enc-cadernos", nome: "Agenda Personalizada",
    descricao: "Capa com nome, arte ou tema e o ano. Presente que acompanha o ano todo.",
    foto: "img/chaveiros/enc-agenda.jpg", arte: "enc-agenda",
  },
  {
    id: "enc-caderno", categoria: "enc-cadernos", nome: "Caderno Personalizado",
    descricao: "Caderno com capa exclusiva, para escola, faculdade ou trabalho.",
    foto: "img/chaveiros/enc-caderno.jpg", arte: "enc-caderno",
  },
  {
    id: "enc-pantufa", categoria: "enc-presentes", nome: "Pantufa Personalizada",
    descricao: "Pantufa macia com a arte ou o nome. Presente que faz sucesso em aniversários e no Dia das Mães.",
    foto: "img/chaveiros/enc-pantufa.jpg", arte: "enc-pantufa",
  },
  {
    id: "enc-caixa-nome", categoria: "enc-presentes", nome: "Caixa com Nome",
    descricao: "Caixa de presente com o nome em destaque, para guardar lembranças ou montar um kit.",
    foto: "img/chaveiros/enc-caixa-nome.jpg", arte: "enc-caixa-nome",
  },
  {
    id: "enc-caixa-presente", categoria: "enc-presentes", nome: "Caixa Presente com Fita",
    descricao: "Caixa com tampa e laço de cetim, para entregar qualquer presente com capricho.",
    foto: "img/chaveiros/enc-caixa-presente.jpg", arte: "enc-caixa-presente",
  },
  {
    id: "enc-jogo-velha", categoria: "enc-presentes", nome: "Jogo da Velha Personalizado",
    descricao: "Tabuleiro com peças no tema da festa. Lembrancinha que as crianças usam de verdade.",
    foto: "img/chaveiros/enc-jogo-velha.jpg", arte: "enc-jogo-velha",
  },
  {
    id: "enc-letras-3d", categoria: "enc-decoracao", nome: "Letras e Palavras 3D",
    descricao: "Nomes e palavras em letras grandes, em pé na mesa, na estante ou na mesa da festa.",
    foto: "img/chaveiros/enc-letras-3d.jpg", arte: "enc-letras-3d",
  },
  {
    id: "enc-vaso-planta", categoria: "enc-decoracao", nome: "Vaso com Planta 3D",
    descricao: "Plantinha que nunca murcha, impressa em 3D com vaso combinando.",
    foto: "img/chaveiros/enc-vaso-planta.jpg", arte: "enc-vaso-planta",
  },
  {
    id: "enc-imagem-santa", categoria: "enc-decoracao", nome: "Imagem Religiosa 3D",
    descricao: "Imagens de santos e peças religiosas, na cor e no tamanho que quiser.",
    foto: "img/chaveiros/enc-imagem-santa.jpg", arte: "enc-imagem-santa",
  },
];

// ============================================================
// ILUSTRAÇÕES (SVG, viewBox 0 0 100 100) — usadas quando não há foto
// ============================================================
// Kimono com cor do tecido, cor do contorno e faixa na cor escolhida
function kimonoArte(tecido, contorno, extra = "", espessura = 2) {
  return `
    <path d="M30 14 L50 26 L70 14 L92 30 L82 46 L72 40 L72 90 L28 90 L28 40 L18 46 L8 30 Z" fill="${tecido}" stroke="${contorno}" stroke-width="${espessura}" stroke-linejoin="round"/>
    <path d="M38 14 L50 46 L62 14" fill="none" stroke="${contorno}" stroke-width="${espessura + 1}"/>
    <path d="M50 46 L50 90" stroke="${contorno}" stroke-width="${espessura}" opacity=".6"/>
    ${extra}
    <rect x="28" y="56" width="44" height="8" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="1"/>
    <path d="M46 62 L40 80 L46 80 L50 64 Z M54 62 L60 80 L54 80 L50 64 Z" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="1"/>`;
}

// ---------- Bonequinhos (proporção normal) ----------
// A cabeça é desenhada numa escala própria (centro 50,42 / raio 19)
// e reduzida para ficar proporcional ao corpo.
function rostoPadrao(olhos, boca = `<path d="M46 55 Q50 57 54 55" fill="none" stroke="#8a4a3a" stroke-width="1.5" stroke-linecap="round"/>`) {
  return `
    <ellipse cx="42" cy="44" rx="3" ry="3.5" fill="${olhos}"/><ellipse cx="58" cy="44" rx="3" ry="3.5" fill="${olhos}"/>
    <circle cx="43" cy="43" r="1" fill="#fff"/><circle cx="59" cy="43" r="1" fill="#fff"/>
    <path d="M38 41.5 Q42 39.5 46 41.5 M54 41.5 Q58 39.5 62 41.5" fill="none" stroke="#1d1d1f" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M37 37 L46 37.5 M54 37.5 L63 37" stroke="#1d1d1f" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M50 47 L49 51 L51.5 51" fill="none" stroke="#c98a6a" stroke-width="1.2" stroke-linecap="round"/>
    ${boca}`;
}

function corpoNormal({ pele, roupa, calca, sapato, mangas = roupa, maos = pele, extra = "" }) {
  return `
    <rect x="46" y="29" width="8" height="8" fill="${pele}"/>
    <path d="M36 38 L28 60 M64 38 L72 60" stroke="${mangas}" stroke-width="7.5" stroke-linecap="round"/>
    <circle cx="27.5" cy="62.5" r="3.8" fill="${maos}"/><circle cx="72.5" cy="62.5" r="3.8" fill="${maos}"/>
    <path d="M39 56 L61 56 L64 88 L54.5 88 L50 66 L45.5 88 L36 88 Z" fill="${calca}"/>
    <ellipse cx="40" cy="90" rx="6.5" ry="3.2" fill="${sapato}"/><ellipse cx="60" cy="90" rx="6.5" ry="3.2" fill="${sapato}"/>
    <path d="M32 37 Q50 32 68 37 L62 58 L38 58 Z" fill="${roupa}"/>
    ${extra}`;
}

function personagem({ pele = PELE, atras = "", tras = "", corpo, olhos = "#1d1d1f", rosto, extraRosto = "", frente = "" }) {
  return `
    ${atras}
    ${corpo}
    <g transform="translate(50 19) scale(.62) translate(-50 -42)">
      ${tras}
      <circle cx="31" cy="45" r="3.5" fill="${pele}"/><circle cx="69" cy="45" r="3.5" fill="${pele}"/>
      <path d="M31 40 C31 24 69 24 69 40 C69 54 60 62 50 63 C40 62 31 54 31 40 Z" fill="${pele}"/>
      ${rosto ?? rostoPadrao(olhos)}
      ${extraRosto}
      ${frente}
    </g>`;
}

const PELE = "#ffd9b8";
const SOBRANCELHA_BRAVA = `<path d="M37 36 L46 39.5 M63 36 L54 39.5" stroke="#1d1d1f" stroke-width="2.4" stroke-linecap="round"/>`;
const BOCA_SERIA = `<path d="M46 56 Q50 54 54 56" fill="none" stroke="#8a4a3a" stroke-width="1.5" stroke-linecap="round"/>`;

// ---------- Encomendas: cores dos filamentos e ajudantes ----------
// Só cores que existem em filamento: marrom, bege, dourado, branco, preto, vermelho e verde.
const ENC = {
  ouro: "#c9a227", ouroClaro: "#e8c55a", marrom: "#7a4a26", marromClaro: "#8f5a33", marromEscuro: "#4e2e17",
  bege: "#eadcc0", begeEscuro: "#cdb88f", branco: "#f6f3ec", preto: "#1d1d1f", vermelho: "#c4161c", verde: "#2e7d4f",
};
const F_ENC = `font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif"`;
const F_ENC_LETRA = `font-family="'Brush Script MT', 'Segoe Script', cursive"`;

// Estrela de 5 pontas centrada em (cx, cy)
function encEstrela(cx, cy, r, cor) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const ang = (-90 + 36 * i) * Math.PI / 180;
    const raio = i % 2 ? r * 0.42 : r;
    return `${(cx + raio * Math.cos(ang)).toFixed(1)},${(cy + raio * Math.sin(ang)).toFixed(1)}`;
  });
  return `<polygon points="${pts.join(" ")}" fill="${cor}"/>`;
}

// Coração centrado em (cx, cy), com largura aproximada 2r
function encCoracao(cx, cy, r, cor) {
  return `<path transform="translate(${cx} ${cy}) scale(${r / 10})" d="M0 9 C-14 0 -11 -11 -5 -11 C-2 -11 0 -8 0 -6 C0 -8 2 -11 5 -11 C11 -11 14 0 0 9 Z" fill="${cor}"/>`;
}

// QR Code ilustrativo (não é um código de verdade): 21×21 módulos
function encQr(x, y, tam, cor = ENC.preto) {
  const n = 21, m = tam / n;
  let d = "", semente = 7;
  const aleatorio = () => (semente = (semente * 1103515245 + 12345) % 2147483648) / 2147483648;
  const quadrado = (i, j, w = 1) => `M${(x + i * m).toFixed(2)} ${(y + j * m).toFixed(2)}h${(w * m).toFixed(2)}v${(w * m).toFixed(2)}h${(-w * m).toFixed(2)}z`;
  const naQuina = (i, j) => (i < 8 && j < 8) || (i > 12 && j < 8) || (i < 8 && j > 12);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (!naQuina(i, j) && aleatorio() < 0.48) d += quadrado(i, j);
  const quina = (i, j) => `<path d="${quadrado(i, j, 7)}" fill="${cor}"/><path d="${quadrado(i + 1, j + 1, 5)}" fill="#fff"/><path d="${quadrado(i + 2, j + 2, 3)}" fill="${cor}"/>`;
  return `<rect x="${x}" y="${y}" width="${tam}" height="${tam}" fill="#fff"/><path d="${d}" fill="${cor}"/>${quina(0, 0)}${quina(14, 0)}${quina(0, 14)}`;
}

// Sombra da peça apoiada na prateleira
const encSombra = (rx = 32) => `<ellipse cx="50" cy="94" rx="${rx}" ry="2.6" fill="#000" opacity=".28"/>`;

const ARTES = {
  faixa: `
    <rect x="8" y="34" width="84" height="16" rx="3" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="2"/>
    <rect x="8" y="38" width="84" height="2" fill="#000" opacity=".15"/>
    <path d="M44 48 L30 88 L42 90 L50 56 Z" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="2"/>
    <path d="M56 48 L70 88 L58 90 L50 56 Z" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="2"/>
    <rect x="62" y="74" width="10" height="6" transform="rotate(-20 67 77)" fill="#d6262b"/>
    <rect x="40" y="30" width="20" height="24" rx="5" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="2"/>
    <rect x="44" y="34" width="12" height="16" rx="3" fill="#000" opacity=".15"/>`,
  kimono: kimonoArte("#f3f1ec", "#cfcac0"),
  kimonoazul: kimonoArte("#1f5fbf", "#164a96", `<text x="62" y="38" text-anchor="middle" font-size="8" font-weight="700" fill="#f3f1ec" font-family="Noto Sans JP, Hiragino Sans, Yu Gothic, sans-serif">柔術</text>`),
  kimonorosa: kimonoArte("#f06ba8", "#c94d86"),
  kimonotraco: kimonoArte("#ffffff", "#1d1d1f", "", 4),
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
    <rect x="6" y="36" width="88" height="28" rx="4" style="fill: var(--faixa, #1d1d1f)" stroke="#5a5d66" stroke-width="2"/>
    <rect x="72" y="36" width="10" height="28" fill="#d6262b"/>
    <text x="38" y="54.5" text-anchor="middle" font-size="11" font-weight="700" style="fill: var(--faixa-texto, #f3f1ec)" font-family="Inter,sans-serif">SEU NOME</text>`,
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
  luvadourada: `
    <defs><linearGradient id="g-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".45" stop-color="#e8b33a"/><stop offset="1" stop-color="#9c6d12"/></linearGradient></defs>
    <path d="M26 46 C22 20 44 10 62 14 C80 18 86 36 80 54 C76 66 70 70 66 72 L66 80 L34 80 L34 70 C28 64 27 56 26 46 Z" fill="url(#g-ouro)"/>
    <path d="M26 46 C18 44 14 54 20 62 C24 66 30 64 32 60" fill="#b9861c"/>
    <path d="M40 30 C50 24 64 26 70 34" fill="none" stroke="#fff6d0" stroke-width="5" stroke-linecap="round"/>
    <rect x="32" y="78" width="36" height="14" rx="3" fill="#1d1d1f"/>
    <text x="50" y="88.5" text-anchor="middle" font-size="8" font-weight="700" fill="#e8b33a" font-family="Inter,sans-serif">NOME</text>`,
  lutador: `
    <circle cx="50" cy="50" r="40" fill="#f3f1ec" stroke="#1d1d1f" stroke-width="3"/>
    <circle cx="50" cy="50" r="34" fill="none" stroke="#d6262b" stroke-width="2"/>
    <g stroke="#1d1d1f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M42 40 L46 58 L40 80"/>
      <path d="M46 58 L74 36"/>
      <path d="M30 50 L43 42 L56 46"/>
    </g>
    <circle cx="39" cy="29" r="6.5" fill="#1d1d1f"/>`,
  frase: `
    <rect x="6" y="28" width="88" height="44" rx="6" fill="#c9ced6" stroke="#8d939c" stroke-width="2"/>
    <rect x="10" y="32" width="80" height="36" rx="4" fill="none" stroke="#e7eaee" stroke-width="1.5"/>
    <text x="50" y="47" text-anchor="middle" font-size="11" font-weight="700" fill="#1d1d1f" font-family="Inter,sans-serif">SÓ PERDE</text>
    <text x="50" y="61" text-anchor="middle" font-size="11" font-weight="700" fill="#1d1d1f" font-family="Inter,sans-serif">QUEM DESISTE</text>`,
  "boneco-goku": personagem({
    tras: `<path d="M30 46 L14 38 L28 32 L16 18 L34 22 L34 6 L48 18 L58 4 L62 20 L78 10 L74 26 L88 26 L72 44 Z" fill="#1d1d1f"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#f08a24", calca: "#f08a24", sapato: "#1d3c8f", extra: `
      <path d="M45 35 L50 43 L55 35 Z" fill="#1d3c8f"/>
      <rect x="38" y="53" width="24" height="4" fill="#1d3c8f"/>
      <circle cx="58" cy="42" r="2.6" fill="#f3f1ec"/>
      <rect x="25" y="54" width="7" height="3.5" fill="#1d3c8f" transform="rotate(-20 28.5 56)"/>
      <rect x="68" y="54" width="7" height="3.5" fill="#1d3c8f" transform="rotate(20 71.5 56)"/>` }),
    frente: `<path d="M31 40 C31 24 69 24 69 40 L65 34 L63 40 L58 31 L54 37 L50 28 L46 37 L42 31 L38 39 L35 34 Z" fill="#1d1d1f"/>`,
  }),
  "boneco-vegeta": personagem({
    tras: `<path d="M33 36 L28 8 L39 18 L43 4 L50 14 L57 4 L61 18 L72 8 L67 36 Z" fill="#1d1d1f"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#23408f", calca: "#23408f", sapato: "#f3f1ec", maos: "#f3f1ec", extra: `
      <path d="M33 37 Q50 32 67 37 L64 49 L36 49 Z" fill="#f3f1ec"/>
      <path d="M33 36 L26 38 L31 46 Z M67 36 L74 38 L69 46 Z" fill="#e8b33a"/>` }),
    rosto: rostoPadrao("#1d1d1f", BOCA_SERIA),
    extraRosto: SOBRANCELHA_BRAVA,
    frente: `<path d="M31 38 C32 26 68 26 69 38 L60 31 L50 40 L40 31 Z" fill="#1d1d1f"/>`,
  }),
  "boneco-naruto": personagem({
    olhos: "#2f7fd6",
    tras: `<path d="M30 44 L18 36 L28 30 L20 16 L36 22 L40 6 L50 18 L60 6 L64 22 L80 16 L72 30 L82 36 L70 44 Z" fill="#f5c518"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#f07a1a", calca: "#f07a1a", sapato: "#1d3c8f", extra: `
      <path d="M32 37 Q50 32 68 37 L66 43 L34 43 Z" fill="#1d1d1f"/>
      <path d="M50 43 L50 58" stroke="#f3f1ec" stroke-width="1.2"/>` }),
    extraRosto: `<path d="M34 48 L39 49 M34 51 L39 51 M34 54 L39 53 M66 48 L61 49 M66 51 L61 51 M66 54 L61 53" stroke="#6b3a2a" stroke-width="1"/>`,
    frente: `
      <path d="M32 36 L35 43 L39 36 L43 43 L47 36 L50 42 L53 36 L57 43 L61 36 L65 43 L68 36 Z" fill="#f5c518"/>
      <rect x="30" y="29" width="40" height="8" rx="2" fill="#1d3c8f"/>
      <rect x="40" y="28" width="20" height="10" rx="1.5" fill="#b9c0c8" stroke="#7d858f"/>
      <path d="M50 35.5 c-3 0 -3 -4 0 -4 c2 0 2 2.5 0 2.5 M50 35.5 l4 -5" fill="none" stroke="#3a3f46" stroke-width="1"/>`,
  }),
  "boneco-sasuke": personagem({
    tras: `<path d="M30 44 C26 30 32 18 48 18 L58 6 L62 18 L76 10 L72 22 L84 24 L70 34 L72 46 Z" fill="#1f2433"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#e9e9ee", calca: "#2a2f3a", sapato: "#2a2f3a", extra: `
      <path d="M41 37 L45 33 L55 33 L59 37" fill="none" stroke="#c9cad3" stroke-width="2.5"/>
      <rect x="37.5" y="53" width="25" height="4" fill="#6b3fa0"/>` }),
    rosto: rostoPadrao("#1d1d1f", BOCA_SERIA),
    frente: `<path d="M31 34 C33 22 67 22 69 34 L70 54 L66 54 L65 36 L58 31 L53 39 L48 31 L40 36 L35 54 L30 54 Z" fill="#1f2433"/>`,
  }),
  "boneco-kakashi": personagem({
    tras: `<path d="M32 40 C30 24 44 18 54 16 L50 6 L64 14 L66 4 L74 18 L86 16 L76 28 L82 34 L68 40 Z" fill="#d4d8de"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#2a3550", calca: "#2a3550", sapato: "#2a3550", extra: `
      <path d="M33 37 Q50 32 67 37 L63 54 L37 54 Z" fill="#5b8a3e"/>
      <path d="M41 43 L47 43 M53 43 L59 43" stroke="#3f6a2a" stroke-width="3"/>` }),
    rosto: `<ellipse cx="58" cy="44" rx="3" ry="2.4" fill="#1d1d1f"/><path d="M54 42.5 L62 42.5" stroke="#1d1d1f" stroke-width="1.6"/>
      <path d="M54 37.5 L63 37" stroke="#9aa0a6" stroke-width="1.6" stroke-linecap="round"/>`,
    extraRosto: `<path d="M31 47 L69 47 C68 56 60 63 50 63 C40 63 32 56 31 47 Z" fill="#2a3550"/>`,
    frente: `
      <path d="M29 40 L71 29 L71 38 L29 52 Z" fill="#1d3c8f"/>
      <rect x="38" y="35" width="16" height="9" rx="1.5" fill="#b9c0c8" stroke="#7d858f" transform="rotate(-15 46 40)"/>`,
  }),
  "boneco-luffy": personagem({
    corpo: corpoNormal({ pele: PELE, roupa: "#d6262b", calca: PELE, sapato: "#c9a46a", mangas: PELE, extra: `
      <path d="M45 35 L50 51 L55 35 Z" fill="${PELE}"/>
      <rect x="38" y="54" width="24" height="3" fill="#e3b75c"/>
      <path d="M39 56 L61 56 L62.5 72 L52.5 72 L50 64 L47.5 72 L37.5 72 Z" fill="#2f6fb5"/>` }),
    extraRosto: `<path d="M38 50 L42 50.6" stroke="#b24a3a" stroke-width="1.2" stroke-linecap="round"/>`,
    frente: `
      <path d="M31 40 C30 26 70 26 69 40 L66 36 L64 42 L60 36 L56 42 L52 35 L48 42 L44 36 L40 42 L36 36 L33 42 Z" fill="#1d1d1f"/>
      <ellipse cx="50" cy="29" rx="28" ry="6" fill="#e3b75c"/>
      <path d="M35 29 C35 12 65 12 65 29 Z" fill="#edc36a"/>
      <rect x="35" y="23" width="30" height="5" fill="#d6262b"/>`,
  }),
  "boneco-zoro": personagem({
    corpo: corpoNormal({ pele: PELE, roupa: "#f3f1ec", calca: "#1d1d1f", sapato: "#1d1d1f", extra: `
      <path d="M45 35 L50 44 L55 35 Z" fill="${PELE}"/>
      <rect x="38" y="48" width="24" height="9" fill="#3f8a3c"/>
      <g transform="rotate(20 64 58)"><rect x="63" y="44" width="2.5" height="26" fill="#1d1d1f"/><rect x="61.5" y="50" width="5.5" height="1.6" fill="#e8b33a"/></g>
      <g transform="rotate(30 66 58)"><rect x="65" y="46" width="2.5" height="24" fill="#f3f1ec" stroke="#9aa0a6" stroke-width=".5"/><rect x="63.5" y="51" width="5.5" height="1.6" fill="#e8b33a"/></g>` }),
    rosto: rostoPadrao("#1d1d1f", BOCA_SERIA),
    extraRosto: `<path d="M37 36 L46 39 M63 36 L54 39" stroke="#2e6b30" stroke-width="2.2" stroke-linecap="round"/>
      <g fill="#e8b33a"><circle cx="28.5" cy="46" r="1.5"/><circle cx="28.5" cy="49.5" r="1.5"/><circle cx="28.5" cy="53" r="1.5"/></g>`,
    frente: `<path d="M31 40 C30 24 70 24 69 40 L64 34 L60 36 L55 31 L50 35 L45 31 L40 36 L36 34 Z" fill="#4caf50"/>`,
  }),
  "boneco-tanjiro": personagem({
    olhos: "#8b1a1a",
    tras: `<path d="M30 44 L20 34 L30 30 L24 18 L38 22 L44 10 L52 20 L62 10 L64 22 L78 18 L72 30 L80 36 L70 44 Z" fill="#4a1c1c"/>`,
    corpo: `
      <defs><pattern id="xadrez" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#1d1d1f"/><rect width="2.5" height="2.5" fill="#2e9e6a"/><rect x="2.5" y="2.5" width="2.5" height="2.5" fill="#2e9e6a"/></pattern></defs>
      ${corpoNormal({ pele: PELE, roupa: "url(#xadrez)", calca: "#1d1d1f", sapato: "#f3f1ec", extra: `<path d="M46 35 L50 42 L54 35 Z" fill="#1d1d1f"/>` })}`,
    extraRosto: `<g fill="#f3f1ec" stroke="#c4161c" stroke-width=".8"><rect x="27" y="47" width="4" height="7"/><rect x="69" y="47" width="4" height="7"/></g>`,
    frente: `
      <path d="M31 40 C31 24 69 24 69 40 L64 33 L60 40 L55 30 L50 37 L45 30 L40 40 L36 33 Z" fill="#4a1c1c"/>
      <path d="M37 36 q3 -3 6 0" fill="none" stroke="#b24a3a" stroke-width="1.6"/>`,
  }),
  "boneco-nezuko": personagem({
    olhos: "#e86aa0",
    atras: `<path d="M36 12 C28 30 29 48 33 64 L67 64 C71 48 72 30 64 12 Z" fill="#1d1d1f"/><path d="M32 58 L68 58 L67 64 L33 64 Z" fill="#f07a1a"/>`,
    corpo: corpoNormal({ pele: PELE, roupa: "#f5a3c0", calca: "#2a2f3a", sapato: "#2a2f3a", extra: `
      <path d="M32 37 Q50 32 68 37 L66 78 L34 78 Z" fill="#f5a3c0"/>
      <path d="M44 35 L50 43 L56 35" fill="none" stroke="#f3f1ec" stroke-width="2"/>
      <rect x="37" y="48" width="26" height="6" fill="#8a5a31"/>` }),
    rosto: rostoPadrao("#e86aa0", `<rect x="40" y="52" width="20" height="5" rx="2.5" fill="#7fa65a" stroke="#4f7a3a"/>`),
    frente: `
      <path d="M31 42 C30 24 70 24 69 42 L64 34 L58 38 L54 32 L50 36 L46 32 L42 38 L36 34 Z" fill="#1d1d1f"/>
      <path d="M60 26 L69 20 L69 31 Z M60 26 L67 33 L58 33 Z" fill="#f06ba8"/>`,
  }),
  "boneco-pikachu": `
    <path d="M66 82 L82 72 L76 66 L92 54 L86 48 L96 36 L76 44 L80 50 L66 60 L70 66 Z" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M36 34 Q24 18 16 6 Q32 10 44 28 Z" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <path d="M16 6 Q22 8 27 13 L23 17 Q19 11 16 6 Z" fill="#1d1d1f"/>
    <path d="M64 34 Q76 18 84 6 Q68 10 56 28 Z" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <path d="M84 6 Q78 8 73 13 L77 17 Q81 11 84 6 Z" fill="#1d1d1f"/>
    <ellipse cx="41" cy="91" rx="6" ry="3" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <ellipse cx="59" cy="91" rx="6" ry="3" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <ellipse cx="50" cy="76" rx="19" ry="16" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <ellipse cx="38" cy="72" rx="3" ry="5" fill="#ffd84a" stroke="#c48f00" stroke-width="1.2" transform="rotate(30 38 72)"/>
    <ellipse cx="62" cy="72" rx="3" ry="5" fill="#ffd84a" stroke="#c48f00" stroke-width="1.2" transform="rotate(-30 62 72)"/>
    <ellipse cx="50" cy="46" rx="22" ry="19" fill="#ffd84a" stroke="#c48f00" stroke-width="1.5"/>
    <circle cx="42" cy="44" r="3.5" fill="#1d1d1f"/><circle cx="58" cy="44" r="3.5" fill="#1d1d1f"/>
    <circle cx="43" cy="42.6" r="1.2" fill="#fff"/><circle cx="59" cy="42.6" r="1.2" fill="#fff"/>
    <circle cx="50" cy="48.5" r=".9" fill="#1d1d1f"/>
    <path d="M46 52 Q48 54.5 50 52 Q52 54.5 54 52" fill="none" stroke="#1d1d1f" stroke-width="1.2"/>
    <circle cx="34" cy="52" r="4.5" fill="#e8392c"/><circle cx="66" cy="52" r="4.5" fill="#e8392c"/>`,
  "boneco-bob": `
    <path d="M24 50 L16 62 M76 50 L84 62" stroke="#fff35c" stroke-width="3" stroke-linecap="round"/>
    <circle cx="16" cy="63" r="3.5" fill="#fff35c"/><circle cx="84" cy="63" r="3.5" fill="#fff35c"/>
    <path d="M40 78 L40 89 M60 78 L60 89" stroke="#fff35c" stroke-width="3"/>
    <rect x="37.5" y="84" width="5" height="5" fill="#f3f1ec"/><rect x="57.5" y="84" width="5" height="5" fill="#f3f1ec"/>
    <ellipse cx="38" cy="92" rx="5" ry="3" fill="#1d1d1f"/><ellipse cx="62" cy="92" rx="5" ry="3" fill="#1d1d1f"/>
    <rect x="24" y="10" width="52" height="56" rx="4" fill="#fff35c" stroke="#c9b200" stroke-width="2"/>
    <g fill="#d6c836"><ellipse cx="30" cy="18" rx="3" ry="2"/><ellipse cx="70" cy="20" rx="2.5" ry="3"/><ellipse cx="31" cy="58" rx="3" ry="2.5"/><ellipse cx="69" cy="57" rx="2" ry="3"/><ellipse cx="50" cy="15" rx="2" ry="1.5"/></g>
    <rect x="24" y="64" width="52" height="7" fill="#f3f1ec"/>
    <rect x="24" y="70" width="52" height="9" fill="#8a5a31"/>
    <path d="M28 74 L34 74 M40 74 L46 74 M54 74 L60 74 M66 74 L72 74" stroke="#1d1d1f" stroke-width="1.5"/>
    <path d="M48 64 L52 64 L53 73 L50 76 L47 73 Z" fill="#d6262b"/>
    <circle cx="41" cy="31" r="8" fill="#fff" stroke="#1d1d1f" stroke-width="1"/><circle cx="59" cy="31" r="8" fill="#fff" stroke="#1d1d1f" stroke-width="1"/>
    <circle cx="42" cy="31" r="4" fill="#3fa7e0"/><circle cx="58" cy="31" r="4" fill="#3fa7e0"/>
    <circle cx="42" cy="31" r="2" fill="#1d1d1f"/><circle cx="58" cy="31" r="2" fill="#1d1d1f"/>
    <ellipse cx="50" cy="40" rx="3" ry="4" fill="#f5e64a" stroke="#c9b200"/>
    <circle cx="36" cy="45" r="3" fill="#ff9a7a" opacity=".6"/><circle cx="64" cy="45" r="3" fill="#ff9a7a" opacity=".6"/>
    <path d="M37 46 Q50 58 63 46 Z" fill="#8b1a1a" stroke="#1d1d1f" stroke-width="1.5"/>
    <rect x="45.5" y="46.5" width="4" height="4" fill="#fff"/><rect x="50.5" y="46.5" width="4" height="4" fill="#fff"/>`,
  "boneco-patrick": `
    <path d="M50 6 C54 6 58 30 60 38 C70 40 90 46 88 52 C86 58 66 60 62 62 C64 72 68 90 62 92 C56 94 52 80 50 74 C48 80 44 94 38 92 C32 90 36 72 38 62 C34 60 14 58 12 52 C10 46 30 40 40 38 C42 30 46 6 50 6 Z" fill="#f7a1b5" stroke="#d9748d" stroke-width="2"/>
    <path d="M38 60 L62 60 L64 74 L54 74 L50 68 L46 74 L36 74 Z" fill="#7cc242"/>
    <g fill="#8a4fc4"><circle cx="42" cy="66" r="2"/><circle cx="55" cy="64" r="2"/><circle cx="58" cy="70" r="2"/></g>
    <ellipse cx="46" cy="28" rx="3.5" ry="4.5" fill="#fff" stroke="#1d1d1f"/><ellipse cx="54" cy="28" rx="3.5" ry="4.5" fill="#fff" stroke="#1d1d1f"/>
    <circle cx="46.5" cy="29" r="1.6" fill="#1d1d1f"/><circle cx="53.5" cy="29" r="1.6" fill="#1d1d1f"/>
    <path d="M42 22 L47 21 M53 21 L58 22" stroke="#1d1d1f" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M42 39 Q50 48 58 39 Z" fill="#b23a5a" stroke="#1d1d1f" stroke-width="1.5"/>`,
  "salao-nfc-agenda": `
    <circle cx="50" cy="50" r="40" fill="#6b7d4f"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="#c6a15b" stroke-width="1.5"/>
    <text x="50" y="30" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="10" fill="#f4efe6">GC</text>
    <g transform="rotate(90 44 48)"><path d="M39.6 44.3 A5.7 5.7 0 0 1 48.4 44.3 M36.0 41.3 A10.4 10.4 0 0 1 52.0 41.3 M32.4 38.2 A15.2 15.2 0 0 1 55.6 38.2" fill="none" stroke="#f4efe6" stroke-width="3.0" stroke-linecap="round"/></g><circle cx="44" cy="48" r="2.3" fill="#f4efe6"/>
    <text x="50" y="72" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="7" letter-spacing="1" fill="#c6a15b">AGENDE</text>`,
  "salao-porta-ob": `
    <rect x="35" y="24" width="30" height="68" rx="12" fill="#6b7d4f"/>
    <rect x="43" y="32" width="14" height="50" rx="7" fill="#f4efe6" opacity=".9"/>
    <path d="M50 82 V90" stroke="#9aa0a6" stroke-width="1.2"/>
    <rect x="33" y="10" width="34" height="18" rx="5" fill="#c6a15b"/>
    <path d="M38 12 V26 M43 12 V26 M48 12 V26 M53 12 V26 M58 12 V26 M63 12 V26" stroke="#9c7a35" stroke-width="1.2"/>`,
  "salao-porta-anel": `
    <path d="M44 10 C26 22 26 54 44 66 M56 10 C74 22 74 54 56 66" fill="none" stroke="#6b7d4f" stroke-width="5" stroke-linecap="round"/>
    <path d="M44 10 Q50 6 56 10" fill="none" stroke="#6b7d4f" stroke-width="5" stroke-linecap="round"/>
    <rect x="41" y="62" width="18" height="8" rx="3" fill="#9c7a35"/>
    <circle cx="42" cy="78" r="11" fill="none" stroke="#c6a15b" stroke-width="4"/>
    <circle cx="60" cy="80" r="9.5" fill="none" stroke="#c9ced6" stroke-width="3.5"/>
    <path d="M60 67 L64 71 L60 75 L56 71 Z" fill="#dff3ff" stroke="#8fb8cc" stroke-width="1"/>`,
  "salao-porta-batom": `
    <path d="M42 8 L58 4 L58 22 L42 22 Z" fill="#b8323f"/>
    <rect x="40" y="20" width="20" height="10" rx="2" fill="#c6a15b"/>
    <rect x="36" y="28" width="28" height="64" rx="7" fill="#6b7d4f"/>
    <rect x="40" y="34" width="5" height="52" rx="2.5" fill="#ffffff33"/>
    <text x="50" y="66" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="9" fill="#f4efe6" transform="rotate(-90 50 62)">Naturelle</text>`,
  "salao-porta-oleo": `
    <rect x="43" y="6" width="14" height="14" rx="4" fill="#4f5d39"/>
    <rect x="45" y="19" width="10" height="9" fill="#9c7a35"/>
    <rect x="36" y="27" width="28" height="62" rx="7" fill="#d9a441" opacity=".92"/>
    <rect x="40" y="33" width="5" height="50" rx="2.5" fill="#fff3d0" opacity=".7"/>
    <rect x="33" y="48" width="34" height="16" rx="4" fill="#6b7d4f"/>
    <text x="50" y="58.5" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="6" letter-spacing=".8" fill="#f4efe6">ÓLEO</text>`,
  "salao-elastico": `
    <rect x="34" y="8" width="32" height="84" rx="16" fill="#f4efe6" stroke="#c6a15b" stroke-width="2"/>
    <ellipse cx="50" cy="32" rx="20" ry="5" fill="none" stroke="#e07a8f" stroke-width="5"/>
    <ellipse cx="50" cy="50" rx="20" ry="5" fill="none" stroke="#6b7d4f" stroke-width="5"/>
    <ellipse cx="50" cy="68" rx="20" ry="5" fill="none" stroke="#1d1d1f" stroke-width="5"/>`,
  "salao-espelho": `
    <defs><linearGradient id="g-espelho" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#dbe9ee"/><stop offset="1" stop-color="#b9cfd8"/></linearGradient></defs>
    <circle cx="50" cy="52" r="39" fill="#c6a15b" stroke="#9c7a35" stroke-width="2"/>
    <circle cx="50" cy="52" r="32" fill="url(#g-espelho)"/>
    <path d="M30 46 L46 30 M34 56 L56 34" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>`,
  "salao-pente": `
    <path d="M15 44 V70 M19 44 V70 M23 44 V70 M27 44 V70 M31 44 V70 M35 44 V70 M39 44 V70 M43 44 V70 M47 44 V70 M51 44 V70 M55 44 V70 M59 44 V70 M63 44 V70 M67 44 V70 M71 44 V70 M75 44 V70 M79 44 V70 M83 44 V70 " stroke="#c6a15b" stroke-width="2.6" stroke-linecap="round"/>
    <rect x="10" y="28" width="80" height="18" rx="5" fill="#c6a15b"/>
    <rect x="10" y="28" width="80" height="5" rx="2.5" fill="#e3c27e"/>
    <text x="50" y="42" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="9" fill="#4f5d39">Beauté Naturelle</text>`,
  "salao-capsula-grampos": `
    <rect x="27" y="22" width="46" height="70" rx="9" fill="#f4efe6" stroke="#c6a15b" stroke-width="2"/>
    <rect x="25" y="12" width="50" height="14" rx="5" fill="#c6a15b"/>
    <g transform="translate(40 42)"><path d="M0 0 V30 M4 0 V5 L6 8 L4 11 L6 14 L4 17 L6 20 L4 23 V30" fill="none" stroke="#5a4636" stroke-width="1.8" stroke-linecap="round"/></g>
    <g transform="translate(52 42)"><path d="M0 0 V30 M4 0 V5 L6 8 L4 11 L6 14 L4 17 L6 20 L4 23 V30" fill="none" stroke="#5a4636" stroke-width="1.8" stroke-linecap="round"/></g>
    <text x="50" y="86" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="8" fill="#6b7d4f">grampos</text>`,
  "salao-porta-comprimido": `
    <rect x="36" y="10" width="28" height="82" rx="14" fill="#f4efe6" stroke="#6b7d4f" stroke-width="2"/>
    <path d="M36 51 V24 A14 14 0 0 1 64 24 V51 Z" fill="#6b7d4f"/>
    <path d="M36 51 H64" stroke="#c6a15b" stroke-width="3"/>
    <rect x="42" y="64" width="16" height="7" rx="3.5" fill="#fff" stroke="#c9ced6"/>
    <circle cx="50" cy="80" r="4" fill="#fff" stroke="#c9ced6"/>`,
  "salao-gancho-bolsa": `
    <path d="M50 52 V68 Q50 90 68 88 Q80 86 78 72" fill="none" stroke="#c6a15b" stroke-width="6" stroke-linecap="round"/>
    <circle cx="50" cy="32" r="24" fill="#6b7d4f" stroke="#c6a15b" stroke-width="3"/>
    <text x="50" y="38" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="15" fill="#f4efe6">GC</text>`,
  "salao-abre-porta": `
    <path d="M40 8 H60 V40 Q76 44 78 62 Q80 82 60 92 L53 85 Q67 78 66 63 Q65 52 54 50 H40 Z" fill="#c6a15b" stroke="#9c7a35" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="50" cy="18" r="4" fill="none" stroke="#9c7a35" stroke-width="2"/>
    <path d="M44 30 H56" stroke="#9c7a35" stroke-width="2"/>`,
  "salao-display-duplo": `
    <defs><linearGradient id="g-insta" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f9a73b"/><stop offset=".5" stop-color="#e1306c"/><stop offset="1" stop-color="#833ab4"/></linearGradient></defs>
    <path d="M14 88 L20 10 H80 L86 88 Z" fill="#f4efe6" stroke="#c6a15b" stroke-width="2"/>
    <text x="50" y="22" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="9" fill="#6b7d4f">Beauté Naturelle</text>
    <path d="M50 28 V80" stroke="#e2d8c6" stroke-width="1.2"/>
    <rect x="24" y="32" width="18" height="18" rx="5.0" fill="url(#g-insta)"/><rect x="27.6" y="35.6" width="10.8" height="10.8" rx="3.2" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="33.0" cy="41.0" r="2.7" fill="none" stroke="#fff" stroke-width="1.3"/><circle cx="36.6" cy="37.4" r="0.8" fill="#fff"/>
    <text x="33" y="62" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="5.5" fill="#3a3027">SIGA</text>
    <circle cx="67" cy="41" r="9" fill="#fff" stroke="#e2d8c6"/><text x="67" y="44.8" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11.2" fill="#4285f4">G</text>
    <path transform="translate(58.5 58) scale(0.33)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(62.8 58) scale(0.33)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(67.1 58) scale(0.33)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(71.4 58) scale(0.33)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(75.7 58) scale(0.33)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/>
    <text x="67" y="68" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="5.5" fill="#3a3027">AVALIE</text>
    <g transform="rotate(90 30 74)"><path d="M28.5 72.8 A1.9 1.9 0 0 1 31.5 72.8 M27.3 71.7 A3.5 3.5 0 0 1 32.7 71.7 M26.1 70.7 A5.1 5.1 0 0 1 33.9 70.7" fill="none" stroke="#6b7d4f" stroke-width="1.0" stroke-linecap="round"/></g><circle cx="30" cy="74" r="0.8" fill="#6b7d4f"/><g transform="rotate(90 64 76)"><path d="M62.5 74.8 A1.9 1.9 0 0 1 65.5 74.8 M61.3 73.7 A3.5 3.5 0 0 1 66.7 73.7 M60.1 72.7 A5.1 5.1 0 0 1 67.9 72.7" fill="none" stroke="#6b7d4f" stroke-width="1.0" stroke-linecap="round"/></g><circle cx="64" cy="76" r="0.8" fill="#6b7d4f"/>
    <rect x="8" y="88" width="84" height="8" rx="3" fill="#6b7d4f"/><rect x="11" y="89" width="78" height="2" rx="1" fill="#ffffff33"/>`,
  "salao-placa-instagram": `
    <defs><linearGradient id="g-insta" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f9a73b"/><stop offset=".5" stop-color="#e1306c"/><stop offset="1" stop-color="#833ab4"/></linearGradient></defs>
    <rect x="22" y="8" width="56" height="78" rx="10" fill="#fff" stroke="#c6a15b" stroke-width="2"/>
    <rect x="36" y="16" width="28" height="28" rx="7.8" fill="url(#g-insta)"/><rect x="41.6" y="21.6" width="16.8" height="16.8" rx="5.0" fill="none" stroke="#fff" stroke-width="2.0"/><circle cx="50.0" cy="30.0" r="4.2" fill="none" stroke="#fff" stroke-width="2.0"/><circle cx="55.6" cy="24.4" r="1.3" fill="#fff"/>
    <text x="50" y="56" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="6.5" letter-spacing=".6" fill="#3a3027">SIGA O SALÃO</text>
    <g transform="rotate(90 46 70)"><path d="M43.9 68.3 A2.7 2.7 0 0 1 48.1 68.3 M42.2 66.8 A5.0 5.0 0 0 1 49.8 66.8 M40.5 65.4 A7.2 7.2 0 0 1 51.5 65.4" fill="none" stroke="#6b7d4f" stroke-width="1.4" stroke-linecap="round"/></g><circle cx="46" cy="70" r="1.1" fill="#6b7d4f"/>
    <path d="M40 86 L36 92 H64 L60 86 Z" fill="#c6a15b"/>
    <rect x="28" y="90" width="44" height="8" rx="3" fill="#6b7d4f"/><rect x="31" y="91" width="38" height="2" rx="1" fill="#ffffff33"/>`,
  "salao-placa-google": `
    <rect x="22" y="8" width="56" height="78" rx="10" fill="#fff" stroke="#c6a15b" stroke-width="2"/>
    <circle cx="50" cy="28" r="13" fill="#fff" stroke="#e2d8c6"/><text x="50" y="33.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16.2" fill="#4285f4">G</text>
    <path transform="translate(32.0 51) scale(0.48)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(40.2 51) scale(0.48)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(48.3 51) scale(0.48)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(56.5 51) scale(0.48)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/><path transform="translate(64.6 51) scale(0.48)" d="M0 -8 L2.4 -2.5 L8 -2.5 L3.6 1 L5.2 7 L0 3.4 L-5.2 7 L-3.6 1 L-8 -2.5 L-2.4 -2.5 Z" fill="#c6a15b"/>
    <text x="50" y="64" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="6.5" letter-spacing=".6" fill="#3a3027">AVALIE-NOS</text>
    <g transform="rotate(90 46 75)"><path d="M44.2 73.5 A2.4 2.4 0 0 1 47.8 73.5 M42.6 72.2 A4.4 4.4 0 0 1 49.4 72.2 M41.1 70.9 A6.4 6.4 0 0 1 50.9 70.9" fill="none" stroke="#6b7d4f" stroke-width="1.3" stroke-linecap="round"/></g><circle cx="46" cy="75" r="1.0" fill="#6b7d4f"/>
    <path d="M40 86 L36 92 H64 L60 86 Z" fill="#c6a15b"/>
    <rect x="28" y="90" width="44" height="8" rx="3" fill="#6b7d4f"/><rect x="31" y="91" width="38" height="2" rx="1" fill="#ffffff33"/>`,
  "salao-porta-cartao": `
    <rect x="22" y="30" width="56" height="34" rx="2" fill="#fff" stroke="#d8ccb6" transform="rotate(-8 50 47)"/>
    <rect x="22" y="34" width="56" height="34" rx="2" fill="#fff" stroke="#d8ccb6" transform="rotate(-4 50 51)"/>
    <rect x="22" y="38" width="56" height="34" rx="2" fill="#fff" stroke="#d8ccb6"/>
    <text x="50" y="50" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="8" fill="#6b7d4f">Gustavo Campassi</text>
    <text x="50" y="58" text-anchor="middle" font-family="Inter, sans-serif" font-size="4.5" letter-spacing="1" fill="#9c7a35">BEAUTÉ NATURELLE</text>
    <path d="M14 64 H86 L80 90 H20 Z" fill="#6b7d4f"/>
    <path d="M14 64 H86 L85 68 H15 Z" fill="#4f5d39"/>
    <g transform="rotate(90 46 75)"><path d="M43.9 73.3 A2.7 2.7 0 0 1 48.1 73.3 M42.2 71.8 A5.0 5.0 0 0 1 49.8 71.8 M40.5 70.4 A7.2 7.2 0 0 1 51.5 70.4" fill="none" stroke="#f4efe6" stroke-width="1.4" stroke-linecap="round"/></g><circle cx="46" cy="75" r="1.1" fill="#f4efe6"/>
    <rect x="12" y="88" width="76" height="8" rx="3" fill="#6b7d4f"/><rect x="15" y="89" width="70" height="2" rx="1" fill="#ffffff33"/>`,
  "itm-55-anos": `
    <circle cx="50" cy="48" r="40" fill="#1e3f93"/><circle cx="50" cy="48" r="36.0" fill="#fff"/><circle cx="50" cy="48" r="33.5" fill="none" stroke="#c9a227" stroke-width="1.6"/><text x="47.0" y="54.0" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="34.0" fill="#1e3f93">55</text><text x="64.0" y="62.0" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="10.0" fill="#c9a227">anos</text><rect x="28.0" y="64.3" width="44.0" height="11.4" rx="5.7" fill="#1e3f93" stroke="#c9a227" stroke-width=".8"/><text x="50" y="73.1" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="8.2" fill="#fff">itamaraty</text>
    <g transform="translate(84 88) rotate(25) scale(0.55)"><path d="M0 8 C0 -10 0 -24 0 -36" stroke="#c9a227" stroke-width="1.6" fill="none"/><ellipse cx="3.2" cy="-6" rx="2.6" ry="4.6" transform="rotate(28 3.2 -6)" fill="#c9a227"/><ellipse cx="-3.2" cy="-11" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -11)" fill="#c9a227"/><ellipse cx="3.2" cy="-16" rx="2.6" ry="4.6" transform="rotate(28 3.2 -16)" fill="#c9a227"/><ellipse cx="-3.2" cy="-21" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -21)" fill="#c9a227"/><ellipse cx="3.2" cy="-26" rx="2.6" ry="4.6" transform="rotate(28 3.2 -26)" fill="#c9a227"/><ellipse cx="-3.2" cy="-31" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -31)" fill="#c9a227"/><ellipse cx="0" cy="-37" rx="2.2" ry="4" fill="#c9a227"/></g>`,
  "itm-nome": `
    <rect x="6" y="26" width="88" height="48" rx="12" fill="#1e3f93" stroke="#c9a227" stroke-width="2"/>
    <text x="50" y="50" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-size="15" fill="#fff">SEU NOME</text>
    <text x="50" y="64" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="700" font-size="7" letter-spacing=".6" fill="#e8c55a">55 ANOS · ITAMARATY</text>`,
  "itm-abridor": `
    <path fill-rule="evenodd" fill="#1e3f93" stroke="#c9a227" stroke-width="2"
      d="M30 8 H70 Q82 8 82 20 V80 Q82 92 70 92 H30 Q18 92 18 80 V20 Q18 8 30 8 Z
         M36 64 H64 Q68 64 68 68 V74 Q68 80 62 80 H38 Q32 80 32 74 V68 Q32 64 36 64 Z"/>
    <rect x="34" y="62" width="32" height="3" rx="1.5" fill="#9aa0a6"/>
    <text x="50" y="44" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="26" fill="#fff">55</text>
    <text x="50" y="55" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="7" fill="#e8c55a">itamaraty</text>`,
  "itm-xicara": `
    <path d="M44 14 C40 20 48 22 44 28 M54 12 C50 18 58 20 54 26" fill="none" stroke="#b9c3d9" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M72 44 C86 44 86 66 70 66" fill="none" stroke="#1e3f93" stroke-width="6"/>
    <path d="M20 34 H76 L70 74 Q68 82 60 82 H36 Q28 82 26 74 Z" fill="#1e3f93"/>
    <ellipse cx="48" cy="34" rx="28" ry="5" fill="#5b3a24" stroke="#142c6b" stroke-width="2"/>
    <text x="48" y="66" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="22" fill="#e8c55a">55</text>
    <ellipse cx="48" cy="88" rx="36" ry="5" fill="#c9a227"/>`,
  "itm-grao": `
    <ellipse cx="50" cy="52" rx="30" ry="40" fill="#5b3a24" stroke="#3e2617" stroke-width="2"/>
    <path d="M50 14 C38 34 62 56 50 90" fill="none" stroke="#3e2617" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="38" cy="36" rx="6" ry="10" fill="#ffffff22" transform="rotate(20 38 36)"/>
    <circle cx="70" cy="76" r="13" fill="#c9a227" stroke="#fff" stroke-width="2"/>
    <text x="70" y="81" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-size="12" fill="#1e3f93">55</text>`,
  "itm-wafer": `
    <rect x="16" y="22" width="68" height="66" rx="5" fill="#e9b062" stroke="#c98a3a" stroke-width="2"/>
    <path d="M24 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M32 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M40 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M48 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M56 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M64 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M72 30 V84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 36 H84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 44 H84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 52 H84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 60 H84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 68 H84" stroke="#c98a3a" stroke-width="1.2"/><path d="M16 76 H84" stroke="#c98a3a" stroke-width="1.2"/>
    <rect x="16" y="22" width="68" height="8" rx="3" fill="#8a4f2a"/>
    <rect x="23.0" y="51.0" width="54" height="14.0" rx="7.0" fill="#1e3f93" stroke="#c9a227" stroke-width=".8"/><text x="50" y="61.8" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="10.1" fill="#fff">itamaraty</text>`,
  "itm-trigo": `
    <g transform="translate(50 88) rotate(0) scale(1.9)"><path d="M0 8 C0 -10 0 -24 0 -36" stroke="#c9a227" stroke-width="1.6" fill="none"/><ellipse cx="3.2" cy="-6" rx="2.6" ry="4.6" transform="rotate(28 3.2 -6)" fill="#c9a227"/><ellipse cx="-3.2" cy="-11" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -11)" fill="#c9a227"/><ellipse cx="3.2" cy="-16" rx="2.6" ry="4.6" transform="rotate(28 3.2 -16)" fill="#c9a227"/><ellipse cx="-3.2" cy="-21" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -21)" fill="#c9a227"/><ellipse cx="3.2" cy="-26" rx="2.6" ry="4.6" transform="rotate(28 3.2 -26)" fill="#c9a227"/><ellipse cx="-3.2" cy="-31" rx="2.6" ry="4.6" transform="rotate(-28 -3.2 -31)" fill="#c9a227"/><ellipse cx="0" cy="-37" rx="2.2" ry="4" fill="#c9a227"/></g>
    <circle cx="50" cy="56" r="13" fill="#1e3f93" stroke="#fff" stroke-width="2"/>
    <text x="50" y="61.5" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="14" fill="#fff">55</text>`,
  "itm-coracao": `
    <path d="M50 90 C14 66 6 46 12 30 C18 14 40 12 50 28 C60 12 82 14 88 30 C94 46 86 66 50 90 Z" fill="#1e3f93" stroke="#c9a227" stroke-width="2.5"/>
    <text x="50" y="52" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="20" fill="#e8c55a">Paixão</text>
    <text x="50" y="62" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="5.2" letter-spacing=".4" fill="#fff">EM TUDO QUE FAZ</text>
    <text x="50" y="74" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="9" fill="#e8c55a">55</text>`,
  "itm-chocolate": `
    <rect x="26" y="10" width="48" height="82" rx="4" fill="#5a3320"/>
    <rect x="32" y="52" width="14" height="12" rx="2" fill="#4a2a18"/><rect x="32" y="66" width="14" height="12" rx="2" fill="#4a2a18"/><rect x="48" y="52" width="14" height="12" rx="2" fill="#4a2a18"/><rect x="48" y="66" width="14" height="12" rx="2" fill="#4a2a18"/><rect x="64" y="52" width="14" height="12" rx="2" fill="#4a2a18"/><rect x="64" y="66" width="14" height="12" rx="2" fill="#4a2a18"/>
    <path d="M26 10 H74 V46 L62 52 L50 46 L38 52 L26 46 Z" fill="#1e3f93"/>
    <rect x="26" y="10" width="48" height="5" fill="#c9a227"/>
    <text x="50" y="30" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="8" fill="#fff">itamaraty</text>
    <text x="50" y="41" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="9" fill="#e8c55a">55 anos</text>`,
  "itm-biscoito": `
    <ellipse cx="50" cy="60" rx="38" ry="10" fill="#c98a3a"/>
    <rect x="12" y="46" width="76" height="14" fill="#f4ead8"/>
    <ellipse cx="50" cy="46" rx="38" ry="10" fill="#e9b062"/>
    <ellipse cx="50" cy="38" rx="38" ry="30" fill="#e9b062" stroke="#c98a3a" stroke-width="2"/>
    <ellipse cx="50" cy="38" rx="30" ry="23" fill="none" stroke="#c98a3a" stroke-width="1.5" stroke-dasharray="3 3"/>
    <text x="50" y="36" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-size="9" fill="#a8692a">itamaraty</text>
    <text x="50" y="48" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="10" fill="#a8692a">55</text>`,
  "itm-pacote-cafe": `
    <path d="M24 16 H76 L80 92 H20 Z" fill="#1e3f93"/>
    <path d="M24 16 L28 8 H72 L76 16 Z" fill="#142c6b"/>
    <path d="M30 12 H70" stroke="#c9a227" stroke-width="1.5" stroke-dasharray="2 2"/>
    <rect x="22" y="58" width="56" height="20" fill="#c9a227"/>
    <text x="50" y="40" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-size="10" fill="#fff">itamaraty</text>
    <text x="50" y="72" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-size="10" fill="#142c6b">CAFÉ</text>
    <ellipse cx="41" cy="50" rx="4" ry="5.5" fill="#7a4a26"/><ellipse cx="59" cy="50" rx="4" ry="5.5" fill="#7a4a26"/>
    <text x="50" y="88" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="7" fill="#e8c55a">55 anos</text>`,
  "itm-porta-copos": `
    <path d="M14 82 H86 L82 90 H18 Z" fill="#142c6b"/>
    <ellipse cx="50" cy="54" rx="36" ry="32" fill="#1e3f93" stroke="#c9a227" stroke-width="2"/>
    <ellipse cx="50" cy="54" rx="29" ry="25" fill="none" stroke="#c9a227" stroke-width="1"/>
    <text x="50" y="58" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="22" fill="#fff">55</text>
    <rect x="32.0" y="65.3" width="36" height="9.4" rx="4.7" fill="#1e3f93" stroke="#c9a227" stroke-width=".8"/><text x="50" y="72.5" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="6.7" fill="#fff">itamaraty</text>
    <rect x="10" y="88" width="80" height="8" rx="3" fill="#1e3f93"/><rect x="13" y="89" width="74" height="2" rx="1" fill="#ffffff33"/>`,
  "itm-prendedor": `
    <path d="M24 30 L30 88 H70 L76 30 Z" fill="#7a4a26"/>
    <path d="M24 30 L22 18 H78 L76 30 Z" fill="#8f5a33"/>
    <text x="50" y="66" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="9" fill="#e8c55a">CAFÉ</text>
    <rect x="14" y="22" width="72" height="10" rx="5" fill="#1e3f93" stroke="#c9a227" stroke-width="1.5"/>
    <rect x="14" y="32" width="72" height="7" rx="3.5" fill="#142c6b"/>
    <text x="50" y="30" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="7" fill="#fff">itamaraty 55</text>
    <rect x="16" y="88" width="68" height="8" rx="3" fill="#1e3f93"/><rect x="19" y="89" width="62" height="2" rx="1" fill="#ffffff33"/>`,
  "itm-ima": `
    <rect x="12" y="10" width="76" height="76" rx="14" fill="#fff" stroke="#1e3f93" stroke-width="3"/>
    <circle cx="50" cy="38" r="22" fill="#1e3f93"/><circle cx="50" cy="38" r="19.8" fill="#fff"/><circle cx="50" cy="38" r="18.4" fill="none" stroke="#c9a227" stroke-width="0.9"/><text x="48.4" y="41.3" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="900" font-style="italic" font-size="18.7" fill="#1e3f93">55</text><text x="57.7" y="45.7" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="5.5" fill="#c9a227">anos</text><rect x="37.9" y="47.0" width="24.200000000000003" height="6.3" rx="3.1" fill="#1e3f93" stroke="#c9a227" stroke-width=".8"/><text x="50" y="51.8" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="800" font-size="4.5" fill="#fff">itamaraty</text>
    <text x="50" y="72" text-anchor="middle" font-family="'Brush Script MT', 'Segoe Script', cursive" font-size="15" fill="#c9a227">Paixão</text>
    <text x="50" y="80" text-anchor="middle" font-family="Nunito, 'Arial Rounded MT Bold', Arial, sans-serif" font-weight="700" font-size="5.2" letter-spacing=".5" fill="#1e3f93">EM TUDO QUE FAZ</text>
    <rect x="14" y="88" width="72" height="8" rx="3" fill="#1e3f93"/><rect x="17" y="89" width="66" height="2" rx="1" fill="#ffffff33"/>`,
  // ---------- ENCOMENDAS ----------
  // Kits
  "enc-kit-lembranca": `
    ${encSombra(36)}
    <g transform="rotate(-7 50 30)">
      <rect x="20" y="10" width="60" height="36" rx="3" fill="${ENC.marrom}"/>
      <circle cx="50" cy="27" r="10" fill="${ENC.ouro}"/>${encEstrela(50, 27.5, 7, ENC.marrom)}
    </g>
    <rect x="14" y="44" width="72" height="14" fill="${ENC.begeEscuro}"/>
    <circle cx="35" cy="52" r="14" fill="${ENC.branco}" stroke="${ENC.ouro}" stroke-width="2.5"/>${encCoracao(35, 52, 7, ENC.vermelho)}
    <circle cx="64" cy="36" r="4.5" fill="none" stroke="#aab0b9" stroke-width="2"/>
    <rect x="55" y="40" width="18" height="22" rx="4" fill="${ENC.marrom}" stroke="${ENC.ouro}" stroke-width="1.5"/>${encEstrela(64, 50, 6, ENC.ouroClaro)}
    <rect x="12" y="58" width="76" height="34" rx="2" fill="${ENC.bege}" stroke="${ENC.begeEscuro}" stroke-width="1"/>
    <rect x="12" y="68" width="76" height="6" fill="${ENC.ouro}"/>
    <text x="50" y="86" text-anchor="middle" ${F_ENC} font-weight="800" font-size="6.2" letter-spacing="1" fill="${ENC.marrom}">LEMBRANÇA</text>`,
  "enc-kit-boas-vindas": `
    ${encSombra(40)}
    <rect x="8" y="40" width="54" height="52" rx="2" fill="${ENC.marrom}"/>
    <rect x="6" y="34" width="58" height="12" rx="2" fill="${ENC.marromClaro}"/>
    <rect x="32" y="34" width="6" height="58" fill="${ENC.ouro}"/>
    <ellipse cx="29" cy="30" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(-20 29 30)"/>
    <ellipse cx="41" cy="30" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(20 41 30)"/>
    <circle cx="35" cy="32" r="3" fill="${ENC.ouro}"/>
    <g transform="rotate(6 72 70)">
      <rect x="52" y="46" width="40" height="46" rx="2" fill="#fff" stroke="${ENC.ouro}" stroke-width="1.5"/>
      <text x="72" y="62" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7.5" fill="${ENC.marrom}">BEM-</text>
      <text x="72" y="71" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7.5" fill="${ENC.marrom}">VINDO!</text>
      <rect x="60" y="76" width="24" height="1.6" rx=".8" fill="${ENC.begeEscuro}"/>
      <rect x="63" y="81" width="18" height="1.6" rx=".8" fill="${ENC.begeEscuro}"/>
    </g>`,
  "enc-kit-homenagem": `
    ${encSombra(42)}
    <rect x="6" y="30" width="46" height="62" rx="2" fill="${ENC.bege}" stroke="${ENC.begeEscuro}" stroke-width="1"/>
    <rect x="26" y="30" width="6" height="62" fill="${ENC.ouro}"/>
    <path d="M70 80 L82 93 H74 Z" fill="${ENC.marromEscuro}"/>
    <rect x="38" y="12" width="50" height="68" rx="2" fill="${ENC.marrom}"/>
    <rect x="43" y="17" width="40" height="58" fill="${ENC.bege}"/>
    ${encEstrela(63, 34, 10, ENC.ouro)}
    <text x="63" y="56" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5.6" textLength="32" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">HOMENAGEM</text>
    <rect x="49" y="61" width="28" height="1.6" rx=".8" fill="${ENC.ouro}"/>
    <rect x="52" y="66" width="22" height="1.6" rx=".8" fill="${ENC.begeEscuro}"/>`,

  // Chaveiros
  "enc-chav-arte": `
    <path d="M50 6 L84 16 V46 C84 70 68 86 50 94 C32 86 16 70 16 46 V16 Z" fill="${ENC.marrom}" stroke="${ENC.ouro}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M50 13 L77 21 V46 C77 66 64 79 50 86 C36 79 23 66 23 46 V21 Z" fill="none" stroke="${ENC.ouro}" stroke-width="1" opacity=".7"/>
    ${encEstrela(50, 43, 17, ENC.ouroClaro)}
    <text x="50" y="71" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8.5" textLength="40" lengthAdjust="spacingAndGlyphs" fill="${ENC.ouroClaro}">SUA ARTE</text>`,
  "enc-chav-nome": `
    <circle cx="50" cy="13" r="7" fill="${ENC.bege}" stroke="${ENC.marrom}" stroke-width="2"/>
    <circle cx="50" cy="12" r="2.6" fill="${ENC.marromEscuro}"/>
    <rect x="6" y="20" width="88" height="50" rx="25" fill="${ENC.bege}" stroke="${ENC.marrom}" stroke-width="2.5"/>
    <text x="50" y="50" text-anchor="middle" ${F_ENC} font-weight="900" font-size="17" textLength="70" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Ana Clara</text>
    <text x="50" y="61" text-anchor="middle" ${F_ENC} font-weight="800" font-size="6.5" letter-spacing="1" fill="${ENC.ouro}">· 2026 ·</text>`,
  "enc-chav-frase": `
    <rect x="22" y="6" width="56" height="88" rx="8" fill="${ENC.marrom}" stroke="${ENC.ouro}" stroke-width="2"/>
    <rect x="27" y="22" width="46" height="66" rx="4" fill="none" stroke="${ENC.ouro}" stroke-width=".8"/>
    <circle cx="50" cy="14" r="3" fill="${ENC.marromEscuro}" stroke="${ENC.ouro}" stroke-width="1"/>
    <text x="50" y="49" text-anchor="middle" ${F_ENC_LETRA} font-size="15" textLength="40" lengthAdjust="spacingAndGlyphs" fill="${ENC.ouroClaro}">Gratidão</text>
    <text x="50" y="61" text-anchor="middle" ${F_ENC} font-weight="800" font-size="6" letter-spacing="1" fill="${ENC.bege}">POR TUDO</text>
    <rect x="40" y="67" width="20" height="1.2" fill="${ENC.ouro}"/>
    <text x="50" y="79" text-anchor="middle" ${F_ENC} font-weight="800" font-size="5.6" letter-spacing=".8" fill="${ENC.ouroClaro}">NOV · 2026</text>`,
  "enc-chav-abridor": `
    <path fill-rule="evenodd" fill="${ENC.preto}" stroke="${ENC.ouro}" stroke-width="2"
      d="M30 8 H70 Q82 8 82 20 V80 Q82 92 70 92 H30 Q18 92 18 80 V20 Q18 8 30 8 Z
         M36 64 H64 Q68 64 68 68 V74 Q68 80 62 80 H38 Q32 80 32 74 V68 Q32 64 36 64 Z"/>
    <rect x="34" y="62" width="32" height="3" rx="1.5" fill="#9aa0a6"/>
    <text x="50" y="36" text-anchor="middle" ${F_ENC} font-weight="900" font-size="11" fill="#fff">SUA</text>
    <text x="50" y="50" text-anchor="middle" ${F_ENC} font-weight="900" font-size="11" fill="${ENC.ouroClaro}">MARCA</text>`,
  "enc-chav-qr": `
    <rect x="14" y="6" width="72" height="88" rx="10" fill="#fff" stroke="${ENC.preto}" stroke-width="2.5"/>
    ${encQr(24, 16, 52)}
    <text x="50" y="84" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8.5" fill="${ENC.preto}">@sualoja</text>`,

  // Bottons
  "enc-botton-grande": `
    ${encSombra(30)}
    <circle cx="51.5" cy="51.5" r="41" fill="#8d939c"/>
    <circle cx="50" cy="50" r="40" fill="${ENC.marrom}"/>
    <circle cx="50" cy="50" r="35" fill="none" stroke="${ENC.ouro}" stroke-width="1.5"/>
    ${encEstrela(50, 42, 16, ENC.ouroClaro)}
    <text x="50" y="70" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" letter-spacing=".6" fill="${ENC.ouroClaro}">SUA ARTE</text>
    <path d="M22 34 A32 32 0 0 1 46 16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".18"/>`,
  "enc-botton-pequeno": `
    ${encSombra(22)}
    <circle cx="51.2" cy="62.2" r="30" fill="#8d939c"/>
    <circle cx="50" cy="61" r="29" fill="#fff"/>
    <circle cx="50" cy="61" r="25" fill="none" stroke="${ENC.ouro}" stroke-width="1.3"/>
    ${encCoracao(50, 62, 13, ENC.vermelho)}
    <path d="M30 50 A22 22 0 0 1 47 37" fill="none" stroke="${ENC.begeEscuro}" stroke-width="2.5" stroke-linecap="round" opacity=".5"/>`,
  "enc-botton-nome": `
    ${encSombra(28)}
    <circle cx="51.4" cy="53.4" r="39" fill="#8d939c"/>
    <circle cx="50" cy="52" r="38" fill="${ENC.ouroClaro}"/>
    <circle cx="50" cy="52" r="33" fill="none" stroke="${ENC.marrom}" stroke-width="1.3"/>
    <text x="50" y="38" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6.5" letter-spacing="1.5" fill="${ENC.marrom}">EQUIPE</text>
    <text x="50" y="61" text-anchor="middle" ${F_ENC} font-weight="900" font-size="20" fill="${ENC.marrom}">Davi</text>
    ${encEstrela(50, 72, 4.5, ENC.marrom)}
    <path d="M24 36 A30 30 0 0 1 44 22" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".35"/>`,

  // Quadros e plaquinhas
  "enc-quadro-arte": `
    ${encSombra(30)}
    <path d="M60 86 L72 94 H64 Z" fill="${ENC.marromEscuro}"/>
    <rect x="18" y="6" width="64" height="84" rx="2" fill="${ENC.marrom}"/>
    <rect x="23" y="11" width="54" height="74" fill="${ENC.bege}"/>
    <circle cx="50" cy="36" r="10" fill="${ENC.ouro}"/>
    <g stroke="${ENC.ouro}" stroke-width="1.8" stroke-linecap="round">
      <path d="M50 20 V23 M50 49 V52 M34 36 H37 M63 36 H66 M39 25 L41 27 M59 45 L61 47 M61 25 L59 27 M41 45 L39 47"/>
    </g>
    <path d="M23 70 Q36 52 50 62 T77 56 V85 H23 Z" fill="${ENC.marromClaro}"/>
    <path d="M23 76 Q42 64 58 72 T77 70 V85 H23 Z" fill="${ENC.marrom}"/>
    <text x="50" y="81" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6" letter-spacing=".8" fill="${ENC.ouroClaro}">SEU EVENTO</text>`,
  "enc-quadro-nomes": `
    ${encSombra(30)}
    <path d="M60 86 L72 94 H64 Z" fill="${ENC.marromEscuro}"/>
    <rect x="18" y="6" width="64" height="84" rx="2" fill="${ENC.marrom}"/>
    <rect x="23" y="11" width="54" height="74" fill="${ENC.bege}"/>
    <text x="50" y="23" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6.5" textLength="44" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">NOSSA EQUIPE</text>
    <rect x="32" y="27" width="36" height="1.4" fill="${ENC.ouro}"/>
    <g ${F_ENC} font-weight="800" font-size="5.6" fill="${ENC.marrom}" text-anchor="middle">
      <text x="37" y="39">Ana</text><text x="63" y="39">Fábio</text>
      <text x="37" y="48">Bruno</text><text x="63" y="48">Gabi</text>
      <text x="37" y="57">Carla</text><text x="63" y="57">Hugo</text>
      <text x="37" y="66">Davi</text><text x="63" y="66">Isa</text>
      <text x="37" y="75">Elisa</text><text x="63" y="75">João</text>
    </g>
    ${encEstrela(50, 80, 2.8, ENC.ouro)}`,
  "enc-placa-mesa": `
    ${encSombra(32)}
    <rect x="20" y="84" width="60" height="9" rx="2" fill="${ENC.ouro}"/>
    <rect x="24" y="14" width="52" height="72" rx="4" fill="#fff" stroke="${ENC.ouro}" stroke-width="2.5"/>
    <rect x="29" y="19" width="42" height="62" rx="2" fill="none" stroke="${ENC.ouro}" stroke-width=".8"/>
    <text x="50" y="36" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" letter-spacing="2.5" fill="${ENC.marrom}">MESA</text>
    <text x="50" y="72" text-anchor="middle" ${F_ENC} font-weight="900" font-size="34" fill="${ENC.marrom}">5</text>`,
  "enc-placa-qr": `
    ${encSombra(34)}
    <rect x="18" y="85" width="64" height="8" rx="3" fill="${ENC.preto}"/>
    <rect x="22" y="6" width="56" height="81" rx="6" fill="#fff" stroke="${ENC.preto}" stroke-width="2"/>
    <text x="50" y="19" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5.4" textLength="44" lengthAdjust="spacingAndGlyphs" fill="${ENC.preto}">APONTE A CÂMERA</text>
    ${encQr(30, 24, 40)}
    <text x="50" y="76" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" fill="${ENC.preto}">PIX</text>`,

  // Caixinhas e embalagens
  "enc-caixa-kit": `
    ${encSombra(38)}
    <polygon points="70,46 84,36 84,80 70,90" fill="${ENC.marromEscuro}"/>
    <rect x="14" y="46" width="56" height="44" fill="${ENC.marrom}"/>
    <polygon points="14,38 70,38 84,28 28,28" fill="${ENC.marromClaro}"/>
    <rect x="14" y="38" width="56" height="10" fill="#6b4020"/>
    <polygon points="70,38 84,28 84,38 70,48" fill="#3f2512"/>
    <circle cx="42" cy="69" r="12" fill="${ENC.ouro}"/>${encEstrela(42, 69.5, 8, ENC.marrom)}`,
  "enc-caixa-quadro": `
    ${encSombra(32)}
    <polygon points="72,14 80,8 80,84 72,90" fill="${ENC.begeEscuro}"/>
    <polygon points="22,14 72,14 80,8 30,8" fill="#f3e8d2"/>
    <rect x="22" y="14" width="50" height="76" fill="${ENC.bege}"/>
    <rect x="44" y="14" width="6" height="76" fill="${ENC.ouro}"/>
    <rect x="22" y="49" width="50" height="6" fill="${ENC.ouro}"/>
    <polygon points="72,49 80,43 80,49 72,55" fill="#a8801a"/>
    <ellipse cx="41" cy="48" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(-25 41 48)"/>
    <ellipse cx="53" cy="48" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(25 53 48)"/>
    <circle cx="47" cy="50" r="3" fill="${ENC.ouro}"/>`,
  "enc-cartao": `
    ${encSombra(34)}
    <g transform="rotate(-3 50 55)">
      <rect x="16" y="18" width="68" height="74" rx="3" fill="#fff" stroke="${ENC.ouro}" stroke-width="1.5"/>
      <rect x="21" y="23" width="58" height="64" rx="2" fill="none" stroke="${ENC.ouro}" stroke-width=".6"/>
      <text x="50" y="46" text-anchor="middle" ${F_ENC_LETRA} font-size="16" textLength="50" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Obrigado!</text>
      <rect x="30" y="55" width="40" height="1.8" rx=".9" fill="${ENC.begeEscuro}"/>
      <rect x="33" y="61" width="34" height="1.8" rx=".9" fill="${ENC.begeEscuro}"/>
      <rect x="36" y="67" width="28" height="1.8" rx=".9" fill="${ENC.begeEscuro}"/>
      ${encCoracao(50, 79, 4.5, ENC.ouro)}
    </g>`,

  // Outras lembranças
  "enc-ima": `
    ${encSombra(34)}
    <rect x="12" y="10" width="76" height="80" rx="14" fill="#fff" stroke="${ENC.vermelho}" stroke-width="3"/>
    ${encCoracao(50, 40, 15, ENC.vermelho)}
    <text x="50" y="74" text-anchor="middle" ${F_ENC_LETRA} font-size="17" textLength="52" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Família</text>`,
  "enc-marcador": `
    ${encSombra(16)}
    <path d="M50 13 C44 24 30 26 28 40" fill="none" stroke="${ENC.ouro}" stroke-width="1.3"/>
    <path d="M28 38 L24 54 H32 Z" fill="${ENC.ouro}"/><rect x="25.5" y="37" width="5" height="3" rx="1" fill="${ENC.ouroClaro}"/>
    <rect x="38" y="6" width="24" height="88" rx="3" fill="${ENC.bege}" stroke="${ENC.marrom}" stroke-width="1.6"/>
    <circle cx="50" cy="13" r="2.4" fill="${ENC.marromEscuro}"/>
    <path d="M50 22 C56 30 44 38 50 46 S44 62 50 70 S56 80 50 86" fill="none" stroke="${ENC.verde}" stroke-width="1.6"/>
    <g fill="${ENC.verde}">
      <ellipse cx="55" cy="30" rx="4" ry="2" transform="rotate(-30 55 30)"/>
      <ellipse cx="45" cy="42" rx="4" ry="2" transform="rotate(30 45 42)"/>
      <ellipse cx="55" cy="54" rx="4" ry="2" transform="rotate(-30 55 54)"/>
      <ellipse cx="45" cy="66" rx="4" ry="2" transform="rotate(30 45 66)"/>
      <ellipse cx="55" cy="78" rx="4" ry="2" transform="rotate(-30 55 78)"/>
    </g>`,
  "enc-topo-bolo": `
    ${encSombra(26)}
    <rect x="31" y="50" width="3.5" height="44" rx="1.5" fill="${ENC.ouro}"/>
    <rect x="65.5" y="50" width="3.5" height="44" rx="1.5" fill="${ENC.ouro}"/>
    <rect x="16" y="44" width="68" height="6" rx="3" fill="${ENC.ouro}"/>
    <text x="50" y="40" text-anchor="middle" ${F_ENC_LETRA} font-size="24" textLength="70" lengthAdjust="spacingAndGlyphs" fill="${ENC.ouro}" stroke="#a8801a" stroke-width=".6">Parabéns</text>
    ${encEstrela(80, 18, 5, ENC.ouroClaro)}${encEstrela(20, 22, 3.5, ENC.ouroClaro)}`,
  "enc-porta-copos": `
    ${encSombra(38)}
    <rect x="14" y="86" width="72" height="8" rx="3" fill="${ENC.ouro}"/>
    <circle cx="50" cy="50" r="37" fill="${ENC.marrom}" stroke="${ENC.ouro}" stroke-width="2"/>
    <circle cx="50" cy="50" r="30" fill="none" stroke="${ENC.ouro}" stroke-width="1"/>
    ${encEstrela(50, 44, 13, ENC.ouroClaro)}
    <text x="50" y="68" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" letter-spacing=".6" fill="${ENC.ouroClaro}">SUA MARCA</text>`,
  "enc-suporte-celular": `
    ${encSombra(38)}
    <polygon points="50,84 62,84 44,26 35,28" fill="${ENC.marromClaro}"/>
    <g transform="rotate(-17 40 50)">
      <rect x="25" y="16" width="30" height="60" rx="5" fill="${ENC.preto}"/>
      <rect x="27.5" y="20" width="25" height="51" rx="2.5" fill="#2e3a4f"/>
      <rect x="36" y="17.5" width="8" height="1.2" rx=".6" fill="#555"/>
    </g>
    <rect x="12" y="84" width="76" height="9" rx="3" fill="${ENC.marrom}"/>
    <rect x="16" y="76" width="28" height="9" rx="2" fill="${ENC.marrom}"/>
    <text x="66" y="90.6" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5" letter-spacing=".5" fill="${ENC.ouroClaro}">SUA MARCA</text>`,
  // Encomendas: ideias novas
  "enc-kit-festa": `
    ${encSombra(38)}
    <rect x="12" y="58" width="76" height="34" rx="2" fill="${ENC.bege}" stroke="${ENC.begeEscuro}" stroke-width="1"/>
    <rect x="12" y="66" width="76" height="5" fill="${ENC.ouro}"/>
    <text x="50" y="86" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" letter-spacing="1.5" fill="${ENC.marrom}">FESTA</text>
    <g>
      <rect x="27" y="22" width="2" height="26" fill="${ENC.ouro}"/><circle cx="28" cy="20" r="7" fill="${ENC.ouroClaro}"/>${encCoracao(28, 20.5, 4, ENC.vermelho)}
      <rect x="49" y="16" width="2" height="30" fill="${ENC.ouro}"/><circle cx="50" cy="14" r="7.5" fill="${ENC.ouroClaro}"/>${encEstrela(50, 14.5, 5, ENC.marrom)}
      <rect x="71" y="22" width="2" height="26" fill="${ENC.ouro}"/><circle cx="72" cy="20" r="7" fill="${ENC.ouroClaro}"/>
      <text x="72" y="23" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" fill="${ENC.marrom}">15</text>
      <circle cx="28" cy="52" r="8" fill="${ENC.marromEscuro}"/><circle cx="50" cy="51" r="8.5" fill="${ENC.marromEscuro}"/><circle cx="72" cy="52" r="8" fill="${ENC.marromEscuro}"/>
      <g fill="${ENC.ouroClaro}"><circle cx="25" cy="50" r=".9"/><circle cx="30" cy="48" r=".9"/><circle cx="47" cy="48" r=".9"/><circle cx="53" cy="47" r=".9"/><circle cx="69" cy="50" r=".9"/><circle cx="75" cy="48" r=".9"/></g>
    </g>`,
  "enc-kit-formatura": `
    ${encSombra(38)}
    <rect x="10" y="54" width="62" height="38" rx="2" fill="${ENC.marrom}"/>
    <rect x="8" y="48" width="66" height="10" rx="2" fill="${ENC.marromClaro}"/>
    <polygon points="26,8 36,8 46,46 38,48" fill="${ENC.vermelho}"/><polygon points="52,8 42,8 36,46 44,48" fill="${ENC.ouro}"/>
    <circle cx="41" cy="62" r="15" fill="${ENC.ouro}" stroke="#a8801a" stroke-width="1.5"/>
    <circle cx="41" cy="62" r="11" fill="none" stroke="${ENC.marrom}" stroke-width=".9"/>${encEstrela(41, 62.5, 7, ENC.marrom)}
    <circle cx="77" cy="74" r="14" fill="#8d939c"/><circle cx="76" cy="73" r="13.5" fill="#fff"/>
    <text x="76" y="71" text-anchor="middle" ${F_ENC} font-weight="900" font-size="3.6" letter-spacing=".5" fill="${ENC.marrom}">TURMA</text>
    <text x="76" y="78" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" fill="${ENC.marrom}">Léo</text>`,
  "enc-kit-encontro": `
    ${encSombra(40)}
    <rect x="10" y="12" width="16" height="78" rx="2" fill="${ENC.bege}" stroke="${ENC.marrom}" stroke-width="1.3"/>
    <circle cx="18" cy="18" r="1.8" fill="${ENC.marromEscuro}"/>
    <path d="M18 28 C22 34 14 40 18 46 S14 58 18 64 S22 74 18 82" fill="none" stroke="${ENC.verde}" stroke-width="1.3"/>
    <path d="M44 30 C44 16 58 16 58 30" fill="none" stroke="${ENC.preto}" stroke-width="3"/>
    <rect x="32" y="28" width="38" height="56" rx="6" fill="${ENC.verde}"/>
    <rect x="46" y="32" width="10" height="3" rx="1.5" fill="#1b4f31"/>
    <rect x="37" y="42" width="28" height="22" rx="2" fill="#fff"/>
    <text x="51" y="51" text-anchor="middle" ${F_ENC} font-weight="900" font-size="4" letter-spacing=".5" fill="${ENC.preto}">NOME</text>
    <rect x="41" y="55" width="20" height="1.4" fill="#ccc"/><rect x="41" y="59" width="16" height="1.4" fill="#ccc"/>
    ${encEstrela(51, 74, 5, ENC.ouroClaro)}
    <circle cx="79" cy="74" r="14" fill="#8d939c"/><circle cx="78" cy="73" r="13.5" fill="${ENC.marrom}"/>
    <circle cx="78" cy="73" r="11" fill="none" stroke="${ENC.ouro}" stroke-width="1"/>${encEstrela(78, 73.5, 7, ENC.ouroClaro)}`,
  "enc-kit-fim-de-ano": `
    ${encSombra(40)}
    <rect x="8" y="40" width="54" height="52" rx="2" fill="${ENC.vermelho}"/>
    <rect x="6" y="34" width="58" height="12" rx="2" fill="#a51216"/>
    <rect x="32" y="34" width="6" height="58" fill="${ENC.ouro}"/>
    <ellipse cx="29" cy="30" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(-20 29 30)"/>
    <ellipse cx="41" cy="30" rx="7" ry="4" fill="${ENC.ouroClaro}" transform="rotate(20 41 30)"/>
    <circle cx="35" cy="32" r="3" fill="${ENC.ouro}"/>
    <g transform="rotate(6 72 70)">
      <rect x="52" y="46" width="40" height="46" rx="2" fill="#fff" stroke="${ENC.verde}" stroke-width="1.5"/>
      <text x="72" y="62" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" fill="${ENC.verde}">BOAS</text>
      <text x="72" y="71" text-anchor="middle" ${F_ENC} font-weight="900" font-size="7" fill="${ENC.verde}">FESTAS!</text>
      ${encEstrela(72, 81, 4, ENC.ouro)}
    </g>`,

  "enc-botton-espelho": `
    ${encSombra(34)}
    <circle cx="62" cy="44" r="30" fill="#aeb4bc"/>
    <circle cx="62" cy="44" r="27" fill="#dfe4ea"/>
    <path d="M46 34 L60 20 M50 44 L70 24 M58 52 L76 34" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <circle cx="37.2" cy="61.2" r="27" fill="#8d939c"/>
    <circle cx="36" cy="60" r="26" fill="${ENC.marrom}"/>
    <circle cx="36" cy="60" r="22" fill="none" stroke="${ENC.ouro}" stroke-width="1.2"/>
    ${encEstrela(36, 55, 11, ENC.ouroClaro)}
    <text x="36" y="73" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5.5" fill="${ENC.ouroClaro}">SUA ARTE</text>`,
  "enc-botton-abridor": `
    ${encSombra(34)}
    <circle cx="62" cy="44" r="30" fill="#8d939c"/>
    <circle cx="62" cy="44" r="27" fill="#b9bfc7"/>
    <path fill="#55595f" d="M50 38 H74 Q78 38 78 42 V46 Q78 52 72 52 H52 Q46 52 46 46 V42 Q46 38 50 38 Z"/>
    <rect x="50" y="36" width="24" height="3" rx="1.5" fill="#6d727a"/>
    <circle cx="37.2" cy="61.2" r="27" fill="#8d939c"/>
    <circle cx="36" cy="60" r="26" fill="${ENC.preto}"/>
    <circle cx="36" cy="60" r="22" fill="none" stroke="${ENC.ouro}" stroke-width="1.2"/>
    <text x="36" y="58" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" fill="#fff">SUA</text>
    <text x="36" y="68" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" fill="${ENC.ouroClaro}">MARCA</text>`,
  "enc-botton-ima": `
    ${encSombra(36)}
    <rect x="14" y="6" width="72" height="86" rx="6" fill="#eef1f4" stroke="#c9d0d8" stroke-width="1.5"/>
    <rect x="76" y="20" width="4" height="30" rx="2" fill="#c9d0d8"/>
    <rect x="22" y="60" width="26" height="22" fill="#fff" stroke="#e1e4e8" transform="rotate(-6 35 71)"/>
    <rect x="25" y="65" width="18" height="1.3" fill="#c8ccd2" transform="rotate(-6 35 71)"/><rect x="25" y="70" width="14" height="1.3" fill="#c8ccd2" transform="rotate(-6 35 71)"/>
    <circle cx="47.5" cy="41.5" r="21" fill="#000" opacity=".12"/>
    <circle cx="46" cy="40" r="21" fill="#fff" stroke="${ENC.ouro}" stroke-width="2"/>
    ${encCoracao(46, 41, 11, ENC.vermelho)}
    <circle cx="35" cy="66" r="4" fill="${ENC.vermelho}"/>`,
  "enc-botton-chaveiro": `
    ${encSombra(26)}
    <circle cx="50" cy="12" r="7" fill="none" stroke="#aab0b9" stroke-width="2.5"/>
    <g fill="none" stroke="#8d939c" stroke-width="1.8"><ellipse cx="50" cy="22" rx="2.2" ry="3.6"/><ellipse cx="50" cy="28.5" rx="2.2" ry="3.6"/></g>
    <circle cx="51.3" cy="63.3" r="30" fill="#8d939c"/>
    <circle cx="50" cy="62" r="29" fill="${ENC.verde}"/>
    <circle cx="50" cy="62" r="25" fill="none" stroke="#fff" stroke-width="1.2" opacity=".8"/>
    ${encEstrela(50, 56, 12, "#fff")}
    <text x="50" y="77" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6" letter-spacing=".5" fill="#fff">SUA ARTE</text>`,

  "enc-mini-quadro": `
    ${encSombra(26)}
    <path d="M58 82 L68 94 H61 Z" fill="${ENC.marromEscuro}"/>
    <rect x="22" y="26" width="56" height="56" rx="2" fill="${ENC.marrom}"/>
    <rect x="26.5" y="30.5" width="47" height="47" fill="${ENC.bege}"/>
    ${encCoracao(50, 50, 12, ENC.vermelho)}
    <text x="50" y="71" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5.5" letter-spacing=".6" fill="${ENC.marrom}">SUA ARTE</text>`,

  "enc-tag-bombom": `
    ${encSombra(30)}
    <path d="M40 76 L32 86 M40 76 L48 86" stroke="${ENC.ouro}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="62" r="18" fill="${ENC.ouro}"/>
    <path d="M28 54 Q34 50 38 56 M44 50 Q50 54 48 60 M30 68 Q36 64 42 70 M46 66 Q52 64 54 70" fill="none" stroke="#a8801a" stroke-width="1"/>
    <path d="M40 44 C44 36 54 32 60 30" fill="none" stroke="${ENC.marrom}" stroke-width="1"/>
    <g transform="rotate(8 74 34)">
      <path d="M58 22 H86 V46 H58 L54 34 Z" fill="#fff" stroke="${ENC.begeEscuro}" stroke-width="1"/>
      <circle cx="59" cy="34" r="1.6" fill="${ENC.begeEscuro}"/>
      <text x="72" y="33" text-anchor="middle" ${F_ENC} font-weight="900" font-size="4.8" fill="${ENC.marrom}">OBRIGADO</text>
      <text x="72" y="40" text-anchor="middle" ${F_ENC} font-weight="700" font-size="3.6" fill="${ENC.ouro}">por vir!</text>
    </g>`,
  "enc-sacolinha": `
    ${encSombra(32)}
    <path d="M38 34 C38 18 62 18 62 34" fill="none" stroke="${ENC.marrom}" stroke-width="3"/>
    <polygon points="22,34 78,34 82,92 18,92" fill="#d9b98c"/>
    <polygon points="22,34 78,34 77,44 23,44" fill="#c9a77a"/>
    <circle cx="50" cy="66" r="14" fill="#fff"/>
    <circle cx="50" cy="66" r="12" fill="none" stroke="${ENC.ouro}" stroke-width="1"/>
    ${encEstrela(50, 66.5, 8, ENC.marrom)}`,
  "enc-adesivos": `
    ${encSombra(32)}
    <rect x="20" y="8" width="60" height="84" rx="4" fill="#fff" stroke="#dcd6cc" stroke-width="1.2"/>
    <circle cx="36" cy="26" r="10" fill="${ENC.marrom}"/>${encEstrela(36, 26.5, 6, ENC.ouroClaro)}
    <circle cx="64" cy="26" r="10" fill="${ENC.vermelho}"/>${encCoracao(64, 27, 5.5, "#fff")}
    <circle cx="36" cy="50" r="10" fill="${ENC.verde}"/>${encEstrela(36, 50.5, 6, "#fff")}
    <circle cx="64" cy="50" r="10" fill="${ENC.ouroClaro}"/>${encCoracao(64, 51, 5.5, ENC.marrom)}
    <circle cx="36" cy="74" r="10" fill="${ENC.preto}"/>${encEstrela(36, 74.5, 6, ENC.ouroClaro)}
    <circle cx="64" cy="74" r="10" fill="${ENC.bege}" stroke="${ENC.marrom}" stroke-width="1"/>${encCoracao(64, 75, 5.5, ENC.vermelho)}
    <path d="M70 92 L80 82 V88 Q80 92 76 92 Z" fill="#ece7df"/>`,

  "enc-medalha": `
    ${encSombra(24)}
    <polygon points="30,6 42,6 54,50 45,53" fill="${ENC.vermelho}"/>
    <polygon points="70,6 58,6 46,50 55,53" fill="${ENC.verde}"/>
    <rect x="44" y="46" width="12" height="8" rx="2" fill="${ENC.ouro}"/>
    <circle cx="50" cy="70" r="22" fill="${ENC.ouro}" stroke="#a8801a" stroke-width="2"/>
    <circle cx="50" cy="70" r="17" fill="none" stroke="${ENC.marrom}" stroke-width="1"/>
    ${encEstrela(50, 66, 9, ENC.marrom)}
    <text x="50" y="82" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5" letter-spacing=".5" fill="${ENC.marrom}">2026</text>`,
  "enc-topper-docinho": `
    ${encSombra(38)}
    <g>
      <rect x="21" y="26" width="2" height="40" fill="${ENC.ouro}"/><circle cx="22" cy="22" r="9" fill="${ENC.ouroClaro}" stroke="${ENC.ouro}" stroke-width="1"/>${encCoracao(22, 22.5, 5, ENC.vermelho)}
      <rect x="49" y="20" width="2" height="44" fill="${ENC.ouro}"/><circle cx="50" cy="16" r="9.5" fill="${ENC.ouroClaro}" stroke="${ENC.ouro}" stroke-width="1"/>
      <text x="50" y="20" text-anchor="middle" ${F_ENC} font-weight="900" font-size="10" fill="${ENC.marrom}">15</text>
      <rect x="77" y="26" width="2" height="40" fill="${ENC.ouro}"/><circle cx="78" cy="22" r="9" fill="${ENC.ouroClaro}" stroke="${ENC.ouro}" stroke-width="1"/>${encEstrela(78, 22.5, 6, ENC.marrom)}
    </g>
    <g>
      <circle cx="22" cy="68" r="11" fill="${ENC.marromEscuro}"/><circle cx="50" cy="66" r="11.5" fill="${ENC.marromEscuro}"/><circle cx="78" cy="68" r="11" fill="${ENC.marromEscuro}"/>
      <g fill="${ENC.ouroClaro}"><circle cx="18" cy="64" r="1"/><circle cx="25" cy="62" r="1"/><circle cx="46" cy="61" r="1"/><circle cx="54" cy="62" r="1"/><circle cx="74" cy="64" r="1"/><circle cx="81" cy="62" r="1"/></g>
      <path d="M9 74 H35 L32 92 H12 Z M37 72 H63 L60 92 H40 Z M65 74 H91 L88 92 H68 Z" fill="${ENC.ouro}"/>
      <path d="M14 76 V90 M19 76 V91 M24 76 V91 M29 76 V90 M42 74 V90 M47 74 V91 M52 74 V91 M57 74 V90 M70 76 V90 M75 76 V91 M80 76 V91 M85 76 V90" stroke="#a8801a" stroke-width=".8"/>
    </g>`,
  "enc-tag-mala": `
    ${encSombra(26)}
    <path d="M44 32 C44 10 56 10 56 32" fill="none" stroke="${ENC.preto}" stroke-width="3.5"/>
    <rect x="24" y="28" width="52" height="64" rx="8" fill="${ENC.verde}"/>
    <rect x="44" y="33" width="12" height="3.5" rx="1.75" fill="#1b4f31"/>
    <rect x="31" y="44" width="38" height="26" rx="3" fill="#fff"/>
    <text x="50" y="54" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5.5" letter-spacing=".8" fill="${ENC.preto}">NOME</text>
    <rect x="36" y="58" width="28" height="1.5" fill="#ccc"/><rect x="38" y="63" width="24" height="1.5" fill="#ccc"/>
    ${encEstrela(50, 81, 6, ENC.ouroClaro)}`,
  "enc-cracha": `
    ${encSombra(28)}
    <rect x="44" y="8" width="12" height="16" rx="2" fill="#9aa0a6"/><rect x="46.5" y="11" width="7" height="4" rx="1" fill="#6d727a"/>
    <rect x="24" y="20" width="52" height="72" rx="6" fill="#fff" stroke="${ENC.preto}" stroke-width="1.8"/>
    <path d="M24 26 Q24 20 30 20 H70 Q76 20 76 26 V36 H24 Z" fill="${ENC.marrom}"/>
    <rect x="44" y="23" width="12" height="3" rx="1.5" fill="#fff" opacity=".9"/>
    <text x="50" y="33.5" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5" letter-spacing="1" fill="${ENC.ouroClaro}">EQUIPE</text>
    <circle cx="50" cy="52" r="10" fill="${ENC.bege}"/><circle cx="50" cy="49" r="4" fill="${ENC.begeEscuro}"/><path d="M42 59 Q50 50 58 59" fill="${ENC.begeEscuro}"/>
    <text x="50" y="74" text-anchor="middle" ${F_ENC} font-weight="900" font-size="9" fill="${ENC.preto}">Carla</text>
    <rect x="36" y="79" width="28" height="1.5" fill="#ccc"/>`,
  // Encomendas: produtos do Instagram
  "enc-kit-professores": `
    ${encSombra(40)}
    <rect x="6" y="46" width="52" height="46" rx="2" fill="${ENC.bege}" stroke="${ENC.begeEscuro}" stroke-width="1"/>
    <rect x="6" y="56" width="52" height="5" fill="${ENC.vermelho}"/>
    <text x="32" y="80" text-anchor="middle" ${F_ENC_LETRA} font-size="10" textLength="40" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Professores</text>
    <path d="M84 46 C96 46 96 70 84 70" fill="none" stroke="#e9e5de" stroke-width="5"/>
    <rect x="52" y="36" width="34" height="54" rx="3" fill="#fff" stroke="#dcd6cc" stroke-width="1"/>
    <ellipse cx="69" cy="36" rx="17" ry="3" fill="#ece8e1"/>
    ${encCoracao(69, 56, 8, ENC.vermelho)}
    <text x="69" y="76" text-anchor="middle" ${F_ENC} font-weight="900" font-size="5" fill="${ENC.marrom}">OBRIGADO!</text>`,
  "enc-chav-esqueleto": `
    <g fill="${ENC.branco}" stroke="#9aa0a6" stroke-width="1">
      <path d="M38 18 C38 6 62 6 62 18 C62 25 58 27 58 31 H42 C42 27 38 25 38 18 Z"/>
      <rect x="48.5" y="31" width="3" height="32" rx="1.5"/>
      <path d="M38 38 Q50 34 62 38 M37 44 Q50 40 63 44 M38 50 Q50 46 62 50" fill="none" stroke-width="3" stroke="#d9dce0"/>
      <path d="M38 38 Q50 34 62 38 M37 44 Q50 40 63 44 M38 50 Q50 46 62 50" fill="none" stroke-width="1.6" stroke="${ENC.branco}"/>
      <path d="M36 36 L26 52 L24 62 M64 36 L74 52 L76 62" fill="none" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="50" cy="65" rx="10" ry="5"/>
      <path d="M44 68 L40 82 L41 92 M56 68 L60 82 L59 92" fill="none" stroke-width="3.4" stroke-linecap="round"/>
    </g>
    <ellipse cx="45" cy="17" rx="3.4" ry="4" fill="${ENC.preto}"/><ellipse cx="55" cy="17" rx="3.4" ry="4" fill="${ENC.preto}"/>
    <path d="M49 22 L50 24.5 L51 22 Z" fill="${ENC.preto}"/>
    <path d="M45 28 V30 M48 28 V30 M51 28 V30 M54 28 V30" stroke="#9aa0a6" stroke-width=".8"/>`,

  "enc-caneca": `
    ${encSombra(32)}
    <path d="M70 36 C90 36 90 72 70 72" fill="none" stroke="#e4dfd7" stroke-width="8"/>
    <path d="M70 36 C90 36 90 72 70 72" fill="none" stroke="#fff" stroke-width="5"/>
    <rect x="20" y="22" width="52" height="70" rx="4" fill="#fff" stroke="#dcd6cc" stroke-width="1"/>
    <ellipse cx="46" cy="22" rx="26" ry="4" fill="#ece8e1"/>
    ${encCoracao(46, 46, 11, ENC.vermelho)}
    <text x="46" y="72" text-anchor="middle" ${F_ENC_LETRA} font-size="12" textLength="38" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Com carinho</text>`,
  "enc-caneca-colher": `
    ${encSombra(32)}
    <rect x="52" y="4" width="5" height="36" rx="2.5" fill="${ENC.verde}" transform="rotate(14 54 22)"/>
    <ellipse cx="58" cy="6" rx="5" ry="7" fill="${ENC.verde}" transform="rotate(14 58 6)"/>
    <path d="M70 36 C90 36 90 72 70 72" fill="none" stroke="${ENC.verde}" stroke-width="6"/>
    <rect x="20" y="22" width="52" height="70" rx="4" fill="#fff" stroke="#dcd6cc" stroke-width="1"/>
    <ellipse cx="46" cy="22" rx="26" ry="4.5" fill="${ENC.verde}"/>
    <rect x="20" y="86" width="52" height="6" rx="2" fill="${ENC.verde}"/>
    <circle cx="36" cy="52" r="5" fill="${ENC.vermelho}"/><circle cx="56" cy="46" r="4" fill="${ENC.ouroClaro}"/><circle cx="50" cy="62" r="4.5" fill="${ENC.vermelho}"/>
    <path d="M30 60 Q36 56 40 60 M58 56 Q62 50 66 54" fill="none" stroke="${ENC.verde}" stroke-width="1.5"/>
    <text x="46" y="78" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6" fill="${ENC.verde}">SEU NOME</text>`,
  "enc-caneca-aluminio": `
    ${encSombra(32)}
    <path d="M70 36 C90 36 90 72 70 72" fill="none" stroke="#9aa0a6" stroke-width="5"/>
    <rect x="20" y="22" width="52" height="70" rx="3" fill="#c9ced6"/>
    <rect x="24" y="22" width="6" height="70" fill="#e4e8ed" opacity=".8"/><rect x="62" y="22" width="4" height="70" fill="#aab0b9" opacity=".6"/>
    <ellipse cx="46" cy="22" rx="26" ry="4" fill="#dfe3e8" stroke="#9aa0a6" stroke-width="1.5"/>
    ${encCoracao(46, 48, 9, ENC.vermelho)}
    <text x="46" y="72" text-anchor="middle" ${F_ENC_LETRA} font-size="15" textLength="30" lengthAdjust="spacingAndGlyphs" fill="${ENC.marromEscuro}">Vovó</text>`,
  "enc-copo-canudo": `
    ${encSombra(26)}
    <rect x="56" y="4" width="4" height="30" rx="2" fill="#5b2a8c" transform="rotate(10 58 20)"/>
    <path d="M28 30 Q50 18 72 30 Z" fill="#9b5bd0"/>
    <rect x="26" y="29" width="48" height="6" rx="3" fill="#7b3fb0"/>
    <path d="M28 35 H72 L66 92 H34 Z" fill="#7b3fb0" opacity=".9"/>
    <path d="M32 38 L36 88" stroke="#fff" stroke-width="2.5" opacity=".25"/>
    <circle cx="50" cy="62" r="12" fill="#fff"/>
    <text x="50" y="65" text-anchor="middle" ${F_ENC} font-weight="900" font-size="8" fill="#7b3fb0">Ana</text>`,
  "enc-garrafinha": `
    ${encSombra(22)}
    <rect x="41" y="6" width="18" height="12" rx="3" fill="${ENC.preto}"/>
    <rect x="43" y="17" width="14" height="6" fill="#55595f"/>
    <path d="M43 23 H57 Q68 27 68 38 V86 Q68 92 62 92 H38 Q32 92 32 86 V38 Q32 27 43 23 Z" fill="#9b5bd0"/>
    <path d="M37 36 V86" stroke="#fff" stroke-width="3" opacity=".25"/>
    <text x="50" y="72" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="30" fill="#fff">E</text>`,

  "enc-agenda": `
    ${encSombra(30)}
    <rect x="24" y="8" width="56" height="84" rx="3" fill="#fbe9e4" stroke="#e8c9c0" stroke-width="1"/>
    <g fill="none" stroke="#8d939c" stroke-width="1.6">${[16, 26, 36, 46, 56, 66, 76, 86].map((y) => `<ellipse cx="24" cy="${y}" rx="3.5" ry="2.4"/>`).join("")}</g>
    <circle cx="66" cy="22" r="8" fill="#e8838f"/><circle cx="72" cy="30" r="5" fill="${ENC.vermelho}" opacity=".7"/><circle cx="36" cy="80" r="7" fill="#e8838f"/>
    <path d="M58 28 Q54 36 60 40 M40 74 Q44 68 50 70" fill="none" stroke="${ENC.verde}" stroke-width="1.6"/>
    <text x="52" y="54" text-anchor="middle" ${F_ENC_LETRA} font-size="15" textLength="30" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Clara</text>
    <text x="52" y="64" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6" letter-spacing="1.5" fill="${ENC.ouro}">2027</text>`,
  "enc-caderno": `
    ${encSombra(30)}
    <rect x="24" y="8" width="56" height="84" rx="3" fill="${ENC.preto}"/>
    <g fill="none" stroke="#c9ced6" stroke-width="1.6">${[16, 26, 36, 46, 56, 66, 76, 86].map((y) => `<ellipse cx="24" cy="${y}" rx="3.5" ry="2.4"/>`).join("")}</g>
    <rect x="34" y="34" width="38" height="30" rx="2" fill="none" stroke="${ENC.ouroClaro}" stroke-width="1"/>
    <text x="53" y="47" text-anchor="middle" ${F_ENC} font-weight="900" font-size="6" letter-spacing="1" fill="#fff">SEU NOME</text>
    <rect x="42" y="52" width="22" height="1.2" fill="${ENC.ouroClaro}"/>
    <text x="53" y="80" text-anchor="middle" ${F_ENC} font-weight="700" font-size="4.5" letter-spacing="1" fill="#9aa0a6">CADERNO</text>`,

  "enc-pantufa": `
    ${encSombra(38)}
    <g transform="rotate(-8 32 56)">
      <ellipse cx="32" cy="58" rx="17" ry="34" fill="#f3d6dc" stroke="#e2b9c2" stroke-width="1"/>
      <path d="M15 52 Q32 36 49 52 L49 72 Q32 94 15 72 Z" fill="#fff"/>
      <circle cx="32" cy="64" r="8" fill="${ENC.vermelho}" opacity=".85"/>${encCoracao(32, 64.5, 4.5, "#fff")}
    </g>
    <g transform="rotate(8 68 56)">
      <ellipse cx="68" cy="58" rx="17" ry="34" fill="#f3d6dc" stroke="#e2b9c2" stroke-width="1"/>
      <path d="M51 52 Q68 36 85 52 L85 72 Q68 94 51 72 Z" fill="#fff"/>
      <circle cx="68" cy="64" r="8" fill="${ENC.vermelho}" opacity=".85"/>${encCoracao(68, 64.5, 4.5, "#fff")}
    </g>`,
  "enc-caixa-nome": `
    ${encSombra(40)}
    <rect x="10" y="52" width="80" height="38" rx="2" fill="#f6efe9"/>
    <rect x="8" y="30" width="84" height="26" rx="2" fill="#fff" stroke="#e8dcd2" stroke-width="1"/>
    <circle cx="16" cy="36" r="6" fill="#e8838f"/><circle cx="23" cy="33" r="4" fill="${ENC.vermelho}" opacity=".7"/>
    <path d="M14 44 Q20 40 26 44" fill="none" stroke="${ENC.verde}" stroke-width="1.4"/>
    <circle cx="84" cy="50" r="5" fill="#e8838f"/>
    <text x="52" y="49" text-anchor="middle" ${F_ENC_LETRA} font-size="18" textLength="34" lengthAdjust="spacingAndGlyphs" fill="${ENC.marrom}">Malu</text>
    <rect x="10" y="56" width="80" height="3" fill="#e6d9cc"/>`,
  "enc-caixa-presente": `
    ${encSombra(36)}
    <rect x="18" y="44" width="64" height="48" fill="#fff" stroke="#e1dcd4" stroke-width="1"/>
    <rect x="15" y="34" width="70" height="14" rx="1" fill="#fbfaf8" stroke="#e1dcd4" stroke-width="1"/>
    <rect x="46" y="34" width="8" height="58" fill="#efe3c8"/>
    <rect x="15" y="39" width="70" height="5" fill="#efe3c8"/>
    <path d="M50 34 C38 18 28 26 36 32 Z M50 34 C62 18 72 26 64 32 Z" fill="#efe3c8" stroke="#e1d2b0" stroke-width="1"/>
    <path d="M50 35 L42 52 M50 35 L58 52" stroke="#e1d2b0" stroke-width="3"/>
    <circle cx="50" cy="34" r="3.5" fill="#e1d2b0"/>`,
  "enc-jogo-velha": `
    ${encSombra(38)}
    <rect x="14" y="16" width="72" height="72" rx="6" fill="#fff" stroke="#e8c9d6" stroke-width="2"/>
    <path d="M38 22 V82 M62 22 V82 M20 40 H80 M20 64 H80" stroke="#e8838f" stroke-width="2.4" stroke-linecap="round"/>
    <g stroke="#7b3fb0" stroke-width="3" stroke-linecap="round"><path d="M22 22 L32 34 M32 22 L22 34"/><path d="M68 70 L78 82 M78 70 L68 82"/></g>
    ${encCoracao(50, 52, 6, "#e8838f")}${encCoracao(73, 29, 6, "#e8838f")}${encCoracao(27, 76, 6, "#e8838f")}`,

  "enc-letras-3d": `
    ${encSombra(42)}
    <g ${F_ENC} font-weight="900" font-size="30" text-anchor="middle">
      <text x="52" y="72" fill="#c9c4bb" textLength="80" lengthAdjust="spacingAndGlyphs">AMOR</text>
      <text x="50" y="70" fill="#fff" stroke="#e1dcd4" stroke-width=".8" textLength="80" lengthAdjust="spacingAndGlyphs">AMOR</text>
    </g>
    <rect x="8" y="74" width="84" height="6" rx="2" fill="#ece7df"/>`,
  "enc-vaso-planta": `
    ${encSombra(22)}
    <path d="M50 56 C48 40 44 30 36 20 M50 56 C54 40 60 30 70 22 M50 56 C50 44 50 34 52 14" fill="none" stroke="#2a6a3f" stroke-width="2"/>
    <path d="M36 20 C20 18 14 34 26 40 C34 44 40 32 36 20 Z" fill="${ENC.verde}"/>
    <path d="M70 22 C86 18 92 36 80 42 C70 46 66 34 70 22 Z" fill="${ENC.verde}"/>
    <path d="M52 14 C44 4 30 10 38 22 C44 30 56 24 52 14 Z" fill="#3f9a5f"/>
    <path d="M26 30 L33 27 M80 32 L74 30 M45 14 L48 19" stroke="#1b4f31" stroke-width="1.2"/>
    <path d="M32 56 H68 L64 92 H36 Z" fill="${ENC.marrom}"/>
    <path d="M33 62 H67 M34 70 H66 M35 78 H65 M36 86 H64" stroke="${ENC.marromClaro}" stroke-width="2"/>
    <rect x="30" y="54" width="40" height="6" rx="2" fill="${ENC.marromEscuro}"/>`,
  "enc-imagem-santa": `
    ${encSombra(24)}
    <rect x="30" y="84" width="40" height="8" rx="2" fill="#ece7df"/>
    <path d="M50 22 C38 26 34 44 32 84 H68 C66 44 62 26 50 22 Z" fill="#fff" stroke="#dcd6cc" stroke-width="1"/>
    <path d="M50 30 C44 34 42 50 42 84 H58 C58 50 56 34 50 30 Z" fill="#f4f1ec"/>
    <path d="M46 44 L50 52 L54 44" fill="none" stroke="#dcd6cc" stroke-width="1.2"/>
    <circle cx="50" cy="20" r="7" fill="#fff" stroke="#dcd6cc" stroke-width="1"/>
    <path d="M43 12 L45 6 L48 10 L50 4 L52 10 L55 6 L57 12 Z" fill="${ENC.ouro}"/>`,
};
