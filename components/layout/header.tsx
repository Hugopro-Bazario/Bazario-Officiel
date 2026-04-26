"use client"
import * as React from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Heart,
  User,
  MapPin,
  Globe,
  Menu,
  ChevronDown,
  Store,
  HelpCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/layout/logo"
import { SearchBar } from "@/components/search/search-bar"
import { CATEGORIES } from "@/lib/data"
import { useCart } from "@/lib/cart-store"
import { useWishlist } from "@/lib/wishlist-store"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { count, openCart } = useCart()
  const { count: wishlistCount } = useWishlist()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      {/* Top bar */}
      <div className="hidden border-b bg-secondary/60 text-xs md:block">
        <div className="container flex h-9 items-center justify-between">
          <div className="flex items-center gap-4 text-muted-foreground">
            <button className="inline-flex items-center gap-1 hover:text-foreground">
              <Globe className="h-3.5 w-3.5" />
              FR
              <ChevronDown className="h-3 w-3" />
            </button>
            <button className="inline-flex items-center gap-1 hover:text-foreground">
              EUR
              <ChevronDown className="h-3 w-3" />
            </button>
            <span className="text-muted-foreground">Livraison gratuite dès 49 €</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="/seller/dashboard" className="inline-flex items-center gap-1 hover:text-foreground">
              <Store className="h-3.5 w-3.5" />
              Vendre sur Bazario
            </Link>
            <Link href="/help" className="inline-flex items-center gap-1 hover:text-foreground">
              <HelpCircle className="h-3.5 w-3.5" />
              Aide
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Connexion
            </Link>
            <Link href="/signup" className="hover:text-foreground">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container flex h-16 items-center gap-4">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo />

        <div className="ml-2 hidden w-full max-w-2xl flex-1 md:block">
          <SearchBar variant="desktop" />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button className="hidden items-center gap-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground lg:inline-flex">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-left leading-tight">
              <span className="block text-[10px]">Livrer en</span>
              <span className="block text-foreground">France</span>
            </span>
          </button>

          <Link
            href="/account"
            className="hidden items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-muted md:inline-flex"
          >
            <User className="h-4 w-4" />
            <span className="leading-tight">
              <span className="block text-[10px] text-muted-foreground">Bonjour</span>
              <span className="block font-medium">Mon compte</span>
            </span>
          </Link>

          <Link
            href="/account/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
            aria-label={`Liste de souhaits${wishlistCount > 0 ? ` (${wishlistCount})` : ""}`}
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <Badge
                variant="accent"
                className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]"
              >
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </Badge>
            )}
          </Link>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 items-center gap-2 rounded-md px-3 hover:bg-muted"
            aria-label={`Ouvrir le panier${count > 0 ? ` (${count} articles)` : ""}`}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge variant="accent" className="absolute -right-1 -top-1 h-5 min-w-5 justify-center px-1 text-[10px]">
                {count}
              </Badge>
            )}
            <span className="hidden text-sm font-medium sm:inline">Panier</span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="container pb-3 md:hidden">
        <SearchBar variant="mobile" />
      </div>

      {/* Categories nav */}
      <nav
        className={cn(
          "border-t bg-background",
          mobileOpen ? "block" : "hidden lg:block",
        )}
        aria-label="Catégories"
      >
        <div className="container flex flex-col gap-1 py-2 lg:h-11 lg:flex-row lg:items-center lg:gap-1 lg:py-0">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
          >
            <Menu className="h-4 w-4" />
            Toutes les catégories
          </Link>
          <div className="hidden h-5 w-px bg-border lg:block" />
          {CATEGORIES.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/c/${c.slug}`}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/discover"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            Découvrir
          </Link>
          <Link
            href="/compare"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Comparer
          </Link>
          <Link
            href="/sell"
            className="ml-auto hidden rounded-md px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10 lg:inline-flex"
          >
            Devenir vendeur
          </Link>
        </div>
      </nav>
    </header>
  )
}
