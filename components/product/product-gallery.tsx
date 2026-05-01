"use client"
import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  alt,
  badge,
}: {
  images: string[]
  alt: string
  badge?: { text: string; tone: "accent" | "destructive" | "primary" }
}) {
  const [active, setActive] = React.useState(0)
  const [lightbox, setLightbox] = React.useState(false)
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"]

  const next = () => setActive((i) => (i + 1) % safeImages.length)
  const prev = () => setActive((i) => (i - 1 + safeImages.length) % safeImages.length)

  React.useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox])

  const toneClass =
    badge?.tone === "accent"
      ? "bg-accent text-accent-foreground"
      : badge?.tone === "destructive"
        ? "bg-destructive text-destructive-foreground"
        : "bg-primary text-primary-foreground"

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[88px_1fr]">
        {/* Thumbnails */}
        <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible no-scrollbar">
          {safeImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all",
                i === active
                  ? "border-primary shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
              aria-label={`Voir image ${i + 1}`}
            >
              <Image src={src} alt="" fill sizes="88px" className="object-cover" />
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="order-1 sm:order-2">
          <div className="group relative aspect-square overflow-hidden rounded-2xl border bg-secondary">
            <Image
              src={safeImages[active]}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Badge top-left */}
            {badge && (
              <div className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm", toneClass)}>
                {badge.text}
              </div>
            )}

            {/* Counter top-right */}
            <div className="absolute right-4 top-4 rounded-full bg-foreground/70 px-2.5 py-1 text-[11px] font-medium text-background backdrop-blur-sm">
              {active + 1} / {safeImages.length}
            </div>

            {/* Zoom button */}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur-sm transition hover:bg-background"
              aria-label="Agrandir"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {/* Arrows */}
            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-background"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-background"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4">
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[80vh] w-[80vw] max-w-5xl">
            <Image
              src={safeImages[active]}
              alt={alt}
              fill
              sizes="80vw"
              className="object-contain"
            />
          </div>
          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Suivant"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
