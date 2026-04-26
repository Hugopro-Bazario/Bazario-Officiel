"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Building2, FileText, Landmark, ShieldCheck, Upload, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Logo } from "@/components/layout/logo"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: 1, title: "Boutique", icon: Building2, desc: "Identité & description" },
  { id: 2, title: "Identité", icon: FileText, desc: "Documents légaux" },
  { id: 3, title: "Banque", icon: Landmark, desc: "Compte de versement" },
  { id: 4, title: "Validation", icon: ShieldCheck, desc: "Récap & soumission" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  function next() {
    if (step < 4) setStep(step + 1)
    else setSubmitted(true)
  }
  function prev() {
    if (step > 1) setStep(step - 1)
  }

  if (submitted) return <SubmittedScreen />

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" aria-label="Retour à l'accueil">
            <Logo />
          </Link>
          <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
            Besoin d&apos;aide ?
          </Link>
        </div>
      </header>

      <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-[280px_1fr]">
        {/* Stepper sidebar */}
        <aside>
          <h1 className="font-display text-2xl font-bold">Devenir vendeur</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quelques minutes suffisent pour ouvrir votre boutique.
          </p>

          <ol className="mt-8 space-y-2">
            {STEPS.map((s) => {
              const Icon = s.icon
              const done = step > s.id
              const active = step === s.id
              return (
                <li
                  key={s.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-background p-3 transition",
                    active && "border-primary bg-primary/5",
                    done && "opacity-70",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                      done && "bg-success text-primary-foreground",
                      active && "bg-primary text-primary-foreground",
                      !done && !active && "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Étape {s.id} — {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </aside>

        {/* Form panel */}
        <main className="rounded-2xl border bg-background p-8 sm:p-10">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}

          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <Button variant="ghost" onClick={prev} disabled={step === 1} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Précédent
            </Button>
            <Button onClick={next} className="gap-1.5">
              {step === 4 ? "Soumettre mon dossier" : "Continuer"}
              {step !== 4 && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

function Step1() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Votre boutique</h2>
      <p className="mt-1 text-muted-foreground">Ces informations seront visibles par les acheteurs.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="shop" label="Nom de la boutique" placeholder="Atelier Hugo" required />
        <Field id="slug" label="Identifiant URL" placeholder="atelier-hugo" hint="bazario.com/s/atelier-hugo" required />
        <Field id="email" label="E-mail public de contact" type="email" placeholder="contact@atelier-hugo.com" required />
        <Field id="phone" label="Téléphone (privé)" placeholder="+33 6 12 34 56 78" required />
      </div>

      <div className="mt-5 space-y-1.5">
        <Label htmlFor="bio">Description courte</Label>
        <Textarea id="bio" placeholder="Présentez votre marque, votre histoire, vos produits phares..." />
      </div>

      <div className="mt-5">
        <Label>Logo de boutique</Label>
        <UploadBox />
      </div>
    </div>
  )
}

function Step2() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Vérification d&apos;identité</h2>
      <p className="mt-1 text-muted-foreground">
        Bazario vérifie chaque vendeur pour protéger les acheteurs (réglementation DSP2 / KYC).
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="legal" label="Type de structure" placeholder="Auto-entrepreneur / SASU / SARL..." required />
        <Field id="siret" label="SIRET / Numéro d'enregistrement" placeholder="123 456 789 00012" required />
        <Field id="vat" label="Numéro de TVA intracommunautaire" placeholder="FR12345678901" />
        <Field id="country" label="Pays d'expédition principal" placeholder="France" required />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <DocumentBox title="Pièce d'identité" desc="Carte d'identité ou passeport, recto verso" />
        <DocumentBox title="Justificatif d'entreprise" desc="K-bis, INPI ou attestation INSEE" />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg bg-muted p-4 text-sm">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          Vos documents sont chiffrés et utilisés uniquement pour la vérification. Ils ne sont jamais visibles par les acheteurs.
        </p>
      </div>
    </div>
  )
}

function Step3() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Compte bancaire</h2>
      <p className="mt-1 text-muted-foreground">
        Vos ventes seront versées sur ce compte tous les 7 jours, déduits des commissions Bazario.
      </p>

      <div className="mt-8 space-y-5">
        <Field id="holder" label="Titulaire du compte" placeholder="Hugo Pro" required />
        <Field id="iban" label="IBAN" placeholder="FR76 3000 6000 1112 3456 7890 189" required />
        <Field id="bic" label="BIC / SWIFT" placeholder="AGRIFRPP" required />
        <Field id="currency" label="Devise de versement" placeholder="EUR (recommandée)" required />
      </div>

      <div className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm">
        <p className="font-medium">Commissions Bazario</p>
        <ul className="mt-2 space-y-1 text-muted-foreground">
          <li>• 8 % sur chaque vente (catégorie Mode, Maison, Beauté)</li>
          <li>• 5 % sur Tech, Sport, Auto</li>
          <li>• Aucun frais d&apos;abonnement, aucun frais d&apos;ouverture</li>
        </ul>
      </div>
    </div>
  )
}

function Step4() {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Récapitulatif & validation</h2>
      <p className="mt-1 text-muted-foreground">Vérifiez vos informations puis soumettez votre dossier.</p>

      <div className="mt-8 space-y-4">
        <Recap label="Boutique" value="Atelier Hugo · bazario.com/s/atelier-hugo" />
        <Recap label="Contact" value="contact@atelier-hugo.com · +33 6 12 34 56 78" />
        <Recap label="Structure légale" value="SASU · SIRET 123 456 789 00012" />
        <Recap label="Documents" value="2 documents transmis · chiffrés" verified />
        <Recap label="Compte bancaire" value="FR76 **** **** **** **** **** 189 · AGRIFRPP" />
      </div>

      <label className="mt-8 flex items-start gap-3 rounded-lg bg-muted p-4 text-sm">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-primary" />
        <span className="text-muted-foreground">
          J&apos;atteste sur l&apos;honneur l&apos;exactitude des informations fournies et j&apos;accepte les{" "}
          <Link href="/seller-terms" className="text-primary hover:underline">
            conditions vendeurs Bazario
          </Link>
          .
        </span>
      </label>
    </div>
  )
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  hint,
  required,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  hint?: string
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} required={required} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

function UploadBox() {
  return (
    <button
      type="button"
      className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-muted/30 px-6 py-10 text-sm transition hover:border-primary/50 hover:bg-muted/50"
    >
      <Upload className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">Cliquez pour télécharger</span>
      <span className="text-xs text-muted-foreground">PNG, JPG ou SVG · 4 Mo max</span>
    </button>
  )
}

function DocumentBox({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
      <UploadBox />
    </div>
  )
}

function Recap({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-card p-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
      {verified && (
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
          <Check className="h-3 w-3" /> vérifié
        </span>
      )}
    </div>
  )
}

function SubmittedScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-lg rounded-3xl border bg-background p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold">Dossier reçu</h1>
        <p className="mt-2 text-muted-foreground">
          Notre équipe de conformité va vérifier vos informations sous 24 à 48 h ouvrées. Vous recevrez un e-mail dès l&apos;activation.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/seller/dashboard">Aller au tableau de bord</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
