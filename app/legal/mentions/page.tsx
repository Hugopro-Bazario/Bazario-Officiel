import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Mentions légales — Bazario",
  description: "Mentions légales et informations sur l'éditeur de la marketplace Bazario.",
}

const TOC = [
  { id: "editeur", label: "Éditeur" },
  { id: "directeur", label: "Directeur de publication" },
  { id: "hebergeur", label: "Hébergeur" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "credits", label: "Crédits" },
]

export default function MentionsPage() {
  return (
    <LegalPage
      title="Mentions légales"
      description="Informations relatives à l'éditeur et à l'hébergeur du site bazario.com, conformément à l'article 6 de la loi pour la confiance dans l'économie numérique."
      lastUpdated="15 avril 2026"
      toc={TOC}
    >
      <h2 id="editeur">1. Éditeur</h2>
      <p>
        <strong>Bazario SAS</strong>
        <br />
        Société par Actions Simplifiée au capital de 100 000 €
        <br />
        Siège social : 12 rue de la République, 75001 Paris, France
        <br />
        RCS Paris 912 345 678 — TVA intracommunautaire : FR12912345678
        <br />
        Téléphone : +33 1 23 45 67 89 — E-mail :{" "}
        <a href="mailto:contact@bazario.com">contact@bazario.com</a>
      </p>

      <h2 id="directeur">2. Directeur de publication</h2>
      <p>Hugo Pro, Président de Bazario SAS.</p>

      <h2 id="hebergeur">3. Hébergeur</h2>
      <p>
        <strong>Vercel Inc.</strong>
        <br />
        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
        <br />
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
      </p>

      <h2 id="propriete">4. Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur le site (textes, images, logos, charte graphique, logiciels) sont la
        propriété exclusive de Bazario SAS ou de ses partenaires et sont protégés par le droit d'auteur. Toute
        reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite
        préalable, est strictement interdite.
      </p>

      <h2 id="credits">5. Crédits</h2>
      <p>
        Conception et développement : équipe Bazario.
        <br />
        Design system : Bazario Design.
        <br />
        Photographies produits : vendeurs partenaires et photothèque Bazario.
      </p>
    </LegalPage>
  )
}
