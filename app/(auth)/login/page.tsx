"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = "/account"
    }, 800)
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-balance">Bon retour sur Bazario</h1>
      <p className="mt-2 text-muted-foreground">Connectez-vous pour suivre vos commandes et profiter de vos avantages Premium.</p>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11 gap-2" type="button">
          <GoogleIcon /> Google
        </Button>
        <Button variant="outline" className="h-11 gap-2" type="button">
          <AppleIcon /> Apple
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">ou par e-mail</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="vous@exemple.com" className="pl-10" />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              required
              placeholder="••••••••"
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border-input accent-primary" defaultChecked />
          Se souvenir de moi
        </label>

        <Button type="submit" className="h-11 w-full" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.9a5 5 0 0 1-2.18 3.3v2.74h3.52c2.06-1.9 3.26-4.7 3.26-8.07z" />
      <path fill="#34A853" d="M12 23c2.95 0 5.43-.98 7.24-2.66l-3.52-2.74c-.98.66-2.23 1.05-3.72 1.05-2.86 0-5.28-1.93-6.14-4.52H2.22v2.83A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.86 14.13a6.6 6.6 0 0 1 0-4.26V7.04H2.22a11 11 0 0 0 0 9.92l3.64-2.83z" />
      <path fill="#EA4335" d="M12 5.5c1.61 0 3.05.55 4.18 1.63l3.13-3.13C17.42 2.13 14.95 1 12 1A11 11 0 0 0 2.22 7.04l3.64 2.83C6.72 7.43 9.14 5.5 12 5.5z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M16.37 1.43c0 1.14-.42 2.27-1.27 3.27-1.02 1.21-2.27 1.91-3.62 1.8-.16-1.13.36-2.3 1.16-3.21.9-1 2.4-1.74 3.73-1.86zM20.7 17.45c-.6 1.4-.89 2.02-1.66 3.26-1.07 1.73-2.58 3.88-4.46 3.9-1.66.02-2.09-1.07-4.35-1.06-2.27.01-2.74 1.08-4.4 1.06-1.88-.02-3.31-1.97-4.39-3.7C-.84 16.81-1.16 11.18 1.6 8.18c1.32-1.43 3.4-2.34 5.36-2.37 2.11-.04 4.1 1.42 4.35 1.42.25 0 2.66-1.75 4.95-1.49.96.04 3.65.39 5.38 2.92-4.71 2.58-3.94 9.32-1.94 8.79z" />
    </svg>
  )
}
