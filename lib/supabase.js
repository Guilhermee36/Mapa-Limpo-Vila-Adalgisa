import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const TIPOS = {
  entulho: "Entulho / obra",
  moveis: "Móveis e colchões",
  domestico: "Lixo doméstico",
  reciclavel: "Recicláveis",
  pneus: "Pneus",
  vegetal: "Galhos / restos de poda",
  outros: "Outros",
};

export const TIPO_ICONE = {
  entulho: "🧱", moveis: "🛋️", domestico: "🗑️", reciclavel: "♻️", pneus: "🛞", vegetal: "🌿", outros: "📦",
};

export const STATUS = { registrado: "Registrado", encaminhado: "Encaminhado", resolvido: "Resolvido" };
export const STATUS_COR = { registrado: "#d97706", encaminhado: "#2563eb", resolvido: "#16a34a" };

// Centro aproximado: Vila Dalva / Vila Adalgisa, São Paulo
export const CENTRO = [-23.5645, -46.7668];

export const mapsLink = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;
