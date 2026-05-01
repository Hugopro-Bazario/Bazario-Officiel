"use client"

import { useState } from "react"
import { Send, Search, Paperclip, ShoppingBag, CheckCheck } from "lucide-react"
import { mockThreads, type Thread, type Message } from "@/lib/data"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads)
  const [activeId, setActiveId] = useState<string>(mockThreads[0]?.id ?? "")
  const [draft, setDraft] = useState("")
  const [filter, setFilter] = useState("")

  const active = threads.find((t) => t.id === activeId)

  const filtered = threads.filter(
    (t) =>
      t.sellerName.toLowerCase().includes(filter.toLowerCase()) ||
      t.subject.toLowerCase().includes(filter.toLowerCase()),
  )

  function handleSelect(id: string) {
    setActiveId(id)
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: 0 } : t)))
  }

  function handleSend() {
    if (!draft.trim() || !active) return
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      fromMe: true,
      body: draft.trim(),
      time: "à l'instant",
    }
    setThreads((ts) =>
      ts.map((t) =>
        t.id === active.id
          ? { ...t, messages: [...t.messages, newMsg], lastAt: "à l'instant" }
          : t,
      ),
    )
    setDraft("")
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">Discutez avec vos vendeurs en toute sécurité.</p>
      </div>

      <div className="grid h-[calc(100vh-260px)] min-h-[520px] grid-cols-1 overflow-hidden rounded-2xl border bg-background lg:grid-cols-[340px_1fr]">
        {/* Threads list */}
        <aside className="flex flex-col border-r">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Rechercher une conversation"
                className="pl-9"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {filtered.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => handleSelect(t.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-border/50 px-4 py-3 text-left transition hover:bg-muted/50",
                    activeId === t.id && "bg-muted",
                  )}
                >
                  <Avatar src={t.sellerLogo} alt={t.sellerName} fallback={t.sellerName[0]} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{t.sellerName}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{t.lastAt}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {t.messages[t.messages.length - 1]?.body}
                    </p>
                    {t.unread > 0 && (
                      <Badge variant="default" className="mt-1.5 h-5 px-2 text-[10px]">
                        {t.unread} non lu
                      </Badge>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation */}
        {active ? (
          <section className="flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b p-4">
              <div className="flex items-center gap-3">
                <Avatar src={active.sellerLogo} alt={active.sellerName} fallback={active.sellerName[0]} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{active.sellerName}</span>
                    <Badge variant="success" className="h-5">
                      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success" />
                      en ligne
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{active.subject}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Voir la boutique</Button>
            </header>

            {/* Product context */}
            {active.productImage && (
              <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={active.productImage} alt="" fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">À propos de</p>
                  <p className="truncate text-sm font-medium">{active.productTitle}</p>
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Voir
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4">
              {active.messages.map((m) => (
                <div key={m.id} className={cn("flex", m.fromMe ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                      m.fromMe
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-background",
                    )}
                  >
                    <p className="leading-relaxed">{m.body}</p>
                    <div className={cn("mt-1 flex items-center gap-1 text-[10px]", m.fromMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      <span>{m.time}</span>
                      {m.fromMe && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Composer */}
            <footer className="border-t p-3">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" type="button" aria-label="Joindre un fichier">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Écrivez votre message..."
                  className="min-h-[44px] resize-none"
                  rows={1}
                />
                <Button onClick={handleSend} disabled={!draft.trim()} className="gap-1.5">
                  <Send className="h-4 w-4" />
                  Envoyer
                </Button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                Bazario protège vos échanges. Ne payez jamais en dehors de la plateforme.
              </p>
            </footer>
          </section>
        ) : (
          <div className="flex items-center justify-center text-muted-foreground">
            Sélectionnez une conversation
          </div>
        )}
      </div>
    </div>
  )
}
