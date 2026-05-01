import {
  Users,
  ShoppingBag,
  Wallet,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RevenueChart } from "@/components/seller/revenue-chart"
import { CategoryBreakdown } from "@/components/seller/category-breakdown"

const KPIS = [
  { label: "Chiffre d'affaires (MTD)", value: "1 284 920 €", delta: "+18.2%", icon: Wallet, tone: "primary" as const },
  { label: "Commandes", value: "9 482", delta: "+12.5%", icon: ShoppingBag, tone: "default" as const },
  { label: "Acheteurs actifs", value: "284 921", delta: "+8.1%", icon: Users, tone: "default" as const },
  { label: "Taux de conversion", value: "3.42 %", delta: "+0.4 pt", icon: TrendingUp, tone: "success" as const },
]

const SELLER_REQUESTS = [
  { name: "Atelier Soleil", country: "Espagne", category: "Maison & Décoration", date: "il y a 2h", products: 38 },
  { name: "ByteForge", country: "Allemagne", category: "Tech & Audio", date: "il y a 4h", products: 124 },
  { name: "Maison Cuir", country: "Italie", category: "Mode & Accessoires", date: "hier", products: 56 },
  { name: "GreenFork", country: "France", category: "Alimentation Bio", date: "hier", products: 72 },
]

const ALERTS = [
  { title: "Litige ouvert sur commande #BZ-20264087", level: "high", time: "il y a 12 min" },
  { title: "Produit signalé : 'Lampe Halo Pro Max'", level: "medium", time: "il y a 1h" },
  { title: "Pic de retours sur Mode > Sneakers", level: "low", time: "il y a 3h" },
]

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Vue d&apos;ensemble · Avril 2026</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Bonjour Hugo</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Exporter le rapport
          </Button>
          <Button size="sm">
            <Sparkles className="mr-1.5 size-4" />
            Insights IA
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-center justify-between">
                <div
                  className={
                    "grid size-9 place-items-center rounded-lg " +
                    (kpi.tone === "primary"
                      ? "bg-primary/10 text-primary"
                      : kpi.tone === "success"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-foreground")
                  }
                >
                  <Icon className="size-4" />
                </div>
                <Badge variant="success" className="gap-1">
                  <ArrowUpRight className="size-3" />
                  {kpi.delta}
                </Badge>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">{kpi.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <CategoryBreakdown />
      </div>

      {/* Pending sellers + Alerts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Vendeurs en attente d&apos;approbation</h2>
              <p className="text-sm text-muted-foreground">12 demandes · 4 prioritaires</p>
            </div>
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="pb-2 font-medium">Boutique</th>
                  <th className="pb-2 font-medium">Catégorie</th>
                  <th className="pb-2 font-medium">Produits</th>
                  <th className="pb-2 font-medium">Soumis</th>
                  <th className="pb-2 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {SELLER_REQUESTS.map((s) => (
                  <tr key={s.name} className="group">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {s.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.country}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{s.category}</td>
                    <td className="py-3 font-mono">{s.products}</td>
                    <td className="py-3 text-muted-foreground">{s.date}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="sm">
                          Examiner
                        </Button>
                        <Button size="sm">Approuver</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alertes</h2>
            <Badge variant="destructive">3 actives</Badge>
          </div>
          <ul className="space-y-3">
            {ALERTS.map((a) => (
              <li key={a.title} className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
                <span
                  className={
                    "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full " +
                    (a.level === "high"
                      ? "bg-destructive/10 text-destructive"
                      : a.level === "medium"
                        ? "bg-accent/15 text-accent"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  <AlertTriangle className="size-3.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="mt-4 w-full bg-transparent">
            Centre de modération
          </Button>
        </Card>
      </div>

      {/* Trust score */}
      <Card className="overflow-hidden">
        <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
          <div className="bg-gradient-to-br from-primary to-primary/85 p-6 text-primary-foreground">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/80">
              <ShieldCheck className="size-3.5" />
              Bazario Trust Score
            </div>
            <p className="mt-2 text-4xl font-bold">96 / 100</p>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Excellent — basé sur 284 921 transactions des 30 derniers jours.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-primary-foreground/70">Litiges résolus</p>
                <p className="text-lg font-semibold">98.4 %</p>
              </div>
              <div>
                <p className="text-primary-foreground/70">Livraison à temps</p>
                <p className="text-lg font-semibold">94.1 %</p>
              </div>
              <div>
                <p className="text-primary-foreground/70">Avis ≥ 4★</p>
                <p className="text-lg font-semibold">91.7 %</p>
              </div>
            </div>
          </div>
          <div className="grid place-items-center bg-card p-6 sm:w-72">
            <Button className="w-full">Voir le rapport détaillé</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
