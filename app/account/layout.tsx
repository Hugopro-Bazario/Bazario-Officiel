import { AccountSidebar } from "@/components/account/account-sidebar"

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Mon compte</h1>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <AccountSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
