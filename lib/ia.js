// Cliente da rota /api/ia (a chave da Anthropic fica só no servidor).
export const MSG_IA_DESATIVADA = "A IA está desativada no momento.";

export async function chamarIA(modo, texto) {
  try {
    const r = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo, texto }),
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok) return { ok: true, ...j };
    // Respostas que fazem sentido para o usuário. Qualquer falha do serviço
    // (sem chave, chave inválida, instabilidade) aparece como "desativada".
    const msg = {
      muitas_requisicoes: "Muitas perguntas seguidas. Aguarde um minuto.",
      sem_sugestao: "Não consegui sugerir um tipo. Escolha manualmente.",
      recusado: "Não consegui responder a isso.",
    }[j.erro] || MSG_IA_DESATIVADA;
    return { ok: false, msg };
  } catch {
    return { ok: false, msg: MSG_IA_DESATIVADA };
  }
}
