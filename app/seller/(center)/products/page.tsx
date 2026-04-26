import Image from "next/image"
import Link from "next/link"
import { Plus, Search, Filter, MoreHorizontal, Pencil } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { products, formatPrice } from "@/lib/data"

export default function SellerProductsPage() {
  const list = products

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-muted-foreground">{list.length} produits actifs</p>
        </div>
        <Button asChild>
          <Link href="/seller/products/new">
            <Plus className="size-4" />
            Ajouter un produit
          </Link>
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher un produit, SKU…" className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="size-4" />
          Filtres
        </Button>
        <div className="ml-auto flex gap-2">
          {["Tous", "Actifs", "Brouillons", "En rupture"].map((label, i) => (
            <Button key={label} variant={i === 0 ? "default" : "outline"} size="sm">
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium text-right">Prix</th>
                <th className="px-5 py-3 font-medium text-right">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Ventes</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {list.map((p) => {
                const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0)
                const lowStock = totalStock < 20
                return (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 overflow-hidden rounded bg-muted">
                          <Image
                            src={p.images[0] || "/placeholder.svg"}
                            alt={p.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 max-w-[260px] font-medium">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.id.toUpperCase()}</td>
                    <td className="px-5 py-3 text-right font-semibold">{formatPrice(p.price)}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={lowStock ? "text-destructive font-medium" : ""}>{totalStock}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground">
                      {Math.floor(Math.random() * 200)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={lowStock ? "destructive" : "success"}>
                        {lowStock ? "Stock faible" : "Actif"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
