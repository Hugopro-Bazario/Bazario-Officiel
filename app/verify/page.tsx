import type { Metadata } from "next"
import { ShieldCheck } from "lucide-react"
import { LicenseChecker } from "@/components/verify/license-checker"

export const metadata: Metadata = {
  title: "Vérifier une licence — Authenticité garantie",
  description:
    "Vérifiez publiquement l'authenticité d'une licence Bazario : chaque achat est signé cryptographiquement. Entrez votre code BZ-… et téléchargez votre certificat.",
  alternates: { canonical: "/verify" },
}

export default function VerifyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-cyber-grid absolute inset-0 opacity-60" />
        <div className="animate-glow-pulse absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-success/10 blur-3xl" />
      </div>

      <section className="container relative py-16 sm:py-24">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Registre des licences
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Vérifiez une <span className="text-gradient">licence Bazario</span>
          </h1>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Chaque achat est signé cryptographiquement (HMAC-SHA256). Collez un code de licence
            pour prouver son authenticité — utile pour vos clients, votre comptabilité ou une revente
            de droits autorisée.
          </p>
        </div>

        <LicenseChecker />

        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-muted-foreground">
          Votre code figure dans l&apos;email de confirmation et dans votre espace (Mes téléchargements).
          La vérification n&apos;expose aucune donnée personnelle.
        </p>
      </section>
    </div>
  )
}
