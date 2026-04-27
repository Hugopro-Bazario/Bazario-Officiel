import Image from "next/image"
import { Download, RotateCcw, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RETURNS, RETURN_LABEL, fmtDate, fmtEUR } from "@/lib/logistics"

export const metadata = {
  title: "Retours & RMA — Seller Center | Bazario",
  description: "Gérez les demandes de retour, étiquettes prépayées, remboursements et échanges.",
}

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Retours & RMA</h1>
          <p className="text-muted-foreground">
            Suivez les demandes, envoyez l'étiquette en 1 clic et déclenchez le remboursement.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Download className="size-4" />
            Export
          </Button>
          <Button>
            <RotateCcw className="size-4" />
            Politique retours
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Taux de retour</p>
          <p className="mt-1 text-3xl font-bold">2,1 %</p>
          <p className="mt-2 text-xs text-emerald-600">−1,3 pt vs catégorie (4,8 %)</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Demandes ouvertes</p>
          <p className="mt-1 text-3xl font-bold">{RETURNS.filter((r) => r.status !== "refunded").length}</p>
          <p className="mt-2 text-xs text-muted-foreground">À traiter sous 48 h</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Remboursements 30 j</p>
          <p className="mt-1 text-3xl font-bold">{fmtEUR(640)}</p>
          <p className="mt-2 text-xs text-muted-foreground">Hors frais de port</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Délai moyen</p>
          <p className="mt-1 text-3xl font-bold">3,2 j</p>
          <p className="mt-2 text-xs text-emerald-600">SLA Bazario : 5 j</p>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Numéro RMA, commande, acheteur…" className="pl-10" />
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          {Object.values(RETURN_LABEL).map((l, i) => (
            <Button key={l} size="sm" variant={i === 0 ? "default" : "outline"}>
              {l}
            </Button>
          ))}
        </div>
      </div>

      {/* Returns list */}
      <div className="space-y-3">
        {RETURNS.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-1 items-start gap-4">
                {r.items.map((it) => (
                  <div key={it.sku} className="flex items-center gap-3">
                    <div className="relative size-16 overflow-hidden rounded-md bg-muted">
                      <Image src={it.image} alt={it.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{it.title}</p>
                      <p className="text-xs text-muted-foreground">SKU {it.sku} · qté {it.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant={
                    r.status === "refunded" ? "success" : r.status === "rejected" ? "destructive" : "secondary"
                  }
                >
                  {RETURN_LABEL[r.status]}
                </Badge>
                <p className="text-sm font-bold">{fmtEUR(r.amount)}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4 border-t pt-3 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
              <span className="font-mono text-xs text-muted-foreground">cmd {r.orderNumber}</span>
              <span className="text-muted-foreground">{r.buyerName}</span>
              <span className="text-muted-foreground">{r.reason}</span>
              <span className="text-muted-foreground">Demandé le {fmtDate(r.createdAt)}</span>
              {r.tracking && (
                <span className="text-muted-foreground">
                  {r.carrier} · {r.tracking}
                </span>
              )}
              <div className="ml-auto flex gap-2">
                {r.status === "requested" && (
                  <Button size="sm">Envoyer étiquette</Button>
                )}
                {r.status === "received" && (
                  <Button size="sm">Rembourser {fmtEUR(r.amount)}</Button>
                )}
                <Button size="sm" variant="outline">
                  Détails
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
