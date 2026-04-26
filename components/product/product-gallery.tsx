"use client"
import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = React.useState(0)
  const safeImages = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
        {safeImages.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted transition-colors",
              i === active ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40",
            )}
            aria-label={`Voir image ${i + 1}`}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="order-1 sm:order-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <Image
            src={safeImages[active]}
            alt={alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
