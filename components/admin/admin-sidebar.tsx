"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Package,
  AlertTriangle,
  TrendingUp,
  Settings,
  Megaphone,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/layout/logo"

const NAV = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, exact: true },
  { href: "/admin/sellers", label: "Vendeurs", icon: ShieldCheck, badge: "12" },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/moderation", label: "Modération", icon: AlertTriangle, badge: "3" },
  { href: "/admin/marketing", label: "Marketing", icon: Megaphone },
  { href: "/admin/insights", label: "Analytics", icon: TrendingUp },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-card lg:flex">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="rounded bg-foreground px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 p-3">
        {NAV.map((item) => {
          const Icon = item.icon
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-accent text-accent-foreground",
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          Retour au site
        </Link>
      </div>
    </aside>
  )
}
