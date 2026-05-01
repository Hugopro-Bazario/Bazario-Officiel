import type { MetadataRoute } from "next"

const BASE_URL = "https://www.bazario-official.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account/",
          "/admin/",
          "/seller/",
          "/checkout/",
          "/cart",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
