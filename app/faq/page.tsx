import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MessageCircle, Truck, RefreshCw, Shield, User } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ — Toutes les réponses sur Bazario",
  description:
    "Commandes, livraison, retours, paiement, comptes : retrouvez toutes les réponses aux questions fréquentes sur Bazario.",
  alternates: { canonical: "/faq" },
}

type QA = { q: string; a: string }
type Section = {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  questions: QA[]
}

const SECTIONS: Section[] = [
  {
    id: "commandes",
    title: "Commandes",
    icon: User,
    description: "Passer commande, modifier ou suivre vos achats sur Bazario.",
    questions: [
      {
        q: "Comment passer une commande sur Bazario ?",
        a: "Ajoutez les produits souhaités à votre panier, cliquez sur le panier en haut à droite, vérifiez votre récapitulatif puis suivez le tunnel d'achat sécurisé. Vous recevez un e-mail de confirmation immédiat.",
      },
      {
        q: "Faut-il créer un compte pour commander ?",
        a: "Non. Vous pouvez commander en mode invité. Créer un compte vous permet de suivre vos commandes, de gérer vos retours et de profiter d'offres réservées aux membres.",
      },
      {
        q: "Puis-je modifier ou annuler une commande ?",
        a: "Tant que la commande n'a pas été expédiée, vous pouvez la modifier ou l'annuler depuis votre espace client. Une fois expédiée, vous bénéficiez de notre politique de retour 30 jours.",
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Dès l'expédition, vous recevez un e-mail avec le numéro de suivi et un lien direct vers le transporteur. Vous pouvez aussi suivre l'avancement dans votre espace client.",
      },
    ],
  },
  {
    id: "livraison",
    title: "Livraison",
    icon: Truck,
    description: "Délais, zones desservies et options de livraison.",
    questions: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Les délais varient selon le pays d'expédition du vendeur (affiché sur chaque fiche produit). En France, comptez 1 à 5 jours ouvrés. À l'international, 3 à 10 jours ouvrés. Tous les délais affichés sont contractuels et honorés.",
      },
      {
        q: "Quels sont les frais de livraison ?",
        a: "La livraison standard est offerte dès 50 € d'achat. En dessous, les frais sont calculés au panier en fonction du poids et de la destination. Les abonnés Bazario Premium bénéficient de la livraison gratuite illimitée.",
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Oui, Bazario livre dans plus de 90 pays via un réseau de vendeurs vérifiés. Les délais et frais sont calculés automatiquement au panier en fonction de votre adresse de livraison.",
      },
      {
        q: "Que se passe-t-il si je ne suis pas chez moi à la livraison ?",
        a: "Le transporteur vous laisse un avis de passage. Selon le service, vous pouvez reprogrammer la livraison, choisir un point relais ou récupérer le colis au bureau de poste pendant 14 jours.",
      },
      {
        q: "Que faire si mon colis est perdu ou abîmé ?",
        a: "Contactez-nous dans les 7 jours après la date de livraison prévue : nous lançons une enquête immédiate auprès du transporteur et vous proposons un renvoi ou un remboursement complet.",
      },
    ],
  },
  {
    id: "retours",
    title: "Retours et remboursements",
    icon: RefreshCw,
    description: "30 jours pour changer d'avis. Retours simples et remboursements rapides.",
    questions: [
      {
        q: "Quel est le délai de retour ?",
        a: "Vous disposez de 30 jours après la réception pour retourner un produit (14 jours minimum imposés par la loi européenne). Les abonnés Premium bénéficient de 60 jours.",
      },
      {
        q: "Comment faire un retour ?",
        a: "Depuis votre espace client, sélectionnez la commande puis « Retourner un article ». Imprimez l'étiquette prépayée fournie et déposez le colis en point relais. Le remboursement intervient sous 48 h après réception.",
      },
      {
        q: "Le retour est-il gratuit ?",
        a: "Oui, les retours sont gratuits en France métropolitaine et en Belgique. À l'international, des frais de retour peuvent s'appliquer en fonction du transporteur (clairement affichés au moment de la demande).",
      },
      {
        q: "Quels produits ne peuvent pas être retournés ?",
        a: "Pour des raisons d'hygiène ou de personnalisation, certains produits ne peuvent pas être retournés (cosmétiques ouverts, alimentation, produits sur-mesure). C'est toujours indiqué sur la fiche produit.",
      },
      {
        q: "Quand suis-je remboursé ?",
        a: "Le remboursement est déclenché dans les 48 h après réception du retour. Selon votre banque, le crédit apparaît sur votre compte sous 3 à 5 jours ouvrés.",
      },
    ],
  },
  {
    id: "paiement",
    title: "Paiement et sécurité",
    icon: Shield,
    description: "Moyens de paiement acceptés et garanties de sécurité.",
    questions: [
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Carte bancaire (Visa, Mastercard, Amex), Apple Pay, Google Pay, PayPal, et paiement en 3 ou 4 fois sans frais via Klarna et Alma à partir de 100 €.",
      },
      {
        q: "Mes paiements sont-ils sécurisés ?",
        a: "Toutes les transactions sont chiffrées (TLS 1.3) et traitées via Stripe, certifié PCI-DSS Niveau 1. Bazario ne stocke jamais vos données bancaires. L'authentification 3D Secure est systématiquement appliquée.",
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Oui, en 3x ou 4x sans frais via Klarna et Alma à partir de 100 € d'achat. La répartition s'affiche directement au moment de payer.",
      },
      {
        q: "Pourquoi mon paiement a-t-il été refusé ?",
        a: "Cela peut être dû à la 3D Secure, à un plafond bancaire ou à un solde insuffisant. Vérifiez avec votre banque ou essayez un autre moyen de paiement. Aucun débit n'est effectué tant que la commande n'est pas confirmée.",
      },
    ],
  },
  {
    id: "compte",
    title: "Compte et données",
    icon: User,
    description: "Gestion de votre compte, de vos données personnelles et confidentialité.",
    questions: [
      {
        q: "Comment créer un compte ?",
        a: "Cliquez sur « Connexion » en haut à droite, puis sur « Créer un compte ». Vous pouvez vous inscrire avec votre e-mail ou via Google en moins de 30 secondes.",
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Sur la page de connexion, cliquez sur « Mot de passe oublié ». Vous recevez un lien sécurisé pour définir un nouveau mot de passe valable 1 heure.",
      },
      {
        q: "Comment supprimer mon compte ?",
        a: "Depuis votre espace client, allez dans « Paramètres → Confidentialité → Supprimer mon compte ». La suppression est définitive sous 30 jours, conformément au RGPD.",
      },
      {
        q: "Mes données personnelles sont-elles protégées ?",
        a: "Oui. Bazario applique strictement le RGPD : données chiffrées, jamais revendues, et accessibles à tout moment depuis votre espace client. Notre politique complète est disponible sur la page Confidentialité.",
      },
    ],
  },
  {
    id: "vendeurs",
    title: "Vendre sur Bazario",
    icon: MessageCircle,
    description: "Devenez vendeur partenaire et accédez à des millions d'acheteurs.",
    questions: [
      {
        q: "Comment vendre sur Bazario ?",
        a: "Rendez-vous sur /sell pour découvrir les conditions et démarrer votre boutique en quelques minutes. Notre équipe vous accompagne sur toute l'onboarding, la mise en ligne du catalogue et la logistique.",
      },
      {
        q: "Quels sont les frais pour les vendeurs ?",
        a: "Aucun frais d'inscription. Une commission unique de 8 à 12 % par vente (selon la catégorie) qui inclut le paiement, la protection acheteur et la mise en avant produit. Aucun engagement, désactivable à tout moment.",
      },
      {
        q: "Combien de temps pour être validé en tant que vendeur ?",
        a: "Notre équipe étudie chaque dossier sous 48 h ouvrées. Vous êtes notifié(e) par e-mail dès la validation et pouvez immédiatement commencer à vendre.",
      },
    ],
  },
]

