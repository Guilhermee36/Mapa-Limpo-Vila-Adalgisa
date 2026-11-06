"use client";
import { useMemo } from "react";
import Icon from "@/components/Icon";
import { useOcorrencias, baixarCsv } from "@/lib/useOcorrencias";
import { TIPOS, STATUS, STATUS_COR, mapsLink } from "@/lib/supabase";

function Barras({ itens, total }) {
  const max = Math.max(1, ...itens.map((i) => i.n));
  return itens.map((i) => (
    <div key={i.k}>
      <div className="barra-l"><span>{i.nome}</span><strong>{i.n}{total ? ` · ${Math.round((i.n / total) * 100)}%` : ""}</strong></div>
      <div className="barra"><div style={{ width: `${(i.n / max) * 100}%`, ...(i.cor ? { background: i.cor } : {}) }} /></div>
    </div>
  ));
}

export default function Estatisticas() {
  const { dados, erro, carregando } = useOcorrencias();

  const s = useMemo(() => {
    const d = dados || [];
    const porTipo = Object.entries(TIPOS).map(([k, nome]) => ({ k, nome, n: d.filter((o) => o.tipo === k).length })).filter((i) => i.n > 0).sort((a, b) => b.n - a.n);
    const porStatus = Object.entries(STATUS).map(([k, nome]) => ({ k, nome, cor: STATUS_COR[k], n: d.filter((o) => o.status === k).length }));
    const meses = {};
    d.forEach((o) => { const m = o.created_at.slice(0, 7); meses[m] = (meses[m] || 0) + 1; });
    const porMes = Object.keys(meses).sort().map((m) => ({ k: m, nome: m.split("-").reverse().join("/"), n: meses[m] }));
    const cel = {};
    d.forEach((o) => {
      const k = `${o.lat.toFixed(3)},${o.lng.toFixed(3)}`;
      (cel[k] ||= { lat: 0, lng: 0, n: 0 });
      cel[k].lat += o.lat; cel[k].lng += o.lng; cel[k].n++;
    });
    const quentes = Object.values(cel).map((c) => ({ lat: c.lat / c.n, lng: c.lng / c.n, n: c.n })).sort((a, b) => b.n - a.n).slice(0, 5);
    return { total: d.length, porTipo, porStatus, porMes, quentes, apoios: d.reduce((t, o) => t + (o.apoios || 0), 0) };
  }, [dados]);

  return (
    <div className="pagina">
      <span className="rotulo-mono">Calculado em tempo real</span>
      <h1 style={{ margin: "6px 0 4px" }}>Dados do bairro</h1>
      <p className="suave">Onde e que tipo de lixo mais aparece, a partir das ocorrências aprovadas.</p>
      {erro && <div className="aviso erro">{erro}</div>}

      <div className="kpis">
        <div className="kpi laranja"><b>{carregando ? "–" : s.total}</b><span>ocorrências no mapa</span></div>
        <div className="kpi"><b>{carregando ? "–" : s.apoios}</b><span>apoios de moradores</span></div>
        <div className="kpi amarelo"><b>{carregando ? "–" : s.porStatus.find((i) => i.k === "resolvido")?.n ?? 0}</b><span>já resolvidas</span></div>
      </div>

      {!carregando && s.total === 0 ? (
        <div className="cartao vazio">Ainda não há dados para mostrar.</div>
      ) : (
        <div className="grade">
          <div className="cartao"><h3>Por tipo de resíduo</h3><Barras itens={s.porTipo} total={s.total} /></div>
          <div className="cartao"><h3>Por status</h3><Barras itens={s.porStatus} total={s.total} /></div>
          <div className="cartao"><h3>Por mês</h3><Barras itens={s.porMes} /></div>
          <div className="cartao">
            <h3>Locais com mais registros</h3>
            {s.quentes.map((q, i) => (
              <div className="barra-l" key={i}>
                <span>#{i + 1} · <a href={mapsLink(q.lat, q.lng)} target="_blank" rel="noopener noreferrer">ver no mapa</a></span>
                <strong>{q.n}</strong>
              </div>
            ))}
            <small className="suave">Áreas de cerca de 100 metros.</small>
          </div>
        </div>
      )}
      <div className="acoes" style={{ marginTop: 24 }}>
        <button className="btn" disabled={!s.total} onClick={() => baixarCsv(dados)}><Icon n="download" size={18} /> Baixar dados (CSV)</button>
      </div>
    </div>
  );
}
