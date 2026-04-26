import Image from "next/image"
import { Star, ShieldCheck, MoreHorizontal, Filter, Download } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sellers } from "@/lib/data"

export default function AdminSellers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Vendeurs</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Annuaire vendeurs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {sellers.length} vendeurs actifs · 12 en attente · 3 suspendus
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 size-4" /> Exporter
          </Button>
          <Button size="sm">Inviter un vendeur</Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Actifs", value: sellers.length.toString(), tone: "success" },
          { label: "En attente", value: "12", tone: "default" },
          { label: "Suspendus", value: "3", tone: "destructive" },
          { label: "Note moyenne", value: "4.82", tone: "default" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="flex flex-wrap items-center gap-2 p-3">
        <Input placeholder="Rechercher un vendeur..." className="h-9 max-w-sm" />
        <Button variant="outline" size="sm">
          <Filter className="mr-1.5 size-4" /> Statut
        </Button>
        <Button variant="outline" size="sm">
          Pays
        </Button>
        <Button variant="outline" size="sm">
          Catégorie
        </Button>
        <span className="ml-auto text-xs text-muted-foreground">{sellers.length} résultats</span>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Vendeur</th>
                <th className="px-4 py-3 font-medium">Pays</th>
                <th className="px-4 py-3 font-medium">Produits</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3 font-medium">Avis</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sellers.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-9 overflow-hidden rounded-full bg-muted">
                        <Image src={s.logo} alt={s.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="flex items-center gap-1.5 font-semibold">
                          {s.name}
                          {s.verified && <ShieldCheck className="size-3.5 text-primary" />}
                        </p>
                        <p className="text-xs text-muted-foreground">{s.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.country}</td>
                  <td className="px-4 py-3 font-mono">{s.productCount}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <Star className="size-3.5 fill-current text-accent" />
                      {s.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.reviewCount.toLocaleString("fr-FR")}</td>
                  <td className="px-4 py-3">
                    <Badge variant={s.verified ? "success" : "secondary"}>
                      {s.verified ? "Vérifié" : "En attente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        Profil
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
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
