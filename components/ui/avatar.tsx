import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function Avatar({
  src,
  alt,
  fallback,
  size = 40,
  className,
}: {
  src?: string
  alt: string
  fallback: string
  size?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-semibold text-muted-foreground",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src || "/placeholder.svg"} alt={alt} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  )
}
