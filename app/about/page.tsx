import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, ShieldCheck, Globe, Heart, Leaf, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "À propos — Notre histoire et notre mission",
  description:
    "Bazario rapproche les meilleurs artisans, créateurs et marques de leurs clients dans le monde entier, avec exigence, transparence et passion.",
  alternates: { canonical: "/about" },
}

const VALUES = [
  {
    icon: Heart,
    title: "Exigence sincère",
    description:
      "Chaque vendeur est sélectionné, vérifié, audité. On ne référence pas un produit qu'on ne voudrait pas chez nous.",
  },
  {
    icon: ShieldCheck,
    title: "Confiance par défaut",
    description:
      "Garantie acheteur, retours 30 jours, paiement sécurisé Stripe : si quelque chose ne va pas, on remboursera.",
  },
  {
    icon: Leaf,
    title: "Impact mesuré",
    description:
      "Emballages compostables, livraisons groupées, vendeurs locaux mis en avant. Notre empreinte se réduit chaque année.",
  },
  {
    icon: Users,
    title: "Communauté avant audience",
    description:
      "On répond, on écoute, on ajuste. Bazario est construit avec ses 12 millions de membres autant que pour eux.",
  },
]

const MILESTONES = [
  { year: "2022", title: "Lancement", desc: "3 fondateurs, un appartement à Paris, 50 vendeurs partenaires." },
  { year: "2023", title: "Série A — 18 M€", desc: "Expansion européenne. 1 200 vendeurs, 800 K acheteurs actifs." },
  { year: "2024", title: "Bazario Premium", desc: "Notre programme d'abonnement et la livraison gratuite illimitée." },
  { year: "2025", title: "Cap des 8 000 vendeurs", desc: "Présents dans 47 pays. Première année rentable." },
  { year: "2026", title: "Bazario Coins & IA", desc: "Programme de fidélité et recommandations personnalisées en temps réel." },
]

const STATS = [
  { value: "12 M+", label: "Acheteurs actifs" },
  { value: "8 000", label: "Vendeurs vérifiés" },
  { value: "47", label: "Pays desservis" },
  { value: "4,8/5", label: "Note moyenne" },
]

const TEAM = [
  { name: "Léa Marchand", role: "CEO & co-fondatrice", avatar: "/avatar-3.jpg" },
  { name: "Hugo Pro", role: "CTO & co-fondateur", avatar: "/avatar-2.jpg" },
  { name: "Anaïs Dubois", role: "Head of Design", avatar: "/avatar-1.jpg" },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/30">
        <div className="container relative z-10 grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Badge variant="outline" className="mb-5 inline-flex items-center gap-1.5 text-xs">
              <Sparkles className="size-3" />
              Notre histoire
            </Badge>
            <h1 className="text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              On a fondé Bazario parce qu&apos;on voulait{" "}
              <span className="text-primary">acheter mieux.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Trop de bruit, trop de copies, trop de promesses. On a décidé de bâtir une marketplace où chaque produit
              a une histoire, chaque vendeur a un visage, et où la confiance n&apos;est pas un argument marketing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/discover">
                  Découvrir nos produits
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sell">Vendre sur Bazario</Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-foreground/10">
            <Image
              src="/about-team.jpg"
              alt="L'équipe Bazario en réunion dans nos bureaux parisiens"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/95 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bureau de Paris</p>
              <p className="mt-1 text-sm font-medium">42 personnes, 9 nationalités, une obsession.</p>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 size-[400px] rounded-full bg-accent/15 blur-3xl"
        />
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background px-6 py-10 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/about-workshop.jpg"
              alt="Un artisan partenaire prépare une commande dans son atelier"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Notre mission</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Donner à chaque vendeur les outils d&apos;une marque mondiale.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Un atelier de céramique à Tokyo, une marque de soins en Provence, un studio de design à Berlin :
              tous ont des produits remarquables, mais peu ont les moyens d&apos;une plateforme à l&apos;échelle.
              Bazario fournit l&apos;infrastructure, la logistique, le paiement, la confiance — eux gardent leur âme.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Pour les acheteurs, c&apos;est l&apos;assurance d&apos;accéder à ce qui se fait de mieux dans le monde,
              avec la même fiabilité qu&apos;un site qu&apos;on connaît depuis 20 ans.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Nos valeurs</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Quatre principes qui guident chaque décision.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/5"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Notre parcours</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            De 50 à 8 000 vendeurs en 4 ans.
          </h2>
        </div>
        <ol className="relative mx-auto mt-12 max-w-3xl">
          <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-1/2" />
          {MILESTONES.map((m, i) => (
            <li key={m.year} className={`relative grid gap-2 pb-10 last:pb-0 md:grid-cols-2 md:gap-10 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2 md:[&>div:first-child]:text-left md:[&>div:last-child]:text-right" : ""}`}>
              <span
                aria-hidden
                className="absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-background bg-primary md:left-1/2 md:-translate-x-1/2"
              />
              <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                <p className="font-mono text-sm font-semibold text-primary">{m.year}</p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{m.title}</h3>
              </div>
              <p className={`pl-8 text-sm leading-relaxed text-muted-foreground md:pl-0 ${i % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                {m.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Team */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">Aux commandes</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              L&apos;équipe fondatrice.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Trois personnes qui répondent personnellement à <a className="font-medium text-foreground underline-offset-4 hover:underline" href="mailto:hello@bazario.com">hello@bazario.com</a>.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-background p-5 text-center">
                <div className="relative mx-auto size-20 overflow-hidden rounded-full">
                  <Image src={m.avatar} alt={m.name} fill sizes="80px" className="object-cover" />
                </div>
                <p className="mt-4 font-display text-base font-semibold tracking-tight">{m.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background sm:p-16">
          <div className="relative z-10 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <Badge className="mb-5 bg-accent/15 text-accent hover:bg-accent/20">
                <Globe className="mr-1.5 size-3" />
                Rejoignez le mouvement
              </Badge>
              <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Acheter mieux, vendre plus loin.
              </h2>
              <p className="mt-4 max-w-lg text-background/80">
                Que vous cherchiez votre prochain coup de cœur ou que vous lanciez votre marque, Bazario est conçu
                pour aller plus loin que prévu.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button size="lg" variant="default" className="bg-background text-foreground hover:bg-background/90" asChild>
                <Link href="/signup">
                  Créer un compte gratuit
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10" asChild>
                <Link href="/sell">Devenir vendeur</Link>
              </Button>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-accent/30 blur-3xl"
          />
        </div>
      </section>
    </div>
  )
}
