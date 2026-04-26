import Link from "next/link"
import Image from "next/image"
import { Check, X, Star, ShieldCheck, Truck, Award, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { products, formatPrice } from "@/lib/data"

const BADGE_LABELS: Record<string, string> = {
  flash: "Vente flash",
  new: "Nouveau",
  bestseller: "Bestseller",
  premium: "Premium",
  eco: "Éco-responsable",
}

type Row = {
  label: string
  values: (string | boolean | React.ReactNode)[]
  highlight?: boolean
}

export default function ComparePage() {
  const compared = products.slice(0, 3)

  const rows: Row[] = [
    {
      label: "Prix",
      highlight: true,
      values: compared.map((p) => (
        <div key={p.id}>
          <p className="text-2xl font-bold text-primary">{formatPrice(p.price)}</p>
          {p.compareAtPrice && (
            <p className="text-xs text-muted-foreground line-through">{formatPrice(p.compareAtPrice)}</p>
          )}
        </div>
      )),
    },
    {
      label: "Note moyenne",
      values: compared.map((p) => (
        <span key={p.id} className="inline-flex items-center gap-1 text-sm font-semibold">
          <Star className="size-3.5 fill-current text-accent" />
          {p.rating} <span className="text-muted-foreground">({p.reviewCount})</span>
        </span>
      )),
    },
    {
      label: "Vendeur",
      values: compared.map((p) => (
        <span key={p.id} className="inline-flex items-center gap-1.5 text-sm font-medium">
          {p.seller.name}
          {p.seller.verified && <ShieldCheck className="size-3.5 text-primary" />}
        </span>
      )),
    },
    {
      label: "Pays d'origine",
      values: compared.map((p) => p.seller.country),
    },
    {
      label: "Variantes disponibles",
      values: compared.map((p) => `${p.variants.length} options`),
    },
    {
      label: "Stock total",
      values: compared.map((p) => `${p.variants.reduce((sum, v) => sum + v.stock, 0)} pcs`),
    },
    {
      label: "Livraison gratuite",
      values: compared.map((p) => p.price >= 49),
    },
    {
      label: "Garantie 2 ans",
      values: [true, true, false],
    },
    {
      label: "Retour 30 jours",
      values: [true, true, true],
    },
    {
      label: "Bazario Premium éligible",
      values: [true, true, true],
    },
    {
      label: "Made in Europe",
      values: compared.map((p) =>
        ["France", "Italie", "Espagne", "Allemagne", "Suède"].includes(p.seller.country),
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Comparateur</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Comparez avant d&apos;acheter
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            Mettez côte à côte jusqu&apos;à 4 produits pour confronter prix, notes, garanties et services.
          </p>
        </div>
        <Button variant="outline" size="sm">
          Effacer la comparaison
        </Button>
      </div>

      {/* Comparison grid */}
      <Card className="overflow-hidden">
        {/* Product headers */}
        <div className="grid grid-cols-[160px_1fr_1fr_1fr] border-b bg-muted/30">
          <div className="px-4 py-5 text-xs uppercase tracking-wider text-muted-foreground">Produit</div>
          {compared.map((p) => (
            <div key={p.id} className="border-l px-4 py-5">
              <div className="flex flex-col items-start gap-3">
                <Link href={`/p/${p.slug}`} className="group block">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                </Link>
                {p.badges[0] && (
                  <Badge variant="outline" className="text-[10px]">
                    <Award className="mr-1 size-2.5" />
                    {BADGE_LABELS[p.badges[0]] ?? p.badges[0]}
                  </Badge>
                )}
                <Link href={`/p/${p.slug}`} className="line-clamp-2 text-sm font-semibold leading-tight hover:underline">
                  {p.title}
                </Link>
                <Button size="sm" className="mt-1 w-full">
                  Ajouter au panier
                </Button>
              </div>
            </div>
          ))}
          {compared.length < 4 && (
            <div className="hidden">{/* placeholder if extending */}</div>
          )}
        </div>

        {/* Rows */}
        <div className="divide-y">
          {rows.map((row) => (
            <div
              key={row.label}
              className={
                "grid grid-cols-[160px_1fr_1fr_1fr] " +
                (row.highlight ? "bg-primary/5" : "")
              }
            >
              <div className="px-4 py-3 text-sm font-medium text-muted-foreground">{row.label}</div>
              {row.values.map((v, i) => (
                <div key={i} className="border-l px-4 py-3 text-sm">
                  {typeof v === "boolean" ? (
                    v ? (
                      <Check className="size-4 text-success" />
                    ) : (
                      <X className="size-4 text-muted-foreground/50" />
                    )
                  ) : (
                    v
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Add a product slot */}
        <Separator />
        <div className="grid grid-cols-[160px_1fr_1fr_1fr]">
          <div className="px-4 py-4 text-sm font-medium text-muted-foreground">Ajouter</div>
          {compared.map((p) => (
            <div key={p.id} className="border-l px-4 py-4 text-center">
              <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                Retirer
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Why compare */}
      <section className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Données vérifiées",
            text: "Toutes les caractéristiques sont contrôlées par notre équipe contenu.",
          },
          {
            icon: Truck,
            title: "Livraison comparée",
            text: "Voyez les délais, frais et options pour votre adresse.",
          },
          {
            icon: Award,
            title: "Avis vérifiés uniquement",
            text: "Les notes proviennent d'achats authentifiés sur Bazario.",
          },
        ].map((b) => {
          const Icon = b.icon
          return (
            <Card key={b.title} className="p-5">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </Card>
          )
        })}
      </section>

      {/* Hint */}
      <div className="rounded-xl border border-dashed bg-muted/30 p-5 text-center">
        <Plus className="mx-auto size-5 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">Ajoutez un 4ᵉ produit pour aller plus loin</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Cliquez sur l&apos;icône comparateur depuis n&apos;importe quelle fiche produit.
        </p>
      </div>
    </div>
  )
}
