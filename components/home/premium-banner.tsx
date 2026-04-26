import Link from "next/link"
import { Crown, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

const PERKS = [
  { icon: Truck, label: "Livraison gratuite illimitée" },
  { icon: Shield, label: "Garantie étendue 2 ans" },
  { icon: Headphones, label: "Support prioritaire 24/7" },
]

export function PremiumBanner() {
  return (
    <section className="container py-10">
      <div className="relative overflow-hidden rounded-2xl bg-foreground text-background">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              <Crown className="h-3.5 w-3.5" />
              BAZARIO PREMIUM
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Achetez plus, dépensez moins.
            </h2>
            <p className="mt-3 max-w-lg text-base text-background/70">
              5,99 € / mois. Livraison gratuite illimitée, accès anticipé aux ventes flash
              et offres exclusives chez 8 000+ vendeurs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/premium">Essayer 30 jours gratuits</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <Link href="/premium">En savoir plus</Link>
              </Button>
            </div>
          </div>

          <ul className="space-y-3">
            {PERKS.map((perk) => (
              <li
                key={perk.label}
                className="flex items-center gap-3 rounded-lg border border-background/10 bg-background/5 p-4 backdrop-blur"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <perk.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">{perk.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
