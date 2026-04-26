import Link from "next/link"
import Image from "next/image"
import { Package, Heart, MapPin, Coins, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockOrders, products, formatPrice } from "@/lib/data"

export default function AccountDashboard() {
  const recentOrders = mockOrders.slice(0, 3)
  const recommendations = products.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground">
        <p className="text-sm opacity-90">Bienvenue,</p>
        <h2 className="text-2xl font-bold">Hugo Pro</h2>
        <p className="mt-1 text-sm opacity-90">Membre Bazario depuis octobre 2025</p>
      </Card>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Commandes" value={mockOrders.length} href="/account/orders" />
        <StatCard icon={Heart} label="Favoris" value={12} href="/account/wishlist" />
        <StatCard icon={MapPin} label="Adresses" value={2} href="/account/addresses" />
        <StatCard icon={Coins} label="Coins" value="320" href="/account/coins" accent />
      </div>

      {/* Recent orders */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Commandes récentes</h3>
          <Link href="/account/orders" className="text-sm font-medium text-primary hover:underline">
            Voir tout
          </Link>
        </div>
        <Card className="divide-y">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="relative size-14 flex-shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={order.items[0]?.image || "/placeholder.svg"}
                  alt={order.items[0]?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{order.id}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {order.items.length} article{order.items.length > 1 ? "s" : ""} · {order.date}
                </p>
              </div>
              <Badge
                variant={
                  order.status === "delivered" ? "success" : order.status === "shipped" ? "default" : "secondary"
                }
              >
                {order.statusLabel}
              </Badge>
              <span className="hidden font-semibold sm:inline">{formatPrice(order.total)}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </Card>
      </section>

      {/* Recommendations */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">Sélectionnés pour vous</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recommendations.map((p) => (
            <Link key={p.id} href={`/p/${p.slug}`} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={p.images[0] || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium">{p.title}</p>
              <p className="text-sm font-semibold">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: typeof Package
  label: string
  value: string | number
  href: string
  accent?: boolean
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex size-10 items-center justify-center rounded-lg ${
            accent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
      <Button asChild variant="ghost" size="sm" className="mt-3 w-full justify-between">
        <Link href={href}>
          Gérer
          <ChevronRight className="size-3.5" />
        </Link>
      </Button>
    </Card>
  )
}
