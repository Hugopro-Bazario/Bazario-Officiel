const SITE_URL = "https://www.bazario-official.com"

export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bazario",
    legalName: "Bazario",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Bazario est la marketplace futuriste des produits et services digitaux : agents IA, prompts, templates, formations, musique générative et SaaS, livrés instantanément par des créateurs vérifiés.",
    slogan: "Le marché du futur.",
    foundingDate: "2024",
    knowsAbout: [
      "agents IA",
      "prompts",
      "templates",
      "formations en ligne",
      "intelligence artificielle",
      "produits digitaux",
      "automatisation",
    ],
    sameAs: [
      "https://www.instagram.com/bazario.official",
      "https://www.tiktok.com/@bazario.official",
      "https://www.linkedin.com/company/bazario",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@bazario.com",
        availableLanguage: ["French", "English"],
        areaServed: ["FR", "BE", "CH", "LU", "CA", "EU"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "creators@bazario.com",
        availableLanguage: ["French", "English"],
      },
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bazario",
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@type": "Organization", name: "Bazario", url: SITE_URL },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
