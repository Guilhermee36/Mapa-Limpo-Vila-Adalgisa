"use client";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { CENTRO, STATUS_COR } from "@/lib/supabase";

const iconeEco = L.divIcon({ className: "", html: '<div class="pino-eco">E</div>', iconSize: [26, 26], iconAnchor: [13, 13] });
const iconeEu = L.divIcon({ className: "", html: '<div class="pino-eu"></div>', iconSize: [16, 16], iconAnchor: [8, 8] });

function Clique({ onPick }) {
  useMapEvents({ click: (e) => onPick && onPick([e.latlng.lat, e.latlng.lng]) });
  return null;
}

function Voar({ alvo }) {
  const map = useMap();
  useEffect(() => {
    if (alvo) map.flyTo(alvo, Math.max(map.getZoom(), 16), { duration: 0.6 });
  }, [alvo, map]);
  return null;
}

// Desloca o centro para a direita quando há painel sobre o mapa (desktop)
function Ajuste({ deslocar }) {
  const map = useMap();
  useEffect(() => {
    if (deslocar && window.innerWidth > 880) map.panBy([-190, 0], { animate: false });
  }, [deslocar, map]);
  return null;
}

export default function MapView({ ocorrencias = [], ecopontos = [], selId, onSelect, escolhido, onPick, alvo, eu, deslocar }) {
  return (
    <MapContainer center={CENTRO} zoom={15} zoomControl={true} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {onPick && <Clique onPick={onPick} />}
      <Voar alvo={alvo} />
      <Ajuste deslocar={deslocar} />
      {ocorrencias.map((o) => (
        <CircleMarker
          key={o.id}
          center={[o.lat, o.lng]}
          radius={o.id === selId ? 15 : 10}
          pathOptions={{ color: "#14110f", weight: o.id === selId ? 4 : 3, fillColor: STATUS_COR[o.status] || "#ff5a1f", fillOpacity: 1 }}
          eventHandlers={{ click: () => onSelect && onSelect(o.id) }}
        />
      ))}
      {ecopontos.filter((e) => e.lat).map((e) => (
        <Marker key={e.nome} position={[e.lat, e.lng]} icon={iconeEco}>
          <Popup>
            <strong>Ecoponto {e.nome}</strong><br />{e.endereco}<br />
            <small>Posição aproximada</small>
          </Popup>
        </Marker>
      ))}
      {eu && <Marker position={eu} icon={iconeEu} />}
      {escolhido && (
        <CircleMarker center={escolhido} radius={13}
          pathOptions={{ color: "#14110f", weight: 4, fillColor: "#ff5a1f", fillOpacity: 1 }} />
      )}
    </MapContainer>
  );
}
