// Fonte: Prefeitura de São Paulo (Subprefeituras Butantã e Lapa / página de Ecopontos).
// Endereços conferidos no site oficial. lat/lng são APROXIMADAS (geocodificação por rua)
// e só existem onde foi possível localizar a rua; sem lat/lng o ecoponto aparece apenas
// na lista, com link para o Google Maps pelo endereço.
export const ecopontos = [
  { nome: "Politécnica", sub: "Butantã", endereco: "Rua Paulino Baptista Conti, 2 – Jardim Sarah", cep: "05382-140" },
  { nome: "Jardim Jaqueline / Parque Raposo Tavares", sub: "Butantã", endereco: "Rua Walter Brito Belletti, s/nº – Vila Albano", cep: "05543-040", gesso: true },
  { nome: "Jardim Maria do Carmo", sub: "Butantã", endereco: "Rua Caminho do Engenho, 800 – Ferreira", cep: "05524-000", lat: -23.5963, lng: -46.7456, aprox: true },
  { nome: "Giovani Gronchi", sub: "Butantã", endereco: "Av. Giovani Gronchi, 3413 – Morumbi", cep: "05651-002" },
  { nome: "Vida Nova", sub: "Butantã", endereco: "Travessa Córrego da Independência, 2 – Conjunto Promorar", cep: "05574-460", lat: -23.5854, lng: -46.8024, aprox: true },
  { nome: "Vila Jaguara", sub: "Lapa", endereco: "Rua Agrestina, 189 – Vila Jaguara", cep: "05117-100", lat: -23.5158, lng: -46.7414, aprox: true },
  { nome: "Viaduto Antártica", sub: "Lapa", endereco: "Rua Robert Bosch (baixos do Viaduto Antártica) – Parque Industrial Tomas Edson", cep: "01141-010", lat: -23.523, lng: -46.6704, aprox: true },
];

export const regrasEcoponto = {
  horario: "Segunda a sábado, das 6h às 22h. Domingos e feriados, das 6h às 18h.",
  limite: "Até 1 m³ (ou 20 sacos) por descarga. Gratuito.",
  aceita: [
    "Entulho de pequenas reformas",
    "Móveis velhos, colchões e objetos volumosos",
    "Podas de árvores domiciliares",
    "Recicláveis: papelão, plástico, vidro e metal",
  ],
};

export const canais = [
  {
    nome: "SP156 – Prefeitura de São Paulo",
    desc: "Canal oficial para pedir limpeza, coleta e denunciar descarte irregular. Também pelo telefone 156.",
    url: "https://sp156.prefeitura.sp.gov.br",
  },
  {
    nome: "Conheça os ecopontos da cidade",
    desc: "Página da Prefeitura com a lista e as regras dos ecopontos.",
    url: "https://prefeitura.sp.gov.br/w/conhe%C3%A7a-os-ecopontos-da-cidade-de-s%C3%A3o-paulo",
  },
];

export const servicos = [
  { icone: "♻️", nome: "Coleta seletiva", desc: "Recolhimento de papel, plástico, vidro e metal para reaproveitamento." },
  { icone: "📍", nome: "Ecopontos", desc: "Locais gratuitos para pequenos volumes de entulho, móveis velhos, podas e recicláveis." },
  { icone: "🛋️", nome: "Operação Cata-Bagulho", desc: "Recolhimento de objetos volumosos, como móveis e colchões, que não vão na coleta comum." },
];

// Guia de busca: só categorias com respaldo na fonte oficial acima.
export const guia = [
  { item: "Sofá, cama, armário, móveis velhos", onde: "Ecoponto ou Cata-Bagulho", dica: "No ecoponto, até 1 m³ por descarga." },
  { item: "Colchão", onde: "Ecoponto ou Cata-Bagulho", dica: "Nunca deixe na calçada: é descarte irregular." },
  { item: "Entulho de reforma pequena (tijolo, piso, azulejo)", onde: "Ecoponto", dica: "Até 1 m³ ou 20 sacos por descarga." },
  { item: "Madeira e pedaços de metal", onde: "Ecoponto", dica: "Quando for volumoso, o Cata-Bagulho também recolhe." },
  { item: "Galhos e podas de quintal", onde: "Ecoponto", dica: "Podas domiciliares são aceitas." },
  { item: "Papelão, plástico, vidro e metal", onde: "Coleta seletiva ou Ecoponto", dica: "Limpos e secos, separados do lixo comum." },
  { item: "Eletrodoméstico quebrado", onde: "Ecoponto ou Cata-Bagulho", dica: "A Prefeitura cita eletrodomésticos entre os objetos volumosos." },
  { item: "Gesso", onde: "Só em alguns ecopontos", dica: "Aceito em unidades específicas. Confirme no 156 antes de ir." },
  { item: "Lixo comum de casa", onde: "Coleta domiciliar", dica: "Coloque no horário da coleta do seu bairro, em saco fechado." },
];
