"use client";
import { useMemo, useState } from "react";
import Mapa from "@/components/Mapa";
import Icon from "@/components/Icon";
import { ecopontos, canais, servicos, guia, regrasEcoponto } from "@/data/ecopontos";

function dist(a, b) {
  const R = 6371, rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b[0] - a[0]), dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const semAcento = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Descarte() {
  const [aba, setAba] = useState("itens");
  const [busca, setBusca] = useState("");
  const [lista, setLista] = useState(ecopontos);
  const [erro, setErro] = useState("");
  const [alvo, setAlvo] = useState(null);
  const [eu, setEu] = useState(null);

  const resultado = useMemo(() => {
    const q = semAcento(busca.trim());
    return q ? guia.filter((g) => semAcento(`${g.item} ${g.onde} ${g.dica}`).includes(q)) : guia;
  }, [busca]);

  function maisPerto() {
    setErro("");
    if (!navigator.geolocation) return setErro("Seu navegador não permite localização.");
    navigator.geolocation.getCurrentPosition(
      (g) => {
        const p = [g.coords.latitude, g.coords.longitude];
        const com = ecopontos.filter((e) => e.lat).map((e) => ({ ...e, km: dist(p, [e.lat, e.lng]) })).sort((a, b) => a.km - b.km);
        setLista([...com, ...ecopontos.filter((e) => !e.lat)]);
        setEu(p); setAlvo(p);
      },
      () => setErro("Não foi possível obter sua localização.")
    );
  }

  return (
    <div className="pagina">
      <span className="rotulo-mono">Informações da Prefeitura de São Paulo</span>
      <h1 style={{ margin: "6px 0 18px" }}>Onde descartar</h1>

      <div className="seg" role="tablist">
        <button className={aba === "itens" ? "on" : ""} onClick={() => setAba("itens")}>O que descarto?</button>
        <button className={aba === "eco" ? "on" : ""} onClick={() => setAba("eco")}>Ecopontos</button>
        <button className={aba === "den" ? "on" : ""} onClick={() => setAba("den")}>Como denunciar</button>
      </div>

      {aba === "itens" && (
        <div style={{ marginTop: 22 }}>
          <label htmlFor="b">Busque o item</label>
          <input id="b" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="sofá, colchão, entulho, galhos…" style={{ maxWidth: 520, marginBottom: 18 }} />
          {resultado.length === 0 ? (
            <div className="cartao vazio">Não encontramos esse item. Ligue <strong>156</strong> para tirar a dúvida.</div>
          ) : (
            <div className="itens">
              {resultado.map((g) => (
                <div className="item-g" key={g.item}>
                  <strong>{g.item}</strong>
                  <span><span className="chip">{g.onde}</span></span>
                  <span className="suave" style={{ fontSize: ".9rem" }}>{g.dica}</span>
                </div>
              ))}
            </div>
          )}
          <h2 style={{ marginTop: 32 }}>Serviços da Prefeitura</h2>
          <div className="grade">
            {servicos.map((s) => (
              <div className="cartao" key={s.nome}><h3>{s.nome}</h3><p className="suave" style={{ margin: 0 }}>{s.desc}</p></div>
            ))}
          </div>
        </div>
      )}

      {aba === "eco" && (
        <div style={{ marginTop: 22 }}>
          <div className="regras" style={{ marginTop: 0 }}>
            <div><span className="rotulo-mono">Horário</span><br />{regrasEcoponto.horario}</div>
            <div><span className="rotulo-mono">Limite</span><br />{regrasEcoponto.limite}</div>
            <div><span className="rotulo-mono">Aceita</span><br />{regrasEcoponto.aceita.join(" · ")}</div>
          </div>
          <div className="acoes" style={{ marginTop: 16 }}>
            <button className="btn laranja" onClick={maisPerto}><Icon n="locate" /> Achar o mais próximo de mim</button>
          </div>
          {erro && <div className="aviso erro" style={{ marginTop: 10 }}>{erro}</div>}
          <div className="eco-lay">
            <div className="eco-lista">
              {lista.map((e) => (
                <div key={e.nome}>
                  <strong>{e.nome}</strong> <span className="chip">{e.sub}</span>
                  {e.km != null && <div className="mono" style={{ fontSize: ".82rem" }}>≈ {e.km.toFixed(1)} km em linha reta</div>}
                  <div style={{ fontSize: ".9rem" }}>{e.endereco} · CEP {e.cep}</div>
                  {e.gesso && <small className="suave">Também recebe gesso</small>}
                  <div style={{ marginTop: 6 }}>
                    <a className="btn peq papel" target="_blank" rel="noopener noreferrer"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Ecoponto ${e.endereco}, São Paulo`)}`}>
                      Google Maps <Icon n="ext" size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="eco-mapa"><div className="mapa-fill"><Mapa ecopontos={lista} alvo={alvo} eu={eu} /></div></div>
              <p className="suave" style={{ fontSize: ".82rem", marginTop: 10 }}>
                No mapa, a posição é aproximada e só aparecem os ecopontos que foi possível localizar. A lista traz o endereço oficial de todos.
              </p>
            </div>
          </div>
        </div>
      )}

      {aba === "den" && (
        <div style={{ marginTop: 22, maxWidth: 760 }}>
          <ol className="passos-den">
            <li><div><h3>Documente</h3>Anote o endereço e tire uma foto, sem pessoas nem placas de veículos.</div></li>
            <li><div><h3>Abra o pedido</h3>No SP156 ou ligando <strong>156</strong>, escolha o serviço de limpeza ou descarte irregular.</div></li>
            <li><div><h3>Guarde o protocolo</h3>Com o número, você acompanha o andamento.</div></li>
            <li><div><h3>Registre aqui</h3>No Mapa Limpo, os vizinhos acompanham e apoiam o problema.</div></li>
          </ol>
          <div className="grade" style={{ marginTop: 22 }}>
            {canais.map((c) => (
              <div className="cartao" key={c.nome}>
                <h3>{c.nome}</h3>
                <p className="suave">{c.desc}</p>
                <a className="btn laranja peq" href={c.url} target="_blank" rel="noopener noreferrer">Acessar <Icon n="ext" size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
