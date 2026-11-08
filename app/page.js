"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Mapa from "@/components/Mapa";
import Detalhe from "@/components/Detalhe";
import Icon from "@/components/Icon";
import { TIPOS, STATUS, STATUS_COR } from "@/lib/supabase";
import { ecopontos } from "@/data/ecopontos";
import { useOcorrencias, baixarCsv } from "@/lib/useOcorrencias";

export default function Inicio() {
  const { dados, erro, carregando } = useOcorrencias();
  const [status, setStatus] = useState("");
  const [tipo, setTipo] = useState("");
  const [dias, setDias] = useState("");
  const [sel, setSel] = useState(null);
  const [verEco, setVerEco] = useState(true);
  const [aberto, setAberto] = useState(false);
  const [alvo, setAlvo] = useState(null);
  const [eu, setEu] = useState(null);
  const [msg, setMsg] = useState("");

  const filtradas = useMemo(() => {
    const limite = dias ? Date.now() - Number(dias) * 86400000 : 0;
    return (dados || []).filter(
      (o) => (!status || o.status === status) && (!tipo || o.tipo === tipo) && new Date(o.created_at) >= limite
    );
  }, [dados, status, tipo, dias]);

  const n = (s) => (dados || []).filter((o) => o.status === s).length;
  const atual = dados?.find((o) => o.id === sel);

  function escolher(id) {
    setSel(id);
    setAberto(true);
    const o = dados?.find((x) => x.id === id);
    if (o) setAlvo([o.lat, o.lng]);
  }

  function localizar() {
    setMsg("");
    if (!navigator.geolocation) return setMsg("Seu navegador não permite localização.");
    navigator.geolocation.getCurrentPosition(
      (g) => { const p = [g.coords.latitude, g.coords.longitude]; setEu(p); setAlvo(p); },
      () => setMsg("Não foi possível obter sua localização.")
    );
  }

  return (
    <div className="cheio">
      <div className="mapa-fill">
        <Mapa ocorrencias={filtradas} ecopontos={verEco ? ecopontos : []} selId={sel} onSelect={escolher} alvo={alvo} eu={eu} deslocar />
      </div>

      <div className="ctl">
        <Link href="/registrar" className="btn laranja rotulo-longo"><Icon n="plus" /><span>Reportar lixo</span></Link>
        <button className="btn papel peq" onClick={localizar}><Icon n="locate" size={16} /> Minha posição</button>
        <button className={`btn peq ${verEco ? "" : "off"}`} onClick={() => setVerEco(!verEco)}>
          <Icon n="layers" size={16} /> Ecopontos {verEco ? "ligados" : "ocultos"}
        </button>
        {msg && <div className="aviso" style={{ maxWidth: 220 }}>{msg}</div>}
      </div>

      <section className={`painel ${aberto ? "" : "fechado"}`} aria-label="Ocorrências">
        {atual ? (
          <Detalhe o={atual} onVoltar={() => setSel(null)} key={atual.id} />
        ) : (
          <>
            <button className="painel-handle" onClick={() => setAberto(!aberto)} aria-label={aberto ? "Recolher painel" : "Expandir painel"}>
              <Icon n={aberto ? "down" : "up"} size={22} />
            </button>
            <div className="painel-topo">
              <h1>Lixo na rua? Mostre no mapa.</h1>
              <p>Registro anônimo. Toque num ponto do mapa ou da lista para ver os detalhes.</p>
              <div className="aviso" style={{ marginTop: 8, fontSize: ".78rem", padding: "6px 10px" }}>
                <strong>Legenda:</strong> as ocorrências e suas datas são fictícias e foram inseridas para demonstrar o funcionamento do sistema.
              </div>
            </div>
            <div className="contadores">
              <div><b>{carregando ? "–" : dados?.length ?? 0}</b><span>No mapa</span></div>
              <div><b>{carregando ? "–" : n("encaminhado")}</b><span>Encaminh.</span></div>
              <div><b>{carregando ? "–" : n("resolvido")}</b><span>Resolvidas</span></div>
            </div>
            <div className="filtros">
              <div className="pills">
                <button className={!status ? "on" : ""} onClick={() => setStatus("")}>Todas</button>
                {Object.entries(STATUS).map(([k, v]) => (
                  <button key={k} className={status === k ? "on" : ""} onClick={() => setStatus(k)}>{v}</button>
                ))}
              </div>
              <div className="duplo">
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} aria-label="Tipo de resíduo">
                  <option value="">Todos os tipos</option>
                  {Object.entries(TIPOS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select value={dias} onChange={(e) => setDias(e.target.value)} aria-label="Período">
                  <option value="">Qualquer data</option>
                  <option value="7">7 dias</option>
                  <option value="30">30 dias</option>
                  <option value="90">90 dias</option>
                </select>
              </div>
            </div>
            <div className="lista">
              {erro && <div className="aviso erro" style={{ margin: 12 }}>{erro}</div>}
              {!erro && filtradas.length === 0 && (
                <div className="vazio">
                  {carregando ? "Carregando…" : "Nenhuma ocorrência por aqui."}
                  {!carregando && <div style={{ marginTop: 12 }}><Link href="/registrar" className="btn laranja peq">Registrar a primeira</Link></div>}
                </div>
              )}
              {filtradas.map((o) => (
                <button key={o.id} className={`linha-oc ${o.id === sel ? "sel" : ""}`} onClick={() => escolher(o.id)}>
                  <i className="ponto" style={{ background: STATUS_COR[o.status] }} />
                  <span>
                    <strong>{TIPOS[o.tipo]}</strong>
                    <small>
                      {(o.descricao || "Sem descrição").slice(0, 60)} · {new Date(o.created_at).toLocaleDateString("pt-BR")}
                      {o.apoios > 0 && ` · ${o.apoios} apoio(s)`}
                    </small>
                  </span>
                </button>
              ))}
            </div>
            <div className="painel-rodape">
              <span><strong>{filtradas.length}</strong> ocorrência(s)</span>
              <button disabled={!filtradas.length} onClick={() => baixarCsv(filtradas)}>Baixar CSV</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
