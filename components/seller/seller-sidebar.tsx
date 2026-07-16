"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  RotateCcw,
  HelpCircle,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/logo"

const NAV = [
  { href: "/seller/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/seller/products", label: "Mes produits", icon: Package },
  { href: "/seller/orders", label: "Ventes", icon: ShoppingBag },
  { href: "/seller/returns", label: "Remboursements", icon: RotateCcw },
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
          href="/sell"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Rocket className="size-4" />
          Publier un produit
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <HelpCircle className="size-4" />
          Aide
        </Link>
      </div>
    </aside>
  )
}
