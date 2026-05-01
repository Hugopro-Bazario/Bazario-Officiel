import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Politique cookies — Bazario",
  description:
    "Quels cookies utilise Bazario, à quoi servent-ils et comment gérer vos préférences de consentement.",
}

const TOC = [
  { id: "definition", label: "Qu'est-ce qu'un cookie ?" },
  { id: "types", label: "Cookies utilisés" },
  { id: "duree", label: "Durée de vie" },
  { id: "gerer", label: "Gérer vos préférences" },
]

const COOKIES = [
  {
    name: "bazario_session",
    type: "Strictement nécessaire",
    purpose: "Maintien de la session utilisateur",
    duration: "Session",
  },
  {
    name: "bazario_cart",
    type: "Strictement nécessaire",
    purpose: "Mémorisation du panier",
    duration: "30 jours",
  },
  {
    name: "bazario_consent",
    type: "Strictement nécessaire",
    purpose: "Mémorisation de vos préférences cookies",
    duration: "13 mois",
  },
  {
    name: "_ga / _ga_*",
    type: "Analytique",
    purpose: "Mesure d'audience anonymisée (Google Analytics 4)",
    duration: "13 mois",
  },
  {
    name: "_fbp",
    type: "Marketing",
    purpose: "Suivi des conversions publicitaires Meta",
    duration: "90 jours",
  },
  {
    name: "ph_*",
    type: "Analytique",
    purpose: "Heatmaps et enregistrements de session anonymisés",
    duration: "12 mois",
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique cookies"
      description="Bazario utilise des cookies pour faire fonctionner le site, analyser son audience et personnaliser votre expérience. Vous gardez le contrôle à tout moment."
      lastUpdated="15 avril 2026"
      toc={TOC}
    >
      <h2 id="definition">1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre appareil lors de la consultation d'un site. Il permet de
        mémoriser des informations relatives à votre navigation, vos préférences ou votre identifiant de session.
      </p>

      <h2 id="types">2. Cookies utilisés</h2>
      <div className="not-prose my-4 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Nom</th>
              <th className="px-4 py-3 font-semibold">Catégorie</th>
              <th className="px-4 py-3 font-semibold">Finalité</th>
              <th className="px-4 py-3 font-semibold">Durée</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {COOKIES.map((c) => (
              <tr key={c.name} className="bg-background">
                <td className="px-4 py-3 font-mono text-xs text-foreground">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.purpose}</td>
                <td className="px-4 py-3 tabular-nums text-muted-foreground">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="duree">3. Durée de vie</h2>
      <p>
        Les cookies analytiques et marketing sont conservés au maximum 13 mois conformément aux recommandations de la
        CNIL. Au-delà, votre consentement vous sera redemandé.
      </p>

      <h2 id="gerer">4. Gérer vos préférences</h2>
      <p>
        Vous pouvez à tout moment modifier vos préférences en cliquant sur le bouton <strong>Gérer mes cookies</strong>{" "}
        dans le pied de page. Vous pouvez également configurer votre navigateur pour bloquer les cookies, étant entendu
        que cela peut altérer le bon fonctionnement du site.
      </p>
    </LegalPage>
  )
}
