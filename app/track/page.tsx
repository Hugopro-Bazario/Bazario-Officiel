import type { Metadata } from "next"
import Link from "next/link"
import {
  PackageSearch,
  ShieldCheck,
  Headphones,
  Truck,
  Mail,
  ArrowRight,
} from "lucide-react"
import { TrackOrderForm } from "@/components/track/track-order-form"

const SITE_URL = "https://www.bazario-official.com"

export const metadata: Metadata = {
  title: "Suivre une commande | Bazario",
  description:
    "Suivez votre commande Bazario en temps réel : numéro et e-mail suffisent. Notifications SMS, e-mail et push à chaque étape.",
  alternates: { canonical: `${SITE_URL}/track` },
  openGraph: {
    title: "Suivre votre commande Bazario",
    description:
      "Saisissez votre numéro de commande et votre e-mail pour voir la progression en temps réel.",
    url: `${SITE_URL}/track`,
    type: "website",
  },
}

const STEPS = [
  {
    icon: PackageSearch,
    title: "Saisissez votre numéro",
    description:
      "Le numéro de commande figure dans l'e-mail de confirmation et sur votre espace membre, format BZR-2026-XXXX.",
  },
  {
    icon: Truck,
    title: "Voyez chaque étape en direct",
    description:
      "Atelier, hub Bazario, transporteur final, tournée locale : 6 jalons précis avec horodatage à la minute.",
  },
  {
    icon: Mail,
    title: "Recevez les bonnes alertes",
    description:
      "Choisissez entre e-mail, SMS et notifications push. Vous pouvez arrêter à tout moment depuis votre compte.",
  },
]

export default function TrackPage() {
  return (
    <main className="bg-background">
      <section className="border-b bg-secondary/30">
        <div className="container py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-start">
            <div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                <PackageSearch className="h-3.5 w-3.5" />
                Suivi en temps réel
              </span>
              <h1 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Où en est votre commande ?
              </h1>
              <p className="mt-4 max-w-xl text-balance text-muted-foreground md:text-lg">
                Saisissez votre numéro de commande Bazario et l&apos;e-mail
                associé. Nous vous montrons immédiatement où se trouve votre
                colis, la date estimée de livraison et le contact direct du
                vendeur.
              </p>

              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-foreground" />
                  Données chiffrées de bout en bout, RGPD-compliant.
                </li>
                <li className="flex items-start gap-2">
                  <Headphones className="mt-0.5 h-4 w-4 text-foreground" />
                  Concierge humain joignable 7j/7 si quelque chose cloche.
                </li>
              </ul>
            </div>

            <TrackOrderForm />
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border bg-background p-6"
            >
              <s.icon className="h-6 w-6" aria-hidden="true" />
              <h2 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t bg-foreground py-14 text-background">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
              Un souci avec votre commande ?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Notre équipe répond en moins de 90 secondes.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90"
          >
            Contacter le support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
