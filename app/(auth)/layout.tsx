import Link from "next/link"
import Image from "next/image"
import { ShieldCheck, Truck, Star } from "lucide-react"
import { Logo } from "@/components/layout/logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Retour à l'accueil" className="inline-block w-fit">
            <Logo />
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
            Besoin d&apos;aide ?
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">{children}</div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 Bazario</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              Confidentialité
            </Link>
            <Link href="#" className="hover:text-foreground">
              CGV
            </Link>
            <Link href="#" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <Image
          src="/auth-editorial.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 0px"
        />
        {/* Color overlay to keep brand on top of the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-primary/95"
          aria-hidden
        />
        <div className="bg-grain absolute inset-0 opacity-30" aria-hidden />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground xl:p-16">
          {/* Top */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/70">
              Bazario · Marketplace mondiale
            </p>
            <div className="hidden items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur xl:flex">
              <span className="size-1.5 rounded-full bg-success animate-soft-pulse" />
              12 400 ventes en direct
            </div>
          </div>

          {/* Middle quote card */}
          <div className="space-y-8">
            <h2 className="max-w-md font-display text-4xl font-bold leading-[1.1] text-balance xl:text-5xl">
              Tout, mieux, partout. Une expérience d&apos;achat repensée.
            </h2>

            <figure className="max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <div className="mb-3 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-pretty text-lg leading-relaxed">
                &laquo; Bazario est devenu mon premier réflexe. Le choix d&apos;Amazon, la curation d&apos;une boutique
                concept. &raquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Image
                  src="/avatar-1.jpg"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover ring-2 ring-white/30"
                />
                <div>
                  <div className="text-sm font-semibold">Camille L.</div>
                  <div className="text-xs text-primary-foreground/70">Membre Premium · Paris</div>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Bottom: stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
            <Stat icon={<Stat2M />} label="produits référencés" value="2,4 M" />
            <Stat icon={<Truck className="size-4" />} label="livraison express dans" value="180 pays" />
            <Stat icon={<ShieldCheck className="size-4" />} label="paiements sécurisés" value="100 %" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="mb-1.5 inline-flex size-7 items-center justify-center rounded-md bg-white/10 text-accent">
        {icon}
      </div>
      <div className="font-display text-2xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-xs text-primary-foreground/70">{label}</div>
    </div>
  )
}

function Stat2M() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  )
}
