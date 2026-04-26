import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import { Globe, Shield, Truck, RefreshCw, CreditCard } from "lucide-react"

const COL_DECOUVRIR = [
  { label: "À propos", href: "/about" },
  { label: "Carrières", href: "/careers" },
  { label: "Presse", href: "/press" },
  { label: "Blog Bazario", href: "/blog" },
  { label: "Bazario Premium", href: "/premium" },
]

const COL_AIDE = [
  { label: "Centre d'aide", href: "/help" },
  { label: "Suivi de commande", href: "/account" },
  { label: "Retours & remboursements", href: "/help/returns" },
  { label: "Paiement & sécurité", href: "/help/payment" },
  { label: "Nous contacter", href: "/help/contact" },
]

const COL_VENDRE = [
  { label: "Devenir vendeur", href: "/seller/dashboard" },
  { label: "Tableau de bord", href: "/seller/dashboard" },
  { label: "Bazario Fulfillment", href: "/seller/fulfillment" },
  { label: "Outils & API", href: "/seller/api" },
  { label: "Académie vendeurs", href: "/seller/academy" },
]

const COL_LEGAL = [
  { label: "Conditions générales", href: "/legal/terms" },
  { label: "Politique de confidentialité", href: "/legal/privacy" },
  { label: "Cookies", href: "/legal/cookies" },
  { label: "Mentions légales", href: "/legal/notices" },
  { label: "RGPD", href: "/legal/gdpr" },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary/40">
      {/* Trust bar */}
      <div className="border-b">
        <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          <div className="flex items-start gap-3">
            <Truck className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Livraison rapide</p>
              <p className="text-xs text-muted-foreground">Suivi en temps réel, gratuite dès 49 €</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Retour 30 jours</p>
              <p className="text-xs text-muted-foreground">Sans poser de questions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Garantie acheteur</p>
              <p className="text-xs text-muted-foreground">Remboursement intégral en cas de litige</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">Paiement sécurisé</p>
              <p className="text-xs text-muted-foreground">Stripe, 3D Secure, Apple/Google Pay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container grid gap-8 py-12 md:grid-cols-5">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            La marketplace mondiale qui connecte acheteurs et vendeurs de confiance — partout, mieux.
          </p>
          <button className="mt-4 inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-xs hover:bg-muted">
            <Globe className="h-3.5 w-3.5" />
            France · FR · EUR
          </button>
        </div>

        <FooterColumn title="Découvrir" items={COL_DECOUVRIR} />
        <FooterColumn title="Aide" items={COL_AIDE} />
        <FooterColumn title="Vendre" items={COL_VENDRE} />
        <FooterColumn title="Légal" items={COL_LEGAL} />
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Bazario. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Disponible en 47 pays</span>
            <span>·</span>
            <span>4,9 / 5 sur 280 000 avis vérifiés</span>
            <span>·</span>
            <span>Bazario® est une marque déposée</span>
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
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
