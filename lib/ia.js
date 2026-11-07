// Cliente da rota /api/ia (a chave da Anthropic fica só no servidor).
export async function chamarIA(modo, texto) {
  try {
    const r = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo, texto }),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok) return { ok: true, ...j };
    const msg = {
      ia_indisponivel: "A IA não está ativada neste momento.",
      muitas_requisicoes: "Muitas perguntas seguidas. Aguarde um minuto.",
      sem_sugestao: "Não consegui sugerir um tipo. Escolha manualmente.",
      recusado: "Não consegui responder a isso.",
    }[j.erro] || "A IA não respondeu agora. Tente novamente.";
    return { ok: false, msg };
  } catch {
    return { ok: false, msg: "Sem conexão com a IA. Tente novamente." };
  }
}
