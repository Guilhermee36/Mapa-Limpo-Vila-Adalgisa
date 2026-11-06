"use client";
import { useState } from "react";
import Icon from "./Icon";
import { supabase, TIPOS, STATUS, STATUS_COR, mapsLink } from "@/lib/supabase";

export default function Detalhe({ o, onVoltar }) {
  const chave = `apoio-${o.id}`;
  const [apoios, setApoios] = useState(o.apoios ?? 0);
  const [feito, setFeito] = useState(() => {
    try { return !!localStorage.getItem(chave); } catch { return false; }
  });

  async function apoiar() {
    const { data, error } = await supabase.rpc("apoiar", { p_id: o.id });
    setApoios(!error && typeof data === "number" ? data : (n) => n + 1);
    setFeito(true);
    try { localStorage.setItem(chave, "1"); } catch {}
  }

  const msg = encodeURIComponent(`Ponto de lixo irregular (${TIPOS[o.tipo] || o.tipo}) na Vila Adalgisa: ${mapsLink(o.lat, o.lng)}`);

  return (
    <>
      <button className="voltar" onClick={onVoltar}><Icon n="back" size={18} /> Voltar para a lista</button>
      <div className="detalhe">
        {o.foto_url && <img className="foto" src={o.foto_url} alt="Foto da ocorrência" />}
        <div className="detalhe-corpo">
          <div>
            <span className="chip"><i className="ponto" style={{ background: STATUS_COR[o.status] }} />{STATUS[o.status]}</span>
            <h2 style={{ marginTop: 10, marginBottom: 4 }}>{TIPOS[o.tipo] || o.tipo}</h2>
            <span className="rotulo-mono">Registrado em {new Date(o.created_at).toLocaleDateString("pt-BR")}</span>
          </div>
          <p style={{ margin: 0 }}>{o.descricao || <span className="suave">Sem descrição.</span>}</p>

          <button className="btn laranja bloco" disabled={feito} onClick={apoiar}>
            <Icon n={feito ? "check" : "eye"} /> {feito ? "Você apoiou" : "Também vejo esse problema"} · {apoios}
          </button>
          <div className="acoes">
            <a className="btn papel peq" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${msg}`}><Icon n="share" size={16} /> Compartilhar</a>
            <a className="btn papel peq" target="_blank" rel="noopener noreferrer" href={mapsLink(o.lat, o.lng)}><Icon n="ext" size={16} /> Google Maps</a>
          </div>

          <div className="aviso">
            <strong>Isto não é uma denúncia oficial.</strong> Para pedir a limpeza, use o SP156 ou ligue 156.
            <div style={{ marginTop: 8 }}>
              <a className="btn peq papel" target="_blank" rel="noopener noreferrer" href="https://sp156.prefeitura.sp.gov.br">Abrir SP156 <Icon n="ext" size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
