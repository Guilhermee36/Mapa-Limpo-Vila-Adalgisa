"use client";
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => <p style={{ padding: 16 }}>Carregando mapa…</p>,
});

export default Mapa;
