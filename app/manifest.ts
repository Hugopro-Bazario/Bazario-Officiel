import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bazario — La marketplace nouvelle génération",
    short_name: "Bazario",
    description:
      "Mode, beauté, tech, maison, sport et plus. Vendeurs vérifiés, livraison rapide, paiement sécurisé.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f1e8",
    theme_color: "#0b1320",
    lang: "fr",
    categories: ["shopping", "lifestyle", "fashion"],
    icons: [
      { src: "/icon-512.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/icon-512.jpg", sizes: "512x512", type: "image/jpeg" },
      { src: "/icon-512.jpg", sizes: "512x512", type: "image/jpeg", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Top ventes", url: "/bestsellers" },
      { name: "Nouveautés", url: "/new" },
      { name: "Soldes", url: "/deals" },
      { name: "Mon compte", url: "/account" },
    ],
  }
}
