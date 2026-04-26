import Link from "next/link"
import { Check, Truck, Zap, ShieldCheck, Headphones, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Bazario Premium — Livraison illimitée et avantages exclusifs",
  description:
    "Profitez de la livraison gratuite illimitée, de ventes flash en avant-première, d'un service client prioritaire et bien plus avec Bazario Premium.",
}

const PERKS = [
  {
    icon: Truck,
    title: "Livraison gratuite illimitée",
    desc: "Sur des millions de produits éligibles, dès 1€ d'achat, dans plus de 30 pays.",
  },
  {
    icon: Zap,
    title: "Ventes flash en avant-première",
    desc: "Accès 24h avant tout le monde aux meilleures offres et drops exclusifs.",
  },
  {
    icon: Gift,
    title: "Doublez vos Bazario Coins",
    desc: "2 % de cashback automatique sur chaque commande, contre 1 % sans Premium.",
  },
  {
    icon: Headphones,
    title: "Service client prioritaire 24/7",
    desc: "Une ligne dédiée, multilingue, avec un délai de réponse garanti sous 5 minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Protection acheteur étendue",
    desc: "Retours étendus à 90 jours, remboursement express, garantie casse jusqu'à 500€.",
  },
  {
    icon: Sparkles,
    title: "Recommandations IA personnalisées",
    desc: "Un fil d'inspirations sur-mesure mis à jour chaque semaine selon votre style.",
  },
]

const PLANS = [
  {
    name: "Mensuel",
    price: 9.99,
    period: "/mois",
    note: "Sans engagement, résiliable en 1 clic",
    cta: "Démarrer 30 jours gratuits",
    highlight: false,
  },
  {
    name: "Annuel",
    price: 79,
    period: "/an",
    note: "Soit 6,58€/mois — économie de 41€",
    cta: "Choisir l'annuel",
    highlight: true,
    badge: "Le plus populaire",
  },
  {
    name: "Étudiant",
    price: 4.99,
    period: "/mois",
    note: "Sur justificatif scolaire valide",
    cta: "Vérifier mon statut",
    highlight: false,
  },
]

const FAQ = [
  {
    q: "Puis-je résilier à tout moment ?",
    a: "Oui, vous pouvez annuler votre abonnement Premium à tout moment depuis votre compte. Aucun frais ne sera prélevé pour la période suivante.",
  },
  {
    q: "Premium fonctionne dans tous les pays ?",
    a: "Premium est disponible dans 30+ pays (France, UE, UK, US, Canada, Japon, Australie...). Les avantages livraison s'appliquent uniquement aux produits éligibles signalés par un badge Premium.",
  },
  {
    q: "Que se passe-t-il après les 30 jours d'essai ?",
    a: "Vous serez automatiquement basculé en abonnement payant au tarif choisi. Vous recevrez un e-mail 3 jours avant la fin de l'essai pour vous le rappeler.",
  },
  {
    q: "Puis-je partager Premium avec ma famille ?",
    a: "Oui, l'offre annuelle inclut Bazario Family : jusqu'à 4 membres adultes peuvent profiter des avantages avec leur propre compte, sans surcoût.",
  },
]

export default function PremiumPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(249,115,22,0.35), transparent 50%), radial-gradient(circle at 85% 70%, rgba(59,91,219,0.5), transparent 50%)",
          }}
        />
        <div className="container relative mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="default" className="border-accent/40 bg-accent/20 text-accent-foreground">
              <Sparkles className="mr-1 h-3 w-3" /> Bazario Premium
            </Badge>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
              Achetez plus malin. Recevez plus vite. Économisez plus.
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 text-pretty">
              Livraison gratuite illimitée, ventes en avant-première, double cashback, service prioritaire 24/7.
              Tout ce qu&apos;il faut pour faire de chaque achat un moment privilégié.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#plans">Démarrer mes 30 jours gratuits</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="#perks">Voir les avantages</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-primary-foreground/60">
              Aucune carte requise pour l&apos;essai. Sans engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section id="perks" className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tout est inclus dans Premium
          </h2>
          <p className="mt-3 text-muted-foreground">
            Six avantages réels qui se rentabilisent dès le 3<sup>e</sup> achat du mois.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-2xl border bg-card p-6 transition hover:border-primary/30 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Choisissez votre formule</h2>
            <p className="mt-3 text-muted-foreground">Annulable à tout moment. Premier mois offert.</p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={
                  p.highlight
                    ? "relative flex flex-col rounded-2xl border-2 border-primary bg-background p-7 shadow-lg"
                    : "flex flex-col rounded-2xl border bg-background p-7"
                }
              >
                {p.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                    {p.badge}
                  </Badge>
                )}
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{p.price}€</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Livraison gratuite illimitée",
                    "Ventes flash en avant-première",
                    "Double Bazario Coins",
                    "Service client prioritaire",
                    "Protection acheteur 90 jours",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-7 h-11 w-full" variant={p.highlight ? "default" : "outline"}>
                  {p.cta}
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">
            TVA incluse. Tarifs convertis automatiquement dans votre devise locale.
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          <Stat value="2,4M" label="membres Premium dans le monde" />
          <Stat value="83€" label="d'économies moyennes par mois" />
          <Stat value="4,9/5" label="note moyenne sur Trustpilot" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight">Questions fréquentes</h2>
          </div>
          <div className="mx-auto max-w-3xl divide-y divide-border rounded-2xl border bg-background">
            {FAQ.map((f, i) => (
              <details key={i} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between text-left font-medium">
                  <span>{f.q}</span>
                  <span className="ml-4 text-muted-foreground transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-primary p-10 text-center text-primary-foreground sm:p-14">
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-balance">
            Prêt à passer Premium ?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            30 jours offerts. Annulez quand vous voulez.
          </p>
          <Button asChild size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Démarrer mon essai gratuit</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-5xl font-bold text-primary">{value}</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
