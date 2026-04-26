import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Eye,
  Star,
  ArrowUpRight,
  Plus,
  Megaphone,
  Wallet,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/data"

const KPI = [
  { label: "Ventes (30 j)", value: 12480, prefix: "€", delta: 18.4, icon: Wallet },
  { label: "Commandes (30 j)", value: 87, delta: 12.1, icon: ShoppingBag },
  { label: "Visites fiche produit", value: 4321, delta: -3.2, icon: Eye },
  { label: "Note moyenne", value: 4.8, suffix: " / 5", delta: 0.2, icon: Star },
]

const RECENT_ORDERS = [
  { id: "BZ-20264112", buyer: "M. Dupont", product: "Casque audio sans fil…", total: 189, status: "Nouvelle" },
  { id: "BZ-20264110", buyer: "S. Bernard", product: "Sneakers blanches taille 42", total: 129, status: "À expédier" },
  { id: "BZ-20264108", buyer: "K. Martin", product: "Sérum vitamine C ×2", total: 78, status: "À expédier" },
  { id: "BZ-20264102", buyer: "L. Chen", product: "Lampe en laiton brossé", total: 219, status: "Expédiée" },
]

const TOP_PRODUCTS = [
  { title: "Casque audio sans fil bluetooth premium ANC", sales: 142, revenue: 26838 },
  { title: "Sneakers en cuir blanc minimaliste", sales: 98, revenue: 12642 },
  { title: "Sérum vitamine C éclat 30 ml", sales: 73, revenue: 2847 },
]

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bonjour Lumen Studio, voici vos performances aujourd&apos;hui.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Megaphone className="size-4" />
            Lancer une promo
          </Button>
          <Button asChild>
            <Link href="/seller/products/new">
              <Plus className="size-4" />
              Ajouter un produit
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI.map((kpi) => {
          const Icon = kpi.icon
          const positive = kpi.delta >= 0
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <Badge variant={positive ? "success" : "destructive"} className="gap-1">
                  {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {positive ? "+" : ""}
                  {kpi.delta}%
                </Badge>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-3xl font-bold">
                {kpi.prefix === "€" ? formatPrice(kpi.value) : `${kpi.value.toLocaleString("fr-FR")}${kpi.suffix ?? ""}`}
              </p>
            </Card>
          )
        })}
      </div>

      {/* Sales chart placeholder */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Ventes des 30 derniers jours</h2>
            <p className="text-sm text-muted-foreground">Évolution journalière du chiffre d&apos;affaires</p>
          </div>
          <div className="flex gap-2 text-xs">
            {["7 j", "30 j", "90 j", "1 an"].map((p, i) => (
              <button
                key={p}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <SalesSparkline />
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Recent orders */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold">Commandes récentes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/seller/orders">
                Voir tout <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Commande</th>
                  <th className="px-5 py-3 font-medium">Acheteur</th>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium text-right">Total</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                    <td className="px-5 py-3">{o.buyer}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.product}</td>
                    <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                    <td className="px-5 py-3">
                      <Badge
                        variant={
                          o.status === "Nouvelle"
                            ? "accent"
                            : o.status === "Expédiée"
                              ? "success"
                              : "secondary"
                        }
                      >
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Top products */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold">Top produits</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/seller/products">
                Tous <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="divide-y">
            {TOP_PRODUCTS.map((p, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="line-clamp-1 text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.sales} ventes</p>
                </div>
                <span className="text-sm font-semibold">{formatPrice(p.revenue)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

function SalesSparkline() {
  // Simple SVG sparkline — illustrative.
  const points = [
    20, 28, 24, 35, 32, 40, 38, 50, 46, 55, 52, 60, 58, 70, 68, 80, 76, 90, 86, 95, 90, 100, 96, 110, 105, 120, 115,
    130, 125, 140,
  ]
  const max = Math.max(...points)
  const w = 1000
  const h = 200
  const step = w / (points.length - 1)
  const path = points.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * (h - 20) - 10}`).join(" ")
  const area = `${path} L ${w} ${h} L 0 ${h} Z`
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#sparkFill)" />
        <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
