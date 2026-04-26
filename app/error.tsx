"use client"

import Link from "next/link"
import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[v0] Bazario runtime error:", error)
  }, [error])

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="size-8" aria-hidden="true" />
        </div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-destructive">
          Erreur inattendue
        </p>
        <h1 className="mb-3 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Quelque chose s&apos;est mal passé.
        </h1>
        <p className="mb-8 text-pretty text-sm text-muted-foreground md:text-base">
          Pas d&apos;inquiétude — votre panier et votre compte sont en sécurité. Réessayez ou
          revenez à l&apos;accueil. Si le problème persiste, notre équipe est joignable 7j/7.
        </p>
        {error.digest && (
          <p className="mb-6 font-mono text-[11px] text-muted-foreground">
            Référence : {error.digest}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="size-4" aria-hidden="true" />
            Réessayer
          </Button>
          <Button variant="outline" asChild className="gap-2 bg-transparent">
            <Link href="/">
              <Home className="size-4" aria-hidden="true" />
              Accueil
            </Link>
          </Button>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/help">
              <MessageCircle className="size-4" aria-hidden="true" />
              Contacter le support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
