"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileNav } from "@/components/layout/mobile-nav"
import { CartDrawer } from "@/components/cart/cart-drawer"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Hide buyer header/footer in seller and admin spaces (full-screen dashboards).
  const isStandalone =
    pathname.startsWith("/seller") ||
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"

  if (isStandalone) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-[60vh] pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
    </>
  )
}
