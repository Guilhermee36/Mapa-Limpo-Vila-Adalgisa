import Link from "next/link";

const destaques = [
  { v: "80%", t: "presenciaram acúmulo de lixo no último ano", cls: "laranja" },
  { v: "97%", t: "avaliam a fiscalização como regular, ruim ou péssima" },
  { v: "48,5%", t: "não sabem a quem denunciar crimes ambientais", cls: "amarelo" },
  { v: "0%", t: "já participaram de mutirões ou projetos ambientais" },
];

const habitos = [
  { t: "Economizam água e energia", v: 81.8 },
  { t: "Separam lixo reciclável", v: 51.5 },
  { t: "Têm interesse em iniciativas de preservação (mais de 60%)", v: 60 },
];

const urgentes = [
  { t: "Punição / multas", v: 33.3 },
  { t: "Coleta seletiva", v: 24.2 },
  { t: "Criação de áreas verdes", v: 2.9 },
];

function Barras({ itens, cor }) {
  return itens.map((d) => (
    <div key={d.t}>
      <div className="barra-l"><span>{d.t}</span><strong>{String(d.v).replace(".", ",")}%</strong></div>
      <div className="barra"><div style={{ width: `${d.v}%`, ...(cor ? { background: cor } : {}) }} /></div>
    </div>
  ));
}

export default function Diagnostico() {
  return (
    <div className="pagina">
      <span className="rotulo-mono">Dados do projeto · Direito + Computação</span>
      <h1 style={{ margin: "6px 0 10px" }}>O que a comunidade respondeu</h1>
      <p className="suave" style={{ maxWidth: 680 }}>
        Questionário digital, voluntário e anônimo, aplicado pelo grupo de Direito da UCS na Vila Adalgisa (Google Forms,
        de 08/10/2026 a 15/10/2026) e analisado em parceria com o grupo de Ciência da Computação.
      </p>

      <div className="kpis">
        {destaques.map((d) => (
          <div className={`kpi ${d.cls || ""}`} key={d.v}><b>{d.v}</b><span>{d.t}</span></div>
        ))}
      </div>

      <div className="grade">
        <div className="cartao"><h3>Hábitos e interesse</h3><Barras itens={habitos} /></div>
        <div className="cartao"><h3>Medidas mais urgentes, segundo a comunidade</h3><Barras itens={urgentes} cor="var(--laranja)" /></div>
      </div>

      <div className="cartao" style={{ marginTop: 22, background: "var(--amarelo)" }}>
        <h3>O que isso significa para o sistema</h3>
        <p style={{ margin: 0, maxWidth: 760 }}>
          Os moradores já adotam hábitos individuais sustentáveis, mas faltam informação sobre os canais de denúncia e
          organização para ações coletivas. O Mapa Limpo reúne o registro das ocorrências, o guia de descarte correto e o
          caminho para a denúncia oficial em um só lugar.
        </p>
      </div>

      <div className="acoes" style={{ marginTop: 22 }}>
        <Link className="btn laranja" href="/divulgar">Gerar cartaz com QR Code</Link>
        <Link className="btn papel" href="/">Abrir o mapa</Link>
      </div>
    </div>
  );
}
