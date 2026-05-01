import { Bell, Search } from "lucide-react"
import { SellerSidebar } from "@/components/seller/seller-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <SellerSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher dans le seller center…" className="pl-10" />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-primary to-accent" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight">Lumen Studio</p>
                <p className="text-xs text-muted-foreground">Vendeur · 4,8 / 5</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
