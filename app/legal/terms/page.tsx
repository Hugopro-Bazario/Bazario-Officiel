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
  { id: "livraison", label: "Livraison numérique" },
  { id: "retractation", label: "Droit de rétractation" },
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
        Bazario édite une place de marché en ligne mettant en relation des créateurs indépendants et des clients pour la
        vente de <strong>produits et services numériques</strong> (agents IA, prompts, modèles/templates, formations,
        logiciels, fichiers audio et visuels, automatisations). Les présentes Conditions Générales de Vente (CGV) ont
        pour objet de définir les modalités de vente applicables aux contenus numériques proposés sur la plateforme.
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
        produits commandés et les prix. Les produits étant numériques, aucune adresse de livraison physique n'est
        requise : les accès et fichiers sont mis à disposition dans l'espace client et par e-mail.
      </p>

      <h2 id="prix">4. Prix et paiement</h2>
      <p>
        Les prix sont indiqués en euros toutes taxes comprises (TTC). Bazario se réserve le droit de modifier ses prix
        à tout moment ; les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de
        la commande. Le paiement s'effectue par carte bancaire via notre prestataire Stripe, ou par tout autre moyen
        proposé sur la plateforme.
      </p>

      <h2 id="livraison">5. Livraison numérique</h2>
      <p>
        Les produits sont des contenus numériques fournis sans support matériel. La livraison est{" "}
        <strong>instantanée et gratuite</strong> : dès la validation du paiement, les accès, licences et liens de
        téléchargement sont disponibles dans l'espace client et envoyés à l'adresse e-mail renseignée. Le client est
        responsable de la conservation de ses fichiers téléchargés. Les mises à jour annoncées sur la fiche produit sont
        mises à disposition dans le même espace.
      </p>

      <h2 id="retractation">6. Droit de rétractation</h2>
      <p>
        Conformément à l'article <strong>L221-28 13°</strong> du Code de la consommation, le droit de rétractation ne
        peut être exercé pour la fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a
        commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation. En
        finalisant une commande à livraison immédiate, le client demande l'exécution immédiate et reconnaît{" "}
        <strong>perdre son droit de rétractation</strong> une fois le téléchargement ou l'accès commencé.
      </p>
      <p>
        Indépendamment de ce cadre légal, Bazario applique une <strong>garantie commerciale « satisfait ou remboursé »
        de 14 jours</strong> : si un produit ne correspond pas substantiellement à sa description, le client peut en
        demander le remboursement à <a href="mailto:support@bazario.com">support@bazario.com</a>. Le remboursement est
        traité sous 14 jours via le moyen de paiement initial.
      </p>

      <h2 id="garanties">7. Garanties et licences</h2>
      <p>
        Les contenus numériques bénéficient de la garantie légale de conformité applicable (articles L224-25-1 et
        suivants du Code de la consommation), incluant la conformité des mises à jour nécessaires. Chaque produit
        précise la licence d'utilisation accordée (personnelle, commerciale ou agence) ; le client s'engage à en
        respecter les termes. La revente ou la redistribution d'un contenu hors des droits accordés est interdite.
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
