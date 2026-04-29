import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.bazario-official.com";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/produits`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/cgv`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/mentions-legales`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/politique-de-confidentialite`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/politique-de-retour`, changeFrequency: "monthly", priority: 0.4 }
  ];
}
