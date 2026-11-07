// Teste local da chave da Anthropic. Faz a mesma chamada da rota /api/ia do site.
// Uso:  npm run testar-ia
// A chave vem de: variável ANTHROPIC_API_KEY, ou do arquivo .env.local, ou é pedida (digitação oculta).
// A chave NUNCA é impressa por inteiro nem gravada em arquivo.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import Anthropic from "@anthropic-ai/sdk";

const MODELO = "claude-haiku-5-5";

function lerEnvLocal() {
  try {
    const txt = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
    const m = txt.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.*)$/m);
    return m ? m[1] : "";
  } catch { return ""; }
}

function perguntarOculto(texto) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (rl.mudo) rl.output.write("*".repeat(Math.max(0, s.length))); else rl.output.write(s); };
    rl.question(texto, (v) => { rl.close(); process.stdout.write("\n"); resolve(v); });
    rl.mudo = true;
  });
}

const mascara = (k) => (k.length > 14 ? `${k.slice(0, 10)}...${k.slice(-4)}` : "(curta demais)");

let bruta = process.env.ANTHROPIC_API_KEY || lerEnvLocal();
let origem = process.env.ANTHROPIC_API_KEY ? "variável de ambiente" : bruta ? ".env.local" : "";
if (!bruta) {
  bruta = await perguntarOculto("Cole a chave da Anthropic (não aparece na tela) e tecle Enter: ");
  origem = "digitada agora";
}

const chave = bruta.trim().replace(/^["']|["']$/g, "");
console.log(`\nOrigem da chave: ${origem}`);
console.log(`Chave: ${mascara(chave)}  (${chave.length} caracteres)`);

const avisos = [];
if (chave !== bruta) avisos.push("A chave tinha espaços ou aspas nas pontas. Na Vercel, cole sem eles.");
if (!chave.startsWith("sk-ant-")) avisos.push('A chave deveria começar com "sk-ant-". Parece que não é uma chave de API da Anthropic.');
if (chave.length < 40) avisos.push("A chave parece curta demais (copiada pela metade?).");
if (/\s/.test(chave)) avisos.push("Há espaço ou quebra de linha no meio da chave.");
avisos.forEach((a) => console.log("ATENÇÃO:", a));

if (!chave) { console.log("\nNenhuma chave informada."); process.exit(1); }

const explicacao = {
  401: "A Anthropic NÃO reconhece esta chave (inválida, incompleta, apagada ou desativada). Crie uma nova em console.anthropic.com > Settings > API Keys e copie na hora.",
  403: "A chave é válida, mas não tem permissão para este recurso ou modelo (veja o workspace e a organização da chave).",
  404: `O modelo ${MODELO} não está disponível para esta conta/chave.`,
  400: "Pedido recusado. Se a mensagem falar em crédito, adicione crédito em console.anthropic.com > Settings > Billing.",
  429: "Limite de uso atingido. Espere um pouco e tente de novo.",
};

console.log(`\nChamando ${MODELO} (pensamento desligado, esforço baixo)...`);
const t0 = Date.now();
try {
  const client = new Anthropic({ apiKey: chave });
  const r = await client.messages.create({
    model: MODELO,
    max_tokens: 40,
    thinking: { type: "disabled" },
    output_config: { effort: "low" },
    messages: [{ role: "user", content: "Responda apenas: funcionando" }],
  });
  const texto = r.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  console.log(`\nOK em ${Date.now() - t0} ms. Resposta: "${texto}"`);
  console.log(`Tokens: ${r.usage.input_tokens} de entrada, ${r.usage.output_tokens} de saída.`);
  console.log("\nA chave está VÁLIDA. Cadastre exatamente essa chave na Vercel (ANTHROPIC_API_KEY) e faça Redeploy.");
} catch (e) {
  console.log(`\nFALHOU: status ${e?.status ?? "sem resposta"}  ${e?.error?.error?.type ?? e?.name ?? ""}`);
  if (e?.error?.error?.message) console.log("Mensagem da Anthropic:", e.error.error.message);
  else if (e?.message) console.log("Detalhe:", String(e.message).slice(0, 300));
  console.log("\nO que significa:", explicacao[e?.status] ?? (e?.status >= 500 ? "Instabilidade da Anthropic. Tente de novo em instantes." : "Erro de conexão ou inesperado: veja o detalhe acima."));
  process.exit(1);
}
