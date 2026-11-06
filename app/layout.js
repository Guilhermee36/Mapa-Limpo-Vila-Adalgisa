import "./globals.css";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", weight: ["700", "800"] });
const corpo = IBM_Plex_Sans({ subsets: ["latin"], variable: "--f-corpo", weight: ["400", "500", "600"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--f-mono", weight: ["500", "600"] });

export const metadata = {
  title: "Mapa Limpo Vila Adalgisa",
  description: "Registre pontos de descarte irregular de lixo, saiba onde descartar e como denunciar na Vila Adalgisa, São Paulo.",
  manifest: "/manifest.webmanifest",
};

export const viewport = { themeColor: "#14110f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable} ${mono.variable}`}>
      <body>
        <div className="shell">
          <Nav />
          <div className="conteudo">{children}</div>
        </div>
      </body>
    </html>
  );
}
