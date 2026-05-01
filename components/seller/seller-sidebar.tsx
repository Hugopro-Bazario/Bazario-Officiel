"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  BarChart3,
  Megaphone,
  Wallet,
  Star,
  Settings,
  HelpCircle,
  Truck,
  Boxes,
  Warehouse,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/logo"

const NAV = [
  { href: "/seller/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/seller/products", label: "Produits", icon: Package },
  { href: "/seller/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/seller/logistics", label: "Logistique", icon: Warehouse },
  { href: "/seller/shipments", label: "Expéditions", icon: Truck },
  { href: "/seller/returns", label: "Retours", icon: RotateCcw },
  { href: "/seller/dropshipping", label: "Dropshipping", icon: Boxes },
  { href: "/seller/analytics", label: "Statistiques", icon: BarChart3 },
  { href: "/seller/marketing", label: "Marketing", icon: Megaphone },
  { href: "/seller/finance", label: "Finances", icon: Wallet },
  { href: "/seller/reviews", label: "Avis", icon: Star },
]

export function SellerSidebar() {
  const pathname = usePathname()
  return (
    <aside className="flex w-60 flex-shrink-0 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/seller/dashboard" className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-medium text-muted-foreground">Seller</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-3">
        <Link
          href="/seller/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="size-4" />
          Paramètres
        </Link>
        <Link
          href="/seller/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="size-4" />
          Aide
        </Link>
      </div>
    </aside>
  )
}
