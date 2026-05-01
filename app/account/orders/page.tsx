import Image from "next/image"
import Link from "next/link"
import { Package, Truck, CheckCircle2, XCircle, Download, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockOrders, formatPrice } from "@/lib/data"
import type { OrderStatus } from "@/lib/data"

const STATUS_ICON: Record<OrderStatus, typeof Package> = {
  pending: Package,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
}

const STATUS_VARIANT: Record<OrderStatus, "default" | "success" | "secondary" | "destructive"> = {
  pending: "secondary",
  shipped: "default",
  delivered: "success",
  cancelled: "destructive",
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mes commandes</h2>
        <p className="text-sm text-muted-foreground">
          {mockOrders.length} commande{mockOrders.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["Toutes", "En cours", "Livrées", "Annulées", "À noter"].map((label, i) => (
          <Button key={label} variant={i === 0 ? "default" : "outline"} size="sm">
            {label}
          </Button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {mockOrders.map((order) => {
          const Icon = STATUS_ICON[order.status]
          return (
            <Card key={order.id} className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 text-sm">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                  <div>
                    <p className="text-xs text-muted-foreground">Commande</p>
                    <p className="font-mono font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Passée le</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <Badge variant={STATUS_VARIANT[order.status]} className="gap-1.5">
                  <Icon className="size-3.5" />
                  {order.statusLabel}
                </Badge>
              </div>

              <ul className="divide-y">
                {order.items.map((item, i) => (
                  <li key={i} className="flex gap-4 p-4">
                    <div className="relative size-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Quantité : {item.qty} · {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Button variant="outline" size="sm">
                        Racheter
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="ghost" size="sm">
                          Laisser un avis
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <Separator />
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      <Truck className="mr-1.5 size-4" />
                      Suivre le colis
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1.5 size-4" />
                    Facture
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-1.5 size-4" />
                    Contacter le vendeur
                  </Button>
                </div>
                {order.status === "pending" && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    Annuler la commande
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
