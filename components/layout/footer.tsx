import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import {
  Globe,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"

const COL_DECOUVRIR = [
  { label: "À propos de Bazario", href: "/about" },
  { label: "Carrières", href: "/careers" },
  { label: "Salle de presse", href: "/press" },
  { label: "Le Mag Bazario", href: "/blog" },
  { label: "Bazario Premium", href: "/premium" },
  { label: "Bazario Coins", href: "/account/coins" },
]

const COL_AIDE = [
  { label: "Centre d'aide", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Suivi de commande", href: "/account/orders" },
  { label: "Retours & remboursements", href: "/faq#retours" },
  { label: "Paiement & sécurité", href: "/faq#paiement" },
  { label: "Modes de livraison", href: "/faq#livraison" },
  { label: "Nous contacter", href: "/contact" },
]

const COL_VENDRE = [
  { label: "Devenir vendeur", href: "/sell" },
  { label: "Centre vendeur", href: "/seller/dashboard" },
  { label: "Bazario Fulfillment", href: "/sell" },
  { label: "Outils & API", href: "/sell" },
  { label: "Académie vendeurs", href: "/sell" },
  { label: "Tarifs & commissions", href: "/sell" },
]

const COL_LEGAL = [
  { label: "Conditions générales", href: "/legal/terms" },
  { label: "Politique de confidentialité", href: "/legal/privacy" },
  { label: "Politique cookies", href: "/legal/cookies" },
  { label: "Mentions légales", href: "/legal/mentions" },
  { label: "Signaler un produit", href: "/help" },
]

const SOCIAL = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter / X" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
]

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"]

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-secondary/40">
      {/* Trust bar */}
      <div className="border-b bg-background">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          <TrustItem
            icon={Truck}
            title="Livraison rapide"
            desc="Suivi en temps réel, gratuite dès 49 €"
          />
          <TrustItem
            icon={RefreshCw}
            title="Retour 30 jours"
            desc="Sans question, remboursement intégral"
          />
          <TrustItem
            icon={Shield}
            title="Garantie acheteur"
            desc="Vous êtes 100% protégé en cas de litige"
          />
          <TrustItem
            icon={CreditCard}
            title="Paiement sécurisé"
            desc="Stripe, 3D Secure, Apple/Google Pay"
          />
        </div>
      </div>

      {/* Links */}
      <div className="container grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            La marketplace mondiale qui connecte 8 000 vendeurs vérifiés et 12 millions
            d&apos;acheteurs dans 47 pays. Tout, mieux, partout.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-xs font-medium hover:border-primary hover:bg-primary/5">
              <Globe className="h-3.5 w-3.5" />
              France · FR · EUR
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Suivez-nous
            </p>
            <ul className="mt-3 flex gap-2">
              {SOCIAL.map(({ Icon, href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
          <FooterColumn title="Découvrir" items={COL_DECOUVRIR} />
          <FooterColumn title="Aide" items={COL_AIDE} />
          <FooterColumn title="Vendre" items={COL_VENDRE} />
          <FooterColumn title="Légal" items={COL_LEGAL} />
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="container flex flex-col items-start justify-between gap-4 py-6 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Bazario SAS. Tous droits réservés ·{" "}
              <span className="font-medium">Bazario®</span> est une marque déposée.
            </p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("bazario:open-cookies"))
                }
              }}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Gérer mes cookies
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="inline-flex h-7 items-center rounded-md border bg-card px-2.5 text-[11px] font-semibold text-muted-foreground"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TrustItem({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
