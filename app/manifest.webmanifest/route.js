export const dynamic = "force-static";

export function GET() {
  const icon =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="#0f766e"/><text x="50" y="68" font-size="58" text-anchor="middle" fill="#fff">♻</text></svg>'
    );
  return Response.json({
    name: "Mapa Limpo Vila Adalgisa",
    short_name: "Mapa Limpo",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7f6",
    theme_color: "#0f766e",
    icons: [{ src: icon, sizes: "any", type: "image/svg+xml", purpose: "any" }],
  });
}
