import Image from "next/image"
import { Star, BadgeCheck, ThumbsUp } from "lucide-react"
import type { Product } from "@/lib/data"

export function Reviews({ product }: { product: Product }) {
  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    pct:
      star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2,
  }))

  return (
    <section className="rounded-lg border bg-card p-6 sm:p-8">
      <h2 className="font-display text-xl font-bold sm:text-2xl">
        Avis clients
      </h2>

      <div className="mt-4 grid gap-6 md:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-6 text-center">
          <p className="font-display text-5xl font-bold tabular-nums">
            {product.rating.toFixed(1)}
          </p>
          <div className="mt-1 inline-flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(product.rating)
                    ? "h-4 w-4 fill-accent text-accent"
                    : "h-4 w-4 text-muted-foreground/30"
                }
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {product.reviewCount.toLocaleString("fr-FR")} avis vérifiés
          </p>
        </div>

        <div className="space-y-2">
          {buckets.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-xs">
              <span className="inline-flex w-6 items-center gap-0.5 font-medium">
                {b.star}
                <Star className="h-3 w-3 fill-accent text-accent" />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-muted-foreground">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-8 space-y-6">
        {product.reviews.map((r) => (
          <li key={r.id} className="border-t pt-6 first:border-t-0 first:pt-0">
            <div className="flex items-start gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                <Image src={r.avatar} alt="" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{r.author}</p>
                  {r.verified && (
                    <span className="inline-flex items-center gap-0.5 text-xs text-success">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Achat vérifié
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    · {new Date(r.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <div className="mt-1 inline-flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < r.rating
                          ? "h-3.5 w-3.5 fill-accent text-accent"
                          : "h-3.5 w-3.5 text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium">{r.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                <button className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Utile ({r.helpful})
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
