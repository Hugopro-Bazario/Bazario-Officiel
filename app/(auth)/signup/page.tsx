"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, Store, ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer")
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = role === "seller" ? "/seller/onboarding" : "/account"
    }, 800)
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-balance">Rejoindre Bazario</h1>
      <p className="mt-2 text-muted-foreground">Créez votre compte gratuit en moins d&apos;une minute.</p>

      {/* Role switch */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <RoleCard
          active={role === "buyer"}
          onClick={() => setRole("buyer")}
          icon={<ShoppingBag className="h-5 w-5" />}
          title="Acheter"
          desc="Découvrir et commander"
        />
        <RoleCard
          active={role === "seller"}
          onClick={() => setRole("seller")}
          icon={<Store className="h-5 w-5" />}
          title="Vendre"
          desc="Ouvrir une boutique"
        />
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label="Prénom" icon={<User className="h-4 w-4" />} placeholder="Hugo" />
          <Field id="lastName" label="Nom" placeholder="Pro" />
        </div>

        {role === "seller" && (
          <Field id="shopName" label="Nom de la boutique" icon={<Store className="h-4 w-4" />} placeholder="Atelier Hugo" />
        )}

        <Field id="email" type="email" label="E-mail" icon={<Mail className="h-4 w-4" />} placeholder="vous@exemple.com" />

        <div className="space-y-1.5">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              required
              placeholder="8 caractères minimum"
              className="pl-10 pr-10"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPwd ? "Masquer" : "Afficher"}
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <ul className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-xs">
          <Bullet>Au moins 8 caractères</Bullet>
          <Bullet>Une majuscule et un chiffre recommandés</Bullet>
          <Bullet>Pas votre date de naissance ni d&apos;information évidente</Bullet>
        </ul>

        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-input accent-primary" />
          <span>
            J&apos;accepte les{" "}
            <Link href="/terms" className="text-primary hover:underline">
              CGU
            </Link>{" "}
            et la{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>

        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? "Création..." : role === "seller" ? "Créer ma boutique" : "Créer mon compte"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}

function RoleCard({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition",
        active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border hover:border-primary/50",
      )}
    >
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  )
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  icon,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  icon?: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {icon ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span> : null}
        <Input id={id} type={type} required placeholder={placeholder} className={icon ? "pl-10" : ""} />
      </div>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-muted-foreground">
      <Check className="h-3 w-3 text-success" />
      {children}
    </li>
  )
}
