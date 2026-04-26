"use client"
import * as React from "react"
import { Truck, Shield, RefreshCw, Award, Globe2, Package } from "lucide-react"
import type { Product } from "@/lib/data"

const TABS = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Caractéristiques" },
  { id: "shipping", label: "Livraison & retours" },
  { id: "warranty", label: "Garantie" },
] as const

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = React.useState<(typeof TABS)[number]["id"]>("description")

  return (
    <section className="rounded-2xl border bg-card">
      {/* Tab nav */}
      <div className="flex overflow-x-auto border-b no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`relative shrink-0 px-6 py-4 text-sm font-medium transition-colors ${
              active === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {active === t.id && (
              <span className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {active === "description" && (
          <div className="prose-sm max-w-none">
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
              {product.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Conception soignée par des artisans certifiés",
                "Matériaux premium sélectionnés à la source",
                "Emballage recyclable & sans plastique",
                "Conforme aux normes européennes CE / RoHS",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "specs" && (
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <Spec label="Marque" value={product.brand} />
            <Spec label="Modèle / SKU" value={product.variants[0]?.sku ?? "-"} />
            <Spec label="Catégorie" value={product.categoryPath.join(" › ")} />
            <Spec label="Variantes" value={`${product.variants.length} options`} />
            <Spec label="Référence" value={product.variants[0]?.label ?? "Standard"} />
            <Spec label="Poids" value="0,4 kg" />
            <Spec label="Origine" value={product.shippingFrom} />
            <Spec label="Référence Bazario" value={`BZ-${product.id.toUpperCase()}`} />
          </dl>
        )}

        {active === "shipping" && (
          <ul className="space-y-4">
            <ShippingRow
              icon={Truck}
              title="Livraison standard"
              desc={`Expédiée sous 24 h depuis ${product.shippingFrom}. Arrivée estimée ${product.estimatedDelivery}.`}
              price="Offerte dès 49 €"
            />
            <ShippingRow
              icon={Package}
              title="Livraison express"
              desc="Suivi temps réel · livraison en 24-48 h en France métropolitaine."
              price="6,90 €"
            />
            <ShippingRow
              icon={Globe2}
              title="Livraison internationale"
              desc="220 pays desservis. Délais et frais calculés à l'étape paiement."
              price="à partir de 9,90 €"
            />
            <ShippingRow
              icon={RefreshCw}
              title={product.returns}
              desc="Retours gratuits depuis un point relais. Remboursement sous 5 jours ouvrés."
              price="0 €"
            />
          </ul>
        )}

        {active === "warranty" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-secondary/40 p-5">
              <Shield className="h-5 w-5 text-primary" />
              <p className="mt-2 font-semibold">Garantie 2 ans constructeur</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pièces, main-d&apos;œuvre et défauts de fabrication couverts intégralement.
              </p>
            </div>
            <div className="rounded-xl border bg-secondary/40 p-5">
              <Award className="h-5 w-5 text-accent" />
              <p className="mt-2 font-semibold">Bazario Care +</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Étendez la couverture à 5 ans pour 19 € · casse & oxydation incluses.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-dashed pb-2 last:border-b-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-right">{value}</dd>
    </div>
  )
}

function ShippingRow({
  icon: Icon,
  title,
  desc,
  price,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  price: string
}) {
  return (
    <li className="flex items-start gap-4 rounded-xl border bg-secondary/30 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
      <span className="shrink-0 text-sm font-bold text-foreground">{price}</span>
    </li>
  )
}
