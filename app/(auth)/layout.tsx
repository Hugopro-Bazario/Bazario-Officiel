import Link from "next/link"
import { Logo } from "@/components/layout/logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
        <Link href="/" aria-label="Retour à l'accueil" className="mb-12 inline-block w-fit">
          <Logo />
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">{children}</div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          © 2026 Bazario. Tout, mieux, partout.
        </p>
      </div>

      {/* Visual side */}
      <div
        className="relative hidden bg-primary lg:flex"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(249,115,22,0.4), transparent 50%), radial-gradient(circle at 80% 70%, rgba(59,91,219,0.4), transparent 50%)",
        }}
      >
        <div className="relative z-10 flex w-full flex-col justify-between p-16 text-primary-foreground">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">
              Marketplace mondiale
            </p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-bold leading-tight text-balance">
              Achetez malin, vendez sans frontières.
            </h2>
          </div>
          <div className="space-y-6">
            <Stat value="2.4M+" label="produits référencés" />
            <Stat value="180+" label="pays desservis" />
            <Stat value="4.8/5" label="note moyenne acheteurs" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <div className="font-display text-3xl font-bold">{value}</div>
      <div className="text-sm text-primary-foreground/70">{label}</div>
    </div>
  )
}
