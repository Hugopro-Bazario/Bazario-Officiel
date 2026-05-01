import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Conditions générales de vente — Bazario",
  description:
    "Conditions générales de vente et d'utilisation applicables à la marketplace Bazario : commandes, paiement, livraison, retours et responsabilités.",
}

const TOC = [
  { id: "objet", label: "Objet" },
  { id: "comptes", label: "Comptes utilisateurs" },
  { id: "commandes", label: "Commandes" },
  { id: "prix", label: "Prix et paiement" },
  { id: "livraison", label: "Livraison" },
  { id: "retours", label: "Retours et remboursements" },
  { id: "garanties", label: "Garanties" },
  { id: "responsabilite", label: "Responsabilité" },
  { id: "litiges", label: "Litiges" },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      description="Les présentes CGV régissent les relations contractuelles entre Bazario, ses vendeurs partenaires et ses clients dans le cadre des achats réalisés sur la marketplace."
      lastUpdated="15 avril 2026"
      toc={TOC}
    >
      <h2 id="objet">1. Objet</h2>
      <p>
        Bazario édite une place de marché en ligne mettant en relation des vendeurs professionnels indépendants et des
        clients. Les présentes Conditions Générales de Vente (CGV) ont pour objet de définir les modalités de vente
        applicables aux produits proposés sur la plateforme.
      </p>

      <h2 id="comptes">2. Comptes utilisateurs</h2>
      <p>
        La création d'un compte est nécessaire pour finaliser une commande. L'utilisateur s'engage à fournir des
        informations exactes et à les maintenir à jour. Les identifiants de connexion sont strictement personnels et
        confidentiels. Bazario ne pourra être tenue responsable d'une utilisation frauduleuse résultant d'un défaut de
        sécurité du fait du client.
      </p>

      <h2 id="commandes">3. Commandes</h2>
      <p>
        Toute commande validée par le client vaut acceptation des présentes CGV ainsi que du prix et de la description
        des produits proposés. Bazario adresse au client une confirmation de commande par e-mail récapitulant les
        produits commandés, les prix, les frais de livraison et l'adresse de livraison.
      </p>

      <h2 id="prix">4. Prix et paiement</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises (TTC). Bazario se réserve le droit de modifier ses prix
        à tout moment ; les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de
        la commande. Le paiement s'effectue par carte bancaire via notre prestataire Stripe, ou par tout autre moyen
        proposé sur la plateforme.
      </p>

      <h2 id="livraison">5. Livraison</h2>
      <p>
        Les produits sont expédiés à l'adresse de livraison renseignée lors de la commande. Les délais indicatifs
        figurent sur chaque fiche produit. La livraison est gratuite à partir de 49 € d'achat (hors objets volumineux).
        En cas de retard de livraison supérieur à 7 jours ouvrés, le client peut demander la résolution de la commande
        et le remboursement intégral.
      </p>

      <h2 id="retours">6. Retours et remboursements</h2>
      <p>
        Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un délai de{" "}
        <strong>30 jours</strong> à compter de la réception du produit pour exercer son droit de rétractation, sans
        avoir à justifier de motif. Les produits doivent être renvoyés dans leur emballage d'origine, accompagnés du
        bordereau de retour. Le remboursement est effectué dans un délai de 14 jours à réception du produit.
      </p>

      <h2 id="garanties">7. Garanties</h2>
      <p>
        Les produits vendus sur Bazario bénéficient de la garantie légale de conformité (2 ans) et de la garantie
        contre les vices cachés. Les produits Premium bénéficient en outre d'une garantie commerciale étendue offerte
        par les vendeurs partenaires.
      </p>

      <h2 id="responsabilite">8. Responsabilité</h2>
      <p>
        Bazario agit en qualité d'intermédiaire entre le vendeur et l'acheteur. La responsabilité contractuelle de
        Bazario ne pourra être engagée que pour les prestations directement fournies par la plateforme (paiement,
        relation client, mise en relation). Pour les obligations relatives à la qualité et à la conformité des
        produits, la responsabilité incombe au vendeur partenaire.
      </p>

      <h2 id="litiges">9. Litiges et droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, le client est invité à contacter le
        service client Bazario à l'adresse <a href="mailto:support@bazario.com">support@bazario.com</a>. À défaut de
        résolution amiable, le client peut recourir gratuitement à la plateforme européenne de règlement en ligne des
        litiges (RLL) ou saisir un médiateur de la consommation.
      </p>
    </LegalPage>
  )
}
