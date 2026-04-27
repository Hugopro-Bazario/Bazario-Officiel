import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Download, Newspaper, Megaphone, ImageIcon, FileText, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Centre média — Bazario",
  description:
    "Espace presse Bazario : kit média, citations dirigeantes, chiffres clés, logos haute définition et contact attaché de presse.",
  alternates: { canonical: "/press" },
}

const STATS = [
  { label: "Vendeurs vérifiés", value: "12 800+" },
  { label: "Pays couverts", value: "42" },
  { label: "Commandes 2025", value: "18,4 M" },
  { label: "Note moyenne", value: "4,82 / 5" },
]

const QUOTES = [
  {
    outlet: "Vogue Business",
    quote:
      "Bazario réinvente la marketplace premium en plaçant la curation éditoriale au cœur de l'expérience d'achat.",
  },
  {
    outlet: "Les Échos",
    quote:
      "Une plateforme française qui ambitionne de devenir le concurrent direct d'Amazon sur le segment qualité.",
  },
  {
    outlet: "Forbes",
    quote: "Bazario réussit là où d'autres ont échoué : créer un Amazon humain, transparent et durable.",
  },
  {
    outlet: "TechCrunch",
    quote: "Une croissance de 340 % sur l'année, portée par un programme vendeur ultra-compétitif.",
  },
]

const ASSETS = [
  {
    icon: ImageIcon,
    title: "Logos officiels",
    description: "Pack ZIP — versions horizontales, verticales et monochromes (SVG, PNG).",
    cta: "Télécharger le kit logos",
  },
  {
    icon: FileText,
    title: "Dossier de presse",
    description: "Histoire, vision, équipe fondatrice, chiffres clés et roadmap 2026.",
    cta: "Télécharger le dossier (PDF)",
  },
  {
    icon: ImageIcon,
    title: "Photothèque dirigeants",
    description: "Portraits des cofondateurs et équipe direction, droits libres pour la presse.",
    cta: "Accéder à la photothèque",
  },
  {
    icon: Megaphone,
    title: "Communiqués 2025-2026",
    description: "Tous les communiqués de presse depuis le lancement de la marketplace.",
    cta: "Voir tous les communiqués",
  },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="container py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Newspaper className="mr-1.5 h-3 w-3" />
              Centre média
            </Badge>
            <h1 className="text-balance font-display text-4xl font-bold tracking-tight md:text-5xl">
              Bazario dans la presse
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Tout ce dont les journalistes, créateurs de contenu et partenaires médias ont besoin pour parler de
              Bazario. Kit téléchargeable, citations vérifiées, chiffres officiels et contact attaché de presse.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="#contact">Contacter l&apos;attaché de presse</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#assets">Télécharger le kit média</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-12 md:py-16 space-y-16">
        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-6 text-center">
                <p className="font-display text-3xl font-bold tracking-tight md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Ils parlent de nous
            </h2>
            <p className="mt-3 text-muted-foreground">
              Sélection de citations parues dans la presse internationale ces derniers mois.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {QUOTES.map((q) => (
              <figure key={q.outlet} className="rounded-2xl border bg-card p-6">
                <Quote className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <blockquote className="mt-3 text-pretty text-base leading-relaxed">
                  &laquo;&nbsp;{q.quote}&nbsp;&raquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                  — {q.outlet}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Assets */}
        <section id="assets" className="scroll-mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Kit média</h2>
            <p className="mt-3 text-muted-foreground">
              Tous les visuels et documents officiels, libres de droits pour usage éditorial.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ASSETS.map(({ icon: Icon, title, description, cta }) => (
              <article key={title} className="flex items-start gap-4 rounded-2xl border bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <a href="mailto:press@bazario-official.com?subject=Demande%20kit%20presse">
                      <Download className="mr-1.5 h-4 w-4" aria-hidden="true" />
                      {cta}
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Founder image + bio */}
        <section className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src="/blog-leather.jpg"
              alt="Direction Bazario"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Une équipe disponible pour vos interviews
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Notre direction prend la parole dans les médias français et internationaux sur les sujets de marketplace
              premium, souveraineté numérique européenne, économie circulaire et nouvelle distribution.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li>• Stratégie marketplace & e-commerce premium</li>
              <li>• Souveraineté technologique européenne</li>
              <li>• Économie circulaire et seconde main</li>
              <li>• Programmes vendeurs et empowerment artisanal</li>
              <li>• IA et personnalisation responsable</li>
            </ul>
          </div>
        </section>

        {/* Contact PR */}
        <section
          id="contact"
          className="scroll-mt-24 rounded-3xl border bg-gradient-to-br from-foreground to-foreground/90 p-8 text-background md:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Une demande presse&nbsp;?
              </h2>
              <p className="mt-3 text-pretty text-background/80">
                Notre équipe relations presse répond sous 24h ouvrées. Pour toute interview, demande d&apos;asset ou
                commentaire à chaud, contactez-nous directement.
              </p>
            </div>
            <div className="space-y-3">
              <a
                href="mailto:press@bazario-official.com"
                className="flex items-center gap-3 rounded-xl bg-background/10 px-5 py-4 transition hover:bg-background/15"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-background/70">E-mail</p>
                  <p className="font-medium">press@bazario-official.com</p>
                </div>
              </a>
              <a
                href="tel:+33182280000"
                className="flex items-center gap-3 rounded-xl bg-background/10 px-5 py-4 transition hover:bg-background/15"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wider text-background/70">Téléphone</p>
                  <p className="font-medium">+33 1 82 28 00 00</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
