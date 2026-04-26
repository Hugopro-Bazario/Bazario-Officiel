import { Search, Download, Truck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/data"

const ORDERS = [
  {
    id: "BZ-20264112",
    buyer: "Marie Dupont",
    email: "marie.d@example.com",
    date: "26 avril 2026",
    items: 1,
    total: 189,
    status: "Nouvelle",
    statusVariant: "accent" as const,
  },
  {
    id: "BZ-20264110",
    buyer: "Stéphane Bernard",
    email: "s.bernard@example.com",
    date: "25 avril 2026",
    items: 1,
    total: 129,
    status: "À expédier",
    statusVariant: "secondary" as const,
  },
  {
    id: "BZ-20264108",
    buyer: "Karim Aït Saïd",
    email: "karim@example.com",
    date: "25 avril 2026",
    items: 2,
    total: 78,
    status: "À expédier",
    statusVariant: "secondary" as const,
  },
  {
    id: "BZ-20264102",
    buyer: "Léna Chen",
    email: "lena.c@example.com",
    date: "24 avril 2026",
    items: 1,
    total: 219,
    status: "Expédiée",
    statusVariant: "default" as const,
  },
  {
    id: "BZ-20264087",
    buyer: "Paul Martin",
    email: "paul.m@example.com",
    date: "22 avril 2026",
    items: 1,
    total: 219,
    status: "Livrée",
    statusVariant: "success" as const,
  },
  {
    id: "BZ-20264055",
    buyer: "Jeanne Moreau",
    email: "j.moreau@example.com",
    date: "20 avril 2026",
    items: 3,
    total: 412,
    status: "Livrée",
    statusVariant: "success" as const,
  },
]

export default function SellerOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Commandes</h1>
          <p className="text-muted-foreground">Gérez les expéditions et le suivi de vos ventes.</p>
        </div>
        <Button variant="outline">
          <Download className="size-4" />
          Exporter
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher numéro, acheteur…" className="pl-10" />
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          {["Toutes", "Nouvelles", "À expédier", "Expédiées", "Livrées", "Annulées"].map((label, i) => (
            <Button key={label} variant={i === 0 ? "default" : "outline"} size="sm">
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">N° commande</th>
                <th className="px-5 py-3 font-medium">Acheteur</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Articles</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{o.buyer}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-5 py-3 text-right">{o.items}</td>
                  <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3">
                    <Badge variant={o.statusVariant}>{o.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {o.status === "À expédier" || o.status === "Nouvelle" ? (
                      <Button size="sm">
                        <Truck className="size-4" />
                        Expédier
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        Détails
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
