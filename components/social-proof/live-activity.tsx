"use client"

import { useEffect, useState } from "react"
import { ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"

const ACTIVITIES = [
  { name: "Marie, Paris", action: "vient d'acheter", item: "Sac à main cuir cognac Aurélie" },
  { name: "Lucas, Lyon", action: "vient d'acheter", item: "Smartwatch Orbis Fit" },
  { name: "Emma, Bordeaux", action: "vient d'ajouter", item: "Eau de parfum Azur" },
  { name: "Théo, Marseille", action: "vient d'acheter", item: "Robot aspirateur Clean Pro" },
  { name: "Chloé, Lille", action: "vient d'acheter", item: "Parure de lit lin lavé" },
  { name: "Antoine, Nice", action: "vient d'acheter", item: "Bottines cuir Aurore" },
  { name: "Léa, Toulouse", action: "vient d'ajouter", item: "Bougie Cèdre & Iris" },
  { name: "Hugo, Nantes", action: "vient d'acheter", item: "Drone Skyline 4K" },
  { name: "Sarah, Rennes", action: "vient d'acheter", item: "Foulard 100% soie Éden" },
  { name: "Nathan, Strasbourg", action: "vient d'acheter", item: "Tapis yoga liège Pro" },
  { name: "Camille, Montpellier", action: "vient d'ajouter", item: "Palette ombres Terracotta" },
  { name: "Jules, Toulouse", action: "vient d'acheter", item: "Gourde isotherme Sage" },
] as const

const TIMES = ["il y a 2 min", "il y a 5 min", "il y a 8 min", "il y a 12 min", "il y a 18 min"]

const STORAGE_KEY = "bazario_live_activity_dismissed_until"

export function LiveActivity() {
  const [index, setIndex] = useState(-1)
  const [time, setTime] = useState(TIMES[0])
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      const until = Number(localStorage.getItem(STORAGE_KEY) ?? "0")
      if (Date.now() < until) return
    } catch {
      /* noop */
    }
    setDismissed(false)

    let i = 0
    const showFirst = window.setTimeout(() => {
      setIndex(0)
      setTime(TIMES[Math.floor(Math.random() * TIMES.length)])
    }, 4500)

    const cycle = window.setInterval(() => {
      setIndex(-1)
      window.setTimeout(() => {
        i = (i + 1) % ACTIVITIES.length
        setIndex(i)
        setTime(TIMES[Math.floor(Math.random() * TIMES.length)])
      }, 600)
    }, 9000)

    return () => {
      window.clearTimeout(showFirst)
      window.clearInterval(cycle)
    }
  }, [])

  function dismiss() {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + 1000 * 60 * 60 * 24))
    } catch {
      /* noop */
    }
  }

  if (dismissed) return null
  const item = index >= 0 ? ACTIVITIES[index] : null

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed bottom-4 left-4 z-40 max-w-[20rem] rounded-lg border border-border bg-card shadow-lg transition-all duration-500",
        item ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      {item && (
        <div className="flex items-start gap-3 p-3 pr-8">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div className="min-w-0 text-xs leading-snug">
            <p className="text-foreground">
              <span className="font-semibold">{item.name}</span> {item.action}
            </p>
            <p className="mt-0.5 truncate text-muted-foreground" title={item.item}>
              {item.item}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">{time}</p>
          </div>
          <button
            onClick={dismiss}
            aria-label="Fermer la notification"
            className="absolute right-1.5 top-1.5 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
