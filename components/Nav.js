"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

const principais = [
  { href: "/", nome: "Mapa", icone: "map" },
  { href: "/descarte", nome: "Onde descartar", curto: "Descartar", icone: "trash" },
  { href: "/estatisticas", nome: "Dados do bairro", curto: "Dados", icone: "chart" },
];
const projeto = [
  { href: "/diagnostico", nome: "Diagnóstico", icone: "doc" },
  { href: "/divulgar", nome: "Divulgar (QR Code)", icone: "qr" },
];

export default function Nav() {
  const path = usePathname();
  const on = (h) => (path === h ? "on" : "");

  return (
    <>
      <aside className="lado">
        <Link href="/" className="marca">
          <span className="marca-nome">MAPA<br />LIMPO</span>
          <span className="marca-sub">Vila Adalgisa · São Paulo</span>
        </Link>
        <Link href="/registrar" className="btn laranja grande"><Icon n="plus" /> Reportar lixo</Link>
        <nav aria-label="Principal" className="menu">
          {principais.map((l) => (
            <Link key={l.href} href={l.href} className={on(l.href)}><Icon n={l.icone} />{l.nome}</Link>
          ))}
          <span className="menu-titulo">O projeto</span>
          {projeto.map((l) => (
            <Link key={l.href} href={l.href} className={on(l.href)}><Icon n={l.icone} />{l.nome}</Link>
          ))}
        </nav>
        <div className="lado-rodape">
          <strong className="t">Extensão UCS</strong>
          Ciência da Computação em parceria com Direito.
          <br /><br />
          O mapa dá visibilidade, mas <strong>não envia denúncia</strong>. Para pedir limpeza, ligue <strong>156</strong>.
        </div>
      </aside>

      <nav className="abas" aria-label="Principal">
        <Link href="/" className={on("/")}><Icon n="map" />Mapa</Link>
        <Link href="/descarte" className={on("/descarte")}><Icon n="trash" />Descartar</Link>
        <Link href="/registrar" className="aba-fab" aria-label="Reportar lixo"><Icon n="plus" size={26} /></Link>
        <Link href="/estatisticas" className={on("/estatisticas")}><Icon n="chart" />Dados</Link>
        <Link href="/diagnostico" className={path === "/diagnostico" || path === "/divulgar" ? "on" : ""}><Icon n="doc" />Projeto</Link>
      </nav>
    </>
  );
}
