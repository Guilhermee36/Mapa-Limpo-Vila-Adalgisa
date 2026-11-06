"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Carrega as ocorrências aprovadas (o banco só entrega as aprovadas).
export function useOcorrencias() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    supabase
      .from("ocorrencias")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErro("Não foi possível carregar as ocorrências.");
        else setDados(data);
      });
  }, []);

  return { dados, erro, carregando: dados === null && !erro };
}

export function baixarCsv(linhas) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const cab = ["data", "tipo", "status", "descricao", "lat", "lng", "apoios"];
  const csv = [cab.join(",")]
    .concat(linhas.map((o) => [o.created_at?.slice(0, 10), o.tipo, o.status, o.descricao, o.lat, o.lng, o.apoios ?? 0].map(esc).join(",")))
    .join("\n");
  const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "ocorrencias-mapa-limpo.csv";
  a.click();
  URL.revokeObjectURL(url);
}
