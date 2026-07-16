"use client"

import * as React from "react"
import Link from "next/link"
import { BadgeCheck, Loader2, ShieldX, FileCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Result =
  | { valid: true; product: { title: string; brand: string; slug: string; category: string } }
  | { valid: false; reason: string }

export function LicenseChecker() {
  const [code, setCode] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<Result | null>(null)

  async function check(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`/api/license/verify?code=${encodeURIComponent(code.trim())}`)
      setResult((await res.json()) as Result)
    } catch {
      setResult({ valid: false, reason: "Vérification impossible. Réessayez." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <form onSubmit={check} className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="BZ-P1-ABC123-4F2A9C31"
          aria-label="Code de licence"
          className="h-12 font-mono uppercase"
        />
        <Button type="submit" size="lg" variant="accent" disabled={loading} className="shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCheck2 className="h-4 w-4" />}
          Vérifier
        </Button>
      </form>

      {result && (
        <div
          role="status"
          className={`mt-6 rounded-2xl border p-6 ${
            result.valid ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"
          }`}
        >
          {result.valid ? (
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                <BadgeCheck className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-success">Licence authentique ✓</p>
                <p className="mt-1 text-sm">
                  <Link href={`/p/${result.product.slug}`} className="font-semibold hover:text-accent">
                    {result.product.title}
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground">
                  {result.product.brand} · {result.product.category}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a href={`/api/certificate?code=${encodeURIComponent(code.trim())}`} target="_blank" rel="noopener">
                    Télécharger le certificat
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                <ShieldX className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-destructive">Licence non reconnue</p>
                <p className="mt-1 text-sm text-muted-foreground">{result.reason}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
