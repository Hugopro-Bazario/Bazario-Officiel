import { Bell, Search } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur sm:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un vendeur, produit, commande..."
              className="h-9 pl-9"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative size-9">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
          </Button>
          <div className="flex items-center gap-2 rounded-full bg-muted py-1 pl-1 pr-3">
            <div className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              HP
            </div>
            <span className="hidden text-sm font-medium sm:inline">Hugo Pro</span>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}