export default function FAQPage() {
  // FAQPage Schema.org JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SECTIONS.flatMap((s) =>
      s.questions.map((qa) => ({
        "@type": "Question",
        name: qa.q,
        acceptedAnswer: { "@type": "Answer", text: qa.a },
      })),
    ),
  }

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.bazario-official.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.bazario-official.com/faq" },
    ],
  }

  return (
    <div className="bg-secondary/30">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <header className="border-b bg-card">
        <div className="container py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Centre d&apos;aide</p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
            Foire aux questions
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground md:text-lg">
            Toutes les réponses aux questions les plus fréquentes sur Bazario : commandes, livraison,
            retours, paiement et plus encore. Notre équipe support est aussi disponible 7j/7.
          </p>
        </div>
      </header>

      <div className="container grid gap-10 py-12 md:grid-cols-[260px_1fr] md:py-16">
        {/* Sticky table of contents */}
        <aside className="md:sticky md:top-24 md:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sections
          </p>
          <nav>
            <ul className="space-y-1">
              {SECTIONS.map((s) => {
                const Icon = s.icon
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {s.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="mt-8 rounded-2xl border bg-card p-5 shadow-sm">
            <p className="font-semibold">Pas de réponse ?</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Notre équipe répond en moins d&apos;une heure du lundi au samedi.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background transition hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              Contacter le support
            </Link>
          </div>
        </aside>

        {/* Sections */}
        <div className="space-y-12">
          {SECTIONS.map((s) => {
            const Icon = s.icon
            return (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <header className="mb-6 flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {s.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </header>

                <ul className="divide-y rounded-2xl border bg-card shadow-sm">
                  {s.questions.map((qa, i) => (
                    <li key={i}>
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 transition hover:bg-secondary/30 sm:p-6">
                          <span className="text-pretty text-base font-semibold leading-snug">
                            {qa.q}
                          </span>
                          <span
                            aria-hidden
                            className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <p className="text-pretty leading-relaxed text-muted-foreground">
                            {qa.a}
                          </p>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
