import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Politique de confidentialité — Bazario",
  description:
    "Comment Bazario collecte, utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).",
}

const TOC = [
  { id: "responsable", label: "Responsable du traitement" },
  { id: "donnees", label: "Données collectées" },
  { id: "finalites", label: "Finalités" },
  { id: "bases", label: "Bases légales" },
  { id: "duree", label: "Durée de conservation" },
  { id: "destinataires", label: "Destinataires" },
  { id: "droits", label: "Vos droits" },
  { id: "securite", label: "Sécurité" },
  { id: "contact", label: "Contact DPO" },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      description="Bazario s'engage à protéger vos données personnelles dans le respect du Règlement Général sur la Protection des Données (RGPD) et de la loi Informatique et Libertés."
      lastUpdated="15 avril 2026"
      toc={TOC}
    >
      <h2 id="responsable">1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est <strong>Bazario SAS</strong>, immatriculée au RCS de Paris, dont le
        siège social est situé 12 rue de la République, 75001 Paris, France.
      </p>

      <h2 id="donnees">2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires au bon fonctionnement de notre service :</p>
      <ul>
        <li>
          <strong>Données d'identification</strong> : nom, prénom, e-mail, téléphone, adresse postale
        </li>
        <li>
          <strong>Données de commande</strong> : produits achetés, montants, historique
        </li>
        <li>
          <strong>Données de paiement</strong> : tokenisées via Stripe, jamais stockées en clair
        </li>
        <li>
          <strong>Données de navigation</strong> : pages visitées, préférences, cookies
        </li>
      </ul>

      <h2 id="finalites">3. Finalités</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Traiter et expédier vos commandes</li>
        <li>Gérer votre compte et nos relations commerciales</li>
        <li>Vous adresser nos communications marketing si vous y avez consenti</li>
        <li>Améliorer nos services et personnaliser votre expérience</li>
        <li>Prévenir la fraude et respecter nos obligations légales</li>
      </ul>

      <h2 id="bases">4. Bases légales</h2>
      <p>
        Le traitement de vos données repose sur l'exécution du contrat de vente, votre consentement (newsletter, cookies
        analytiques), notre intérêt légitime (sécurité, prévention de la fraude) et le respect d'obligations légales
        (facturation, comptabilité).
      </p>

      <h2 id="duree">5. Durée de conservation</h2>
      <ul>
        <li>Données client actif : pendant toute la durée de la relation contractuelle</li>
        <li>Données de commande : 10 ans (obligation comptable)</li>
        <li>Données prospect : 3 ans à compter du dernier contact</li>
        <li>Cookies : 13 mois maximum</li>
      </ul>

      <h2 id="destinataires">6. Destinataires</h2>
      <p>
        Vos données peuvent être transmises à nos vendeurs partenaires (uniquement les informations nécessaires à la
        livraison), à nos prestataires techniques (hébergement, paiement, e-mailing) et aux autorités compétentes en
        cas d'obligation légale. Nous ne vendons jamais vos données à des tiers.
      </p>

      <h2 id="droits">7. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d'accès, de rectification et d'effacement</li>
        <li>Droit à la limitation et à l'opposition au traitement</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit de retirer votre consentement à tout moment</li>
        <li>Droit d'introduire une réclamation auprès de la CNIL</li>
      </ul>

      <h2 id="securite">8. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles strictes pour protéger vos données :
        chiffrement TLS, hashing bcrypt, authentification à deux facteurs, audits de sécurité réguliers, accès restreint
        aux seules personnes habilitées.
      </p>

      <h2 id="contact">9. Contact DPO</h2>
      <p>
        Pour toute question relative à vos données personnelles, contactez notre Délégué à la Protection des Données :{" "}
        <a href="mailto:dpo@bazario.com">dpo@bazario.com</a>.
      </p>
    </LegalPage>
  )
}
