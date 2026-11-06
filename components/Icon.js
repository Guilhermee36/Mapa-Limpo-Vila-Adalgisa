const P = {
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z M9 4v14 M15 6v14",
  plus: "M12 5v14 M5 12h14",
  trash: "M3 6h18 M8 6V4h8v2 M6 6l1 14h10l1-14 M10 10v6 M14 10v6",
  chart: "M4 20V10 M10 20V4 M16 20v-8 M22 20H2",
  doc: "M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h7",
  qr: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h3v3h-3z M20 14v1 M14 20v1 M18 18h3v3h-3z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3",
  list: "M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01",
  x: "M18 6 6 18 M6 6l12 12",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  check: "M5 12l5 5 9-10",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  share: "M4 12v7h16v-7 M12 3v12 M7 8l5-5 5 5",
  download: "M12 3v12 M7 10l5 5 5-5 M4 21h16",
  locate: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v3 M12 19v3 M2 12h3 M19 12h3",
  back: "M15 18l-6-6 6-6",
  up: "M6 15l6-6 6 6",
  down: "M6 9l6 6 6-6",
  print: "M6 9V3h12v6 M6 18H4v-7h16v7h-2 M6 14h12v7H6z",
  ext: "M14 4h6v6 M20 4l-9 9 M18 14v6H4V6h6",
  layers: "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
};

export default function Icon({ n, size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true" {...rest}>
      {P[n].split(" M").map((d, i) => <path key={i} d={(i ? "M" : "") + d} />)}
    </svg>
  );
}
