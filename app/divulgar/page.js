"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Icon from "@/components/Icon";

export default function Divulgar() {
  const [url, setUrl] = useState("");
  const canvas = useRef(null);

  useEffect(() => { setUrl(window.location.origin); }, []);
  useEffect(() => {
    if (url && canvas.current) QRCode.toCanvas(canvas.current, url, { width: 520, margin: 1, color: { dark: "#14110f", light: "#ffffff" } });
  }, [url]);

  return (
    <div className="pagina">
      <div className="dois">
        <div className="nao-imprimir">
          <span className="rotulo-mono">Material da campanha</span>
          <h1 style={{ margin: "6px 0 12px" }}>Cartaz com QR Code</h1>
          <p className="suave">Imprima e cole em espaços da comunidade, ou use nos panfletos. Quem apontar a câmera do celular chega direto ao sistema.</p>
          <label htmlFor="url" style={{ marginTop: 18 }}>Endereço do sistema</label>
          <input id="url" value={url} onChange={(e) => setUrl(e.target.value.trim())} />
          <small className="suave">Confira se é o link final antes de imprimir.</small>
          <div className="acoes" style={{ marginTop: 18 }}>
            <button className="btn laranja" onClick={() => window.print()}><Icon n="print" /> Imprimir</button>
            <a className="btn papel" target="_blank" rel="noopener noreferrer"
              href={`https://wa.me/?text=${encodeURIComponent("Viu lixo jogado na rua? Registre no Mapa Limpo da Vila Adalgisa: " + url)}`}>
              <Icon n="share" size={18} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="cartaz">
          <div className="topo">Viu lixo jogado na rua?</div>
          <p style={{ fontSize: "1.1rem", margin: "14px 0 0" }}>Mostre no <strong>Mapa Limpo Vila Adalgisa</strong>.<br />É anônimo e leva 1 minuto.</p>
          <canvas ref={canvas} aria-label="QR Code do sistema" />
          <div className="url">{url}</div>
          <p style={{ margin: "14px 0 0", fontSize: ".82rem", color: "#444" }}>
            Descarte irregular é crime ambiental. Para pedir a limpeza oficial, ligue 156.
          </p>
        </div>
      </div>
    </div>
  );
}
