"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react"
import { useCart } from "@/lib/cart-store"
import { useWishlist } from "@/lib/wishlist-store"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: typeof Home
  isCart?: boolean
  isWishlist?: boolean
}

const ITEMS: NavItem[] = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/search", label: "Recherche", icon: Search },
  { href: "/cart", label: "Panier", icon: ShoppingBag, isCart: true },
  { href: "/account/wishlist", label: "Favoris", icon: Heart, isWishlist: true },
  { href: "/account", label: "Compte", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()
  const { items } = useCart()
  const { count: wishlistCount } = useWishlist()
  const cartCount = items.reduce((sum, it) => sum + it.qty, 0)

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative">
                  <Icon className={cn("size-5", active && "fill-primary/10")} />
                  {item.isCart && cartCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                  {item.isWishlist && wishlistCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </span>
                <span>{item.label}</span>
                {active && (
                  <span aria-hidden className="absolute -top-px h-0.5 w-10 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
