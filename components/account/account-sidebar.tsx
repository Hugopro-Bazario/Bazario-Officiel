"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  MessageSquare,
  LogOut,
  Coins,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/account", label: "Tableau de bord", icon: User },
  { href: "/account/orders", label: "Mes commandes", icon: Package },
  { href: "/account/wishlist", label: "Liste de souhaits", icon: Heart },
  { href: "/account/addresses", label: "Adresses", icon: MapPin },
  { href: "/account/payments", label: "Moyens de paiement", icon: CreditCard },
  { href: "/account/messages", label: "Messages vendeurs", icon: MessageSquare },
  { href: "/account/coins", label: "Bazario Coins", icon: Coins },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <nav className="space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
        <button
          type="button"
          className="mt-4 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
        >
          <LogOut className="size-4" />
          Se déconnecter
        </button>
      </nav>
    </aside>
  )
}
