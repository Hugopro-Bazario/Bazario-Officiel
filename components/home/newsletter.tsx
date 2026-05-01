"use client"

import * as React from "react"
import { Mail, Gift, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="container py-14 lg:py-16">
      <div className="relative isolate overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:p-16">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl" aria-hidden />
        <div className="bg-grain absolute inset-0 opacity-40 mix-blend-overlay" aria-hidden />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
              <Gift className="h-3.5 w-3.5" />
              Offre de bienvenue
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
              −10 € sur votre première commande.
            </h2>
            <p className="mt-4 max-w-md text-base text-primary-foreground/85">
              Inscrivez-vous à la newsletter Bazario et recevez en avant-première les ventes flash,
              les nouveautés et les codes promos exclusifs.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-primary-foreground/75">
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent" />
                1 email par semaine, pas plus
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent" />
                Désabonnement en 1 clic
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent" />
                100% RGPD
              </li>
            </ul>
          </div>

          <div className="lg:justify-self-end">
            {submitted ? (
              <div className="flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-success-foreground">
                  <Check className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">C&apos;est noté&nbsp;!</p>
                  <p className="text-sm text-primary-foreground/80">
                    Votre code promo est en route dans votre boîte mail.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex w-full flex-col gap-2 sm:max-w-md"
                aria-label="Inscription à la newsletter"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email
                </label>
                <div className="flex flex-col gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-2 backdrop-blur sm:flex-row sm:items-center sm:p-1.5">
                  <div className="relative flex flex-1 items-center">
                    <Mail className="absolute left-3 h-4 w-4 text-primary-foreground/60" />
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@exemple.com"
                      className="h-11 border-0 bg-transparent pl-9 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-0"
                    />
                  </div>
                  <Button type="submit" variant="accent" size="lg" className="shrink-0">
                    Recevoir mes -10 €
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="px-2 text-[11px] text-primary-foreground/60">
                  En vous inscrivant, vous acceptez notre{" "}
                  <a href="/legal/privacy" className="underline underline-offset-2 hover:text-primary-foreground">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
