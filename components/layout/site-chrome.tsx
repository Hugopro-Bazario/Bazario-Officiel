"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Hide buyer header/footer in seller and admin spaces (full-screen dashboards).
  const isStandalone = pathname.startsWith("/seller") || pathname.startsWith("/admin")

  if (isStandalone) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </>
  )
}
