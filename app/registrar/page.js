"use client";
import { useState } from "react";
import Link from "next/link";
import Mapa from "@/components/Mapa";
import Icon from "@/components/Icon";
import { supabase, TIPOS } from "@/lib/supabase";

export default function Registrar() {
  const [pos, setPos] = useState(null);
  const [alvo, setAlvo] = useState(null);
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [busca, setBusca] = useState("");
  const [msg, setMsg] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function usarGps() {
    if (!navigator.geolocation) return setMsg("Seu navegador não permite localização.");
    navigator.geolocation.getCurrentPosition(
      (g) => { const p = [g.coords.latitude, g.coords.longitude]; setPos(p); setAlvo(p); setMsg(null); },
      () => setMsg("Não foi possível obter sua localização. Toque no mapa para marcar o ponto.")
    );
  }

  async function buscarEndereco(e) {
    e.preventDefault();
    if (!busca.trim()) return;
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(busca + ", São Paulo")}`;
      const r = await (await fetch(url)).json();
      if (!r.length) return setMsg("Endereço não encontrado. Toque no mapa para marcar o ponto.");
      setAlvo([parseFloat(r[0].lat), parseFloat(r[0].lon)]);
      setMsg(null);
    } catch {
      setMsg("Falha na busca de endereço. Toque no mapa para marcar o ponto.");
    }
  }

  async function enviar() {
    setMsg(null);
    if (!pos) return setMsg("Marque o local no mapa.");
    if (!tipo) return setMsg("Escolha o tipo de resíduo.");
    if (foto && foto.size > 5 * 1024 * 1024) return setMsg("A foto deve ter no máximo 5 MB.");
    setEnviando(true);
    try {
      let foto_url = null;
      if (foto) {
        const ext = (foto.name.split(".").pop() || "jpg").toLowerCase();
        const nome = `${crypto.randomUUID()}.${ext}`;
        const { error: eUp } = await supabase.storage.from("fotos").upload(nome, foto, { contentType: foto.type });
        if (eUp) throw eUp;
        foto_url = supabase.storage.from("fotos").getPublicUrl(nome).data.publicUrl;
      }
      const { error } = await supabase
        .from("ocorrencias")
        .insert({ tipo, descricao: descricao.trim() || null, lat: pos[0], lng: pos[1], foto_url });
      if (error) throw error;
      setEnviado(true);
    } catch {
      setMsg("Não foi possível enviar. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  function novo() {
    setPos(null); setTipo(""); setDescricao(""); setFoto(null); setMsg(null); setEnviado(false);
  }

  if (enviado) {
    return (
      <div className="pagina" style={{ maxWidth: 620 }}>
        <div className="cartao" style={{ background: "#b9efd2" }}>
          <h1 style={{ fontSize: "2.2rem" }}>Recebido!</h1>
          <p style={{ marginTop: 10 }}>Sua ocorrência foi enviada. Ela aparece no mapa assim que a equipe conferir (para evitar spam e fotos indevidas).</p>
          <div className="aviso" style={{ margin: "14px 0" }}>
            <strong>Quer que a Prefeitura resolva?</strong> O mapa não envia denúncia. Abra o SP156 ou ligue 156.
          </div>
          <div className="acoes">
            <a className="btn laranja" target="_blank" rel="noopener noreferrer" href="https://sp156.prefeitura.sp.gov.br">Abrir SP156 <Icon n="ext" size={16} /></a>
            <button className="btn papel" onClick={novo}>Registrar outro</button>
            <Link className="btn papel" href="/">Voltar ao mapa</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reg">
      <div className="reg-form">
        <div>
          <h1 style={{ fontSize: "2rem" }}>Reportar lixo</h1>
          <p className="suave" style={{ marginTop: 6 }}>Anônimo, leva 1 minuto. Evite fotografar pessoas e placas de veículos.</p>
        </div>

        <div className={`passo ${pos ? "feito" : ""}`}>
          <b>{pos ? "✓" : "1"}</b>
          <div>
            <label>Onde está o lixo?</label>
            <div className="acoes" style={{ gap: 8 }}>
              <button type="button" className="btn peq" onClick={usarGps}><Icon n="locate" size={16} /> Usar minha localização</button>
            </div>
            <form onSubmit={buscarEndereco} style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="ou digite uma rua / CEP" aria-label="Buscar endereço" />
              <button className="btn peq" aria-label="Buscar"><Icon n="search" size={16} /></button>
            </form>
            <small className="suave">{pos ? "Ponto marcado. Toque em outro lugar do mapa para mudar." : "Toque no mapa para marcar o ponto."}</small>
          </div>
        </div>

        <div className={`passo ${tipo ? "feito" : ""}`}>
          <b>{tipo ? "✓" : "2"}</b>
          <div>
            <label>Tipo de resíduo</label>
            <div className="tipos">
              {Object.entries(TIPOS).map(([k, v]) => (
                <button key={k} type="button" className={tipo === k ? "on" : ""} onClick={() => setTipo(k)}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="passo">
          <b>3</b>
          <div>
            <label htmlFor="desc">Detalhes (opcional)</label>
            <textarea id="desc" rows={3} maxLength={500} value={descricao} onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex.: sacos de lixo na calçada em frente ao nº 120" />
            <label htmlFor="foto" style={{ marginTop: 12 }}>Foto (opcional)</label>
            <input id="foto" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFoto(e.target.files[0] || null)} />
          </div>
        </div>

        <div className="enviar-barra">
          {msg && <div className="aviso erro" style={{ marginBottom: 10 }}>{msg}</div>}
          <button className="btn laranja bloco" style={{ padding: "14px" }} disabled={enviando} onClick={enviar}>
            {enviando ? "Enviando…" : "Enviar ocorrência"}
          </button>
        </div>
      </div>

      <div className="reg-mapa">
        <div className="mapa-fill"><Mapa escolhido={pos} onPick={setPos} alvo={alvo} /></div>
        {!pos && <div className="dica-mapa">TOQUE NO MAPA PARA MARCAR O LOCAL</div>}
      </div>
    </div>
  );
}
