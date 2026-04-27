import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, Calendar, Gift, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Cartes cadeaux Bazario · Le cadeau qui plaît à coup sûr",
  description:
    "Offrez l'embarras du choix : nos cartes cadeaux digitales sont valables 2 ans, livrées par e-mail en moins d'une minute et utilisables sur toute la marketplace Bazario.",
  alternates: { canonical: "/gift-cards" },
  openGraph: { title: "Cartes cadeaux Bazario", url: "/gift-cards", type: "website" },
}

const AMOUNTS = [
  { value: 25, popular: false },
  { value: 50, popular: true },
  { value: 100, popular: false },
  { value: 150, popular: false },
  { value: 250, popular: false },
  { value: 500, popular: false },
]

const FEATURES = [
  { title: "Livraison digitale instantanée", body: "Envoyée par e-mail au destinataire en moins d'une minute après l'achat." },
  { title: "Programmation à la date souhaitée", body: "Anniversaire, mariage, départ : choisissez la date exacte d'envoi." },
  { title: "Validité 2 ans pleins", body: "Le destinataire dispose de 24 mois pour profiter de l'intégralité de la valeur." },
  { title: "Cumulable avec toutes les promos", body: "Soldes, codes Bazario+, cashback : aucune restriction d'usage." },
  { title: "Personnalisation messages", body: "Ajoutez un mot personnel, une photo et choisissez parmi 6 thèmes graphiques." },
  { title: "Remboursable si non utilisée", body: "Si la carte n'est pas utilisée sous 24 mois, elle est intégralement remboursée." },
]

export default function GiftCardsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 md:items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              Nouveau
            </Badge>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Le cadeau qui ne se trompe jamais.
            </h1>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Offrez à vos proches l&apos;accès à plus de 84 produits curatés, à 4 200 vendeurs vérifiés et à toute
              la philosophie Bazario.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              {[
                "Livrée en moins d'une minute par e-mail",
                "Programmable à la date de votre choix",
                "Valable 2 ans, sur tout le site",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#choisir">
                  Offrir une carte
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/loyalty">Découvrir Bazario+</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <Image
              src="/giftcard-hero.jpg"
              alt="Carte cadeau Bazario"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Choose amount */}
      <section id="choisir" className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Choisissez le montant</h2>
        <p className="mt-2 text-sm text-muted-foreground">Tous les montants sont en euros. Conversion automatique pour le destinataire.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {AMOUNTS.map((a) => (
            <button
              key={a.value}
              type="button"
              className="group relative flex flex-col items-center justify-center rounded-lg border border-border bg-card px-4 py-8 text-center transition hover:border-primary hover:shadow-sm"
            >
              {a.popular && (
                <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary-foreground">
                  Populaire
                </span>
              )}
              <span className="font-display text-3xl font-semibold text-foreground">{a.value} €</span>
              <span className="mt-1 text-xs text-muted-foreground">Carte cadeau digitale</span>
            </button>
          ))}
        </div>

        {/* Sender form */}
        <form className="mt-10 grid gap-5 rounded-xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8">
          <div className="sm:col-span-2">
            <h3 className="font-display text-lg font-semibold">Personnalisez votre carte</h3>
            <p className="mt-1 text-xs text-muted-foreground">Ces informations apparaîtront dans l&apos;e-mail envoyé au destinataire.</p>
          </div>
          <div>
            <label htmlFor="gc-recipient" className="mb-1.5 block text-xs font-medium text-foreground">
              E-mail du destinataire
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="gc-recipient"
                type="email"
                placeholder="prenom@email.com"
                className="w-full rounded-md border border-border bg-background px-9 py-2 text-sm outline-none ring-primary/30 focus:ring-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="gc-name" className="mb-1.5 block text-xs font-medium text-foreground">
              Prénom du destinataire
            </label>
            <input
              id="gc-name"
              type="text"
              placeholder="Camille"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="gc-message" className="mb-1.5 block text-xs font-medium text-foreground">
              Message personnel (optionnel)
            </label>
            <textarea
              id="gc-message"
              rows={3}
              placeholder="Joyeux anniversaire ! Profite-en pour te faire vraiment plaisir."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/30 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="gc-date" className="mb-1.5 block text-xs font-medium text-foreground">
              Date d&apos;envoi
            </label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="gc-date"
                type="date"
                className="w-full rounded-md border border-border bg-background px-9 py-2 text-sm outline-none ring-primary/30 focus:ring-2"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button type="submit" size="lg" className="w-full">
              <Gift className="mr-2 h-4 w-4" />
              Continuer vers le paiement
            </Button>
          </div>
        </form>
      </section>

      {/* Features grid */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Pourquoi nos cartes plaisent</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="rounded-xl border border-border bg-foreground p-8 text-background sm:p-12">
          <Badge variant="outline" className="mb-3 border-background/30 text-background">
            Bazario for Business
          </Badge>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Vous offrez à vos collaborateurs ?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            Programme entreprise dès 50 cartes : tarifs dégressifs jusqu&apos;à -8 %, facturation centralisée, plateforme dédiée et compte
            account manager.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link href="/contact?subject=gift-cards-pro">Parler à un account manager</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
