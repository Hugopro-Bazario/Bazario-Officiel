import Link from "next/link"
import { Search, Package, RotateCcw, CreditCard, ShieldCheck, Store, MessageSquare, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata = { title: "Centre d'aide Bazario" }

const TOPICS = [
  { icon: Package, title: "Suivi de commande", desc: "Localisez et tracez vos colis", href: "/account/orders" },
  { icon: RotateCcw, title: "Retours & remboursements", desc: "Politique de retour 30 jours", href: "#returns" },
  { icon: CreditCard, title: "Paiement & facturation", desc: "Modes de paiement, factures, devises", href: "#payment" },
  { icon: ShieldCheck, title: "Sécurité du compte", desc: "Mot de passe, double authentification", href: "#security" },
  { icon: Store, title: "Vendeurs & boutiques", desc: "Devenir vendeur, gérer vos ventes", href: "/sell" },
  { icon: MessageSquare, title: "Contacter un vendeur", desc: "Posez vos questions avant achat", href: "/account/messages" },
]

const FAQ = [
  {
    q: "Combien de temps prend la livraison ?",
    a: "Cela dépend du vendeur et du pays d'expédition. Les délais estimés sont indiqués sur chaque fiche produit. En moyenne : 2-4 jours pour la France métropolitaine, 5-10 jours pour l'international.",
  },
  {
    q: "Puis-je retourner un produit ?",
    a: "Oui, vous avez 30 jours après réception pour retourner un produit non conforme ou qui ne vous convient pas. Le retour est gratuit sur tous les produits éligibles (badge Retour gratuit).",
  },
  {
    q: "Comment annuler une commande ?",
    a: "Vous pouvez annuler votre commande tant qu'elle n'a pas été expédiée par le vendeur. Rendez-vous dans Mon compte → Commandes → Annuler. Une fois expédiée, vous pourrez la retourner après réception.",
  },
  {
    q: "Mon paiement est-il sécurisé ?",
    a: "Oui. Bazario utilise Stripe, leader mondial du paiement en ligne, avec chiffrement TLS et 3D Secure systématique. Aucune information bancaire n'est stockée sur nos serveurs.",
  },
  {
    q: "Comment contacter un vendeur ?",
    a: "Depuis chaque fiche produit, cliquez sur Contacter le vendeur. Toutes les conversations passent par la messagerie sécurisée Bazario, jamais par e-mail externe.",
  },
  {
    q: "Que se passe-t-il en cas de litige ?",
    a: "La Protection acheteur Bazario vous couvre : si un produit n'arrive jamais ou n'est pas conforme, vous pouvez ouvrir un litige sous 60 jours. Notre équipe médie sous 48 h et vous rembourse intégralement si le vendeur est en tort.",
  },
]

export default function HelpPage() {
  return (
    <div>
      {/* Hero search */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Comment pouvons-nous vous aider ?</h1>
          <p className="mt-3 text-muted-foreground">Trouvez instantanément la réponse à votre question.</p>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tapez votre question..."
              className="h-14 rounded-2xl border-border bg-background pl-12 pr-4 text-base shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Topics grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 font-display text-2xl font-bold">Sujets populaires</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.title}
                href={t.href}
                className="group flex items-start gap-4 rounded-2xl border bg-card p-5 transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center font-display text-2xl font-bold">Questions fréquentes</h2>
          <div className="divide-y divide-border rounded-2xl border bg-background">
            {FAQ.map((f, i) => (
              <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-left font-medium">
                  <span>{f.q}</span>
                  <span className="ml-4 text-2xl font-light text-muted-foreground transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold">Toujours pas de réponse ?</h2>
          <p className="mt-2 text-muted-foreground">Notre équipe support est disponible 24/7 dans 8 langues.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <ContactCard icon={MessageSquare} title="Chat en direct" desc="Réponse en moins de 5 min" cta="Démarrer" />
            <ContactCard icon={Mail} title="E-mail" desc="support@bazario.com" cta="Envoyer un message" />
            <ContactCard icon={Phone} title="Téléphone" desc="Premium uniquement · 24/7" cta="Voir le numéro" />
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactCard({
  icon: Icon,
  title,
  desc,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  cta: string
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <Button variant="outline" size="sm" className="mt-4">
        {cta}
      </Button>
    </div>
  )
}
