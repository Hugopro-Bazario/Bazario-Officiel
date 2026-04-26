import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type LegalPageProps = {
  title: string
  description: string
  lastUpdated: string
  toc: { id: string; label: string }[]
  children: ReactNode
}

export function LegalPage({ title, description, lastUpdated, toc, children }: LegalPageProps) {
  return (
    <div className="bg-muted/30">
      {/* Hero */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Fil d'Ariane" className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Accueil
            </Link>
            <ChevronRight className="size-3" />
            <span>Informations légales</span>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{title}</span>
          </nav>
          <h1 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{description}</p>
          <p className="mt-4 text-xs text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[220px_1fr]">
        {/* Table of contents */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sommaire</p>
          <ol className="space-y-1 text-sm">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-baseline gap-2 rounded-md px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span className="text-xs tabular-nums text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        {/* Content */}
        <article className="prose prose-sm max-w-none rounded-2xl border border-border bg-background p-6 sm:p-10 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2:first-child]:mt-0 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_strong]:text-foreground [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
          {children}
        </article>
      </div>
    </div>
  )
}
