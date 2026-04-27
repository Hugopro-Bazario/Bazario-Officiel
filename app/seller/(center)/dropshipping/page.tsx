import Image from "next/image"
import { Boxes, CheckCircle2, Plug, Search, ShieldCheck, Star, TrendingUp, Truck, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DROPSHIP_PRODUCTS, SUPPLIER_LABEL, SUPPLIER_FLAG, SUPPLIER_LEAD_HOURS } from "@/lib/dropshipping"
import { fmtEUR } from "@/lib/logistics"

export const metadata = {
  title: "Dropshipping — Seller Center | Bazario",
  description:
    "Catalogue dropshipping global avec marges, importez en un clic depuis CJ, Spocket, Alibaba et Modalyst.",
}

const SUPPLIERS_INTEGRATED = [
  {
    code: "cj",
    name: "CJ Dropshipping",
    desc: "1,2 M produits, entrepôts CN/EU/US, fulfillment automatique 24h.",
    sku: 1_200_000,
    connected: true,
  },
  {
    code: "spocket",
    name: "Spocket EU",
    desc: "Fournisseurs européens vérifiés, livraison 2 à 5 jours en France.",
    sku: 320_000,
    connected: true,
  },
  {
    code: "modalyst",
    name: "Modalyst",
    desc: "Marques premium et indépendantes, drop ship sans engagement.",
    sku: 180_000,
    connected: true,
  },
  {
    code: "alibaba",
    name: "Alibaba Trade Assurance",
    desc: "Sourcing usine, négociation MOQ, qualité garantie.",
    sku: 8_400_000,
    connected: false,
  },
] as const

export default function DropshippingPage() {
  const trending = DROPSHIP_PRODUCTS.filter((p) => p.trending).slice(0, 6)
  const all = DROPSHIP_PRODUCTS

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dropshipping</h1>
          <p className="text-muted-foreground">
            Importez en 1 clic les produits gagnants, on s'occupe de la commande, du tracking et du SAV.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Plug className="size-4" />
            Connecter un fournisseur
          </Button>
          <Button>
            <Zap className="size-4" />
            Import en masse
          </Button>
        </div>
      </div>

      {/* Value props */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ValueProp icon={<TrendingUp className="size-5" />} title="Marges 50-80 %" body="Prix conseillés calculés sur les meilleurs vendeurs Bazario." />
        <ValueProp icon={<Truck className="size-5" />} title="Fulfillment auto" body="Quand un client commande, on passe la commande au fournisseur." />
        <ValueProp icon={<ShieldCheck className="size-5" />} title="Qualité contrôlée" body="Vérification photo + dimensions avant expédition (CJ EU/US)." />
        <ValueProp icon={<CheckCircle2 className="size-5" />} title="Sans stock" body="Aucun investissement initial, vous payez à la commande." />
      </div>

      {/* Suppliers */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Fournisseurs intégrés</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SUPPLIERS_INTEGRATED.map((s) => (
            <Card key={s.code} className="flex flex-col p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{SUPPLIER_FLAG[s.code as keyof typeof SUPPLIER_FLAG]}</span>
                <h3 className="font-semibold">{s.name}</h3>
                {s.connected ? (
                  <Badge variant="success" className="ml-auto">Connecté</Badge>
                ) : (
                  <Badge variant="outline" className="ml-auto">À connecter</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-auto pt-3 text-xs text-muted-foreground">
                {s.sku.toLocaleString("fr-FR")} SKU · délai {SUPPLIER_LEAD_HOURS[s.code as keyof typeof SUPPLIER_LEAD_HOURS]} h
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher dans 8,4 M de produits…" className="pl-10" />
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          {["Tous", "Tendance", "Marge > 50 %", "EU only", "Tech", "Mode", "Maison"].map((l, i) => (
            <Button key={l} size="sm" variant={i === 0 ? "default" : "outline"}>
              {l}
            </Button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tendances de la semaine</h2>
          <span className="text-sm text-muted-foreground">{trending.length} produits chauds</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((p) => (
            <DropshipCard key={p.id} p={p} highlight />
          ))}
        </div>
      </section>

      {/* All */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Catalogue complet ({all.length})</h2>
        </div>
        <Card className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">Fournisseur</th>
                <th className="px-5 py-3 font-medium text-right">Coût</th>
                <th className="px-5 py-3 font-medium text-right">Prix conseillé</th>
                <th className="px-5 py-3 font-medium text-right">Marge</th>
                <th className="px-5 py-3 font-medium">Livraison</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {all.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                        <Image src={p.image} alt={p.title} fill className="object-cover" />
                      </div>
                      <div className="max-w-xs">
                        <p className="line-clamp-1 font-medium">{p.title}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm">
                      {SUPPLIER_FLAG[p.supplier]} {SUPPLIER_LABEL[p.supplier]}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      {p.rating} · {p.ordersCount.toLocaleString("fr-FR")} ventes
                    </p>
                  </td>
                  <td className="px-5 py-3 text-right text-muted-foreground">{fmtEUR(p.costEUR)}</td>
                  <td className="px-5 py-3 text-right font-semibold">{fmtEUR(p.suggestedPriceEUR)}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="font-semibold text-emerald-600">+{fmtEUR(p.margin)}</span>
                    <p className="text-xs text-muted-foreground">{p.marginPercent} %</p>
                  </td>
                  <td className="px-5 py-3">
                    <p>{p.shippingTimeDays}</p>
                    <p className="text-xs text-muted-foreground">depuis {p.shippingFromCountry}</p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button size="sm">
                      <Zap className="size-4" />
                      Importer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  )
}

function ValueProp({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </Card>
  )
}

function DropshipCard({ p, highlight }: { p: (typeof DROPSHIP_PRODUCTS)[number]; highlight?: boolean }) {
  return (
    <Card className={"flex flex-col overflow-hidden " + (highlight ? "ring-2 ring-primary/40" : "")}>
      <div className="relative aspect-[4/3] bg-muted">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
        {p.trending && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 text-xs font-semibold">
            <TrendingUp className="size-3" />
            Tendance
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
          +{p.marginPercent}% marge
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-muted-foreground">
          {SUPPLIER_FLAG[p.supplier]} {SUPPLIER_LABEL[p.supplier]} · {p.shippingTimeDays}
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-medium">{p.title}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Coût {fmtEUR(p.costEUR)}</p>
            <p className="text-lg font-bold">{fmtEUR(p.suggestedPriceEUR)}</p>
          </div>
          <p className="text-sm font-semibold text-emerald-600">+{fmtEUR(p.margin)} / vente</p>
        </div>
        <Button size="sm" className="mt-3 w-full">
          <Boxes className="size-4" />
          Importer dans ma boutique
        </Button>
      </div>
    </Card>
  )
}
