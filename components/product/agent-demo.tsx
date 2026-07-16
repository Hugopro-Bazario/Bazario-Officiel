"use client"

import * as React from "react"
import { Bot, Sparkles, User } from "lucide-react"

type Exchange = { q: string; a: string }

/** Scénarios de démo par agent (simulation scriptée, clairement étiquetée). */
const SCENARIOS: Record<string, Exchange[]> = {
  "agent-orion-assistant-commercial": [
    {
      q: "Un prospect demande une remise de 30 %, tu fais quoi ?",
      a: "Je ne promets jamais une remise non validée. Je réponds : « Je comprends votre contrainte budgétaire. Je peux vous proposer l'offre annuelle (−17 %) ou vous mettre en relation avec l'équipe pour un volume supérieur. » Puis je crée une tâche dans votre CRM pour validation humaine. 📋",
    },
    {
      q: "Que fais-tu la nuit quand je dors ?",
      a: "Cette nuit par exemple : 14 leads qualifiés (score > 70), 6 relances de devis envoyées avec un timing naturel, 2 rendez-vous posés directement dans votre agenda, et 1 cas sensible escaladé pour votre validation au réveil. ☀️",
    },
    {
      q: "Comment tu apprends mes offres ?",
      a: "En 48 h : vous me donnez vos pages de vente, votre grille tarifaire et 3 exemples d'échanges réussis. J'apprends votre ton, vos arguments et vos limites. Ensuite, mode copilote : je propose, vous validez, jusqu'à ce que vous passiez en autonomie. 🎯",
    },
  ],
  "agent-luna-support-client": [
    {
      q: "Un client furieux veut un remboursement immédiat.",
      a: "Je désamorce d'abord : « Je suis vraiment désolée pour cette expérience, je m'en occupe personnellement. » Je vérifie sa commande, j'applique votre politique (garantie 14 j) et s'il reste inflexible ou hors périmètre, j'escalade à un humain avec tout le contexte résumé. 🤝",
    },
    {
      q: "Tu parles combien de langues ?",
      a: "28 langues, avec détection automatique. Un client écrit en portugais à 3 h du matin ? Il reçoit une réponse en portugais en 3 secondes, alignée sur votre FAQ et vos CGV. 🌍",
    },
    {
      q: "Quel est ton taux de résolution ?",
      a: "En moyenne 80 % des tickets résolus sans intervention humaine. Les 20 % restants sont escaladés avec un résumé complet : le client ne répète jamais son problème. Votre rapport hebdo détaille tout. 📊",
    },
  ],
  default: [
    {
      q: "Montre-moi ce que tu sais faire.",
      a: "Je travaille 24/7, j'apprends sur vos données, et je reste dans les limites que vous définissez : chaque action est visible dans votre tableau de bord, et l'escalade humaine est à un clic. Essayez-moi 14 jours — satisfait ou remboursé. ⚡",
    },
    {
      q: "En combien de temps es-tu opérationnel ?",
      a: "Installation guidée en 10 minutes, entraînement sur vos données en 48 h, mode copilote pour valider mes réponses, puis autonomie quand vous êtes prêt. 🚀",
    },
    {
      q: "Et si tu te trompes ?",
      a: "Deux garde-fous : je ne m'engage jamais hors du périmètre que vous m'avez fixé, et tout cas ambigu part en escalade humaine avec le contexte. Vous gardez toujours la main. 🛡️",
    },
  ],
}

export function AgentDemo({ slug, agentName }: { slug: string; agentName: string }) {
  const scenario = SCENARIOS[slug] ?? SCENARIOS.default
  const [history, setHistory] = React.useState<{ role: "user" | "agent"; text: string }[]>([])
  const [asked, setAsked] = React.useState<Set<number>>(new Set())
  const [typing, setTyping] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [history, typing])

  function ask(index: number) {
    if (typing || asked.has(index)) return
    const { q, a } = scenario[index]
    setAsked((prev) => new Set(prev).add(index))
    setHistory((h) => [...h, { role: "user", text: q }])
    setTyping(true)
    window.setTimeout(() => {
      setHistory((h) => [...h, { role: "agent", text: a }])
      setTyping(false)
    }, 900)
  }

  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-accent/30 bg-card">
      <header className="flex items-center justify-between gap-2 border-b border-accent/20 bg-secondary/50 px-4 py-2.5">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-soft-pulse rounded-full bg-success" />
          </span>
          Essayez {agentName} en direct
        </span>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
          Démo simulée
        </span>
      </header>

      <div ref={scrollRef} className="max-h-64 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {history.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Posez une question ci-dessous pour voir comment l&apos;agent répond. 👇
          </p>
        )}
        {history.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex justify-end gap-2">
              <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                {msg.text}
              </p>
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="h-3.5 w-3.5" />
              </span>
            </div>
          ) : (
            <div key={i} className="flex gap-2">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Bot className="h-3.5 w-3.5" />
              </span>
              <p className="max-w-[85%] rounded-2xl rounded-bl-sm border border-accent/20 bg-secondary/60 px-3.5 py-2 text-sm leading-relaxed">
                {msg.text}
              </p>
            </div>
          ),
        )}
        {typing && (
          <div className="flex gap-2">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <span className="rounded-2xl border border-accent/20 bg-secondary/60 px-3.5 py-2 text-sm text-muted-foreground">
              <span className="animate-soft-pulse">rédige une réponse…</span>
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-accent/10 p-3">
        {scenario.map((ex, i) => (
          <button
            key={i}
            type="button"
            onClick={() => ask(i)}
            disabled={typing || asked.has(i)}
            className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/15 disabled:opacity-40"
          >
            {ex.q}
          </button>
        ))}
      </div>

      <footer className="flex items-center gap-1.5 border-t border-accent/10 bg-secondary/30 px-4 py-2 text-[11px] text-muted-foreground">
        <Sparkles className="h-3 w-3 text-accent" />
        Démo scriptée à titre d&apos;illustration — la version complète se connecte à vos outils et apprend vos données.
      </footer>
    </section>
  )
}
