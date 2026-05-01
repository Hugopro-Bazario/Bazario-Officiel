import Link from "next/link"
import {
  Crown,
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const PERKS = [
  { icon: Truck, label: "Livraison gratuite illimitée", detail: "Sans seuil minimum" },
  { icon: Zap, label: "Accès anticipé aux ventes flash", detail: "24h avant tout le monde" },
  { icon: ShieldCheck, label: "Garantie étendue 2 ans", detail: "Sur tous vos achats" },
  { icon: Headphones, label: "Support prioritaire 24/7", detail: "Conseiller dédié" },
]

export function PremiumBanner() {
  return (
    <section className="container py-12 lg:py-16">
      <div className="relative isolate overflow-hidden rounded-3xl bg-foreground text-background">
        {/* Decorative blurs */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/30 blur-3xl" aria-hidden />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" aria-hidden />
        <div className="bg-grain absolute inset-0 opacity-50 mix-blend-overlay" aria-hidden />

        <div className="relative grid gap-10 p-8 md:grid-cols-5 md:items-center md:gap-12 md:p-12 lg:p-16">
          {/* Left side */}
          <div className="md:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <Crown className="h-3.5 w-3.5" />
              Bazario Premium
            </span>

            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Achetez plus,
              <br />
              dépensez <span className="text-accent">moins</span>.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75">
              Pour 5,99 € / mois, débloquez la livraison gratuite illimitée, l&apos;accès
              prioritaire aux ventes flash et un support 24/7. Économies moyennes&nbsp;:
              <span className="font-semibold text-background"> 142 € / an</span>.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="xl" className="shadow-lg">
                <Link href="/premium">
                  Essayer 30 jours gratuits
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-background/25 bg-background/5 text-background backdrop-blur hover:bg-background/15 hover:text-background"
              >
                <Link href="/premium">Comparer les plans</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-background/70">
              <div className="inline-flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="font-semibold text-background">4,9 / 5</span>
              </div>
              <span>· 38 200 membres en France</span>
              <span>· Annulation en 1 clic</span>
            </div>
          </div>

          {/* Right side: perks */}
          <ul className="grid gap-2 md:col-span-2">
            {PERKS.map((perk) => (
              <li
                key={perk.label}
                className="flex items-start gap-3 rounded-xl border border-background/10 bg-background/5 p-4 backdrop-blur transition-colors hover:bg-background/10"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <perk.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight">{perk.label}</p>
                  <p className="mt-0.5 text-xs text-background/60">{perk.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
