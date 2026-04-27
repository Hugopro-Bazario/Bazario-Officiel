"use client"

import { useEffect, useState } from "react"
import { X, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "bazario_newsletter_popup"

export function NewsletterPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      /* noop */
    }

    const trigger = () => setOpen(true)

    const timer = window.setTimeout(trigger, 25000)

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger()
    }
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  function dismiss() {
    setOpen(false)
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* noop */
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes("@")) return
    setSubscribed(true)
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* noop */
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Inscription à la newsletter"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        aria-label="Fermer"
        onClick={dismiss}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        {!subscribed ? (
          <div className="px-6 py-8 text-center sm:px-8 sm:py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
              10 € offerts sur votre 1ère commande
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Inscrivez-vous au journal Bazario : nouveautés curatées, soldes anticipées et
              <span className="ml-1 inline-block rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">WELCOME10</span> dès 49 €.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="sr-only" htmlFor="newsletter-popup-email">
                Adresse e-mail
              </label>
              <input
                id="newsletter-popup-email"
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2"
              />
              <Button type="submit" size="lg" className="w-full">
                Recevoir mon code
              </Button>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Désinscription en un clic. Voir notre{" "}
                <a href="/legal/privacy" className="underline hover:text-foreground">
                  politique de confidentialité
                </a>
                .
              </p>
            </form>
          </div>
        ) : (
          <div className="px-6 py-10 text-center sm:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
              Bienvenue dans la maison
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Votre code{" "}
              <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold">WELCOME10</span> est
              prêt à l&apos;emploi.
            </p>
            <Button onClick={dismiss} size="lg" className="mt-6 w-full">
              Commencer mes achats
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
