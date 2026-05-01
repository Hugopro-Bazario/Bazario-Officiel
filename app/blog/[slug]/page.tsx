import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowRight, Clock, Info, Lightbulb, AlertTriangle, ChevronLeft } from "lucide-react"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { getProductBySlug, formatPrice } from "@/lib/data"

const SITE = "https://www.bazario-official.com"

const CATEGORY_LABEL: Record<string, string> = {
  guides: "Guides d'achat",
  comparatifs: "Comparatifs",
  entretien: "Entretien",
  tendances: "Tendances",
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Article introuvable | Bazario" }
  return {
    title: `${post.title} | Bazario`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  const related = getRelatedPosts(post.slug)
  const relatedProducts = (post.relatedSlugs ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [`${SITE}${post.cover}`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "Bazario",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${post.slug}` },
    keywords: post.keywords.join(", "),
  }

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
    ],
  }

  // Build TOC from h2 sections
  const toc = post.body
    .filter((s): s is { type: "h2"; id: string; text: string } => s.type === "h2")
    .map((s) => ({ id: s.id, text: s.text }))

  return (
    <article className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top breadcrumb */}
      <div className="container pt-6 text-sm text-muted-foreground">
        <Link href="/blog" className="inline-flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Tous les articles
        </Link>
      </div>

      {/* Header */}
      <header className="container max-w-3xl py-8 md:py-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
          {CATEGORY_LABEL[post.category]}
        </p>
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          {post.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.author.name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} min de lecture
          </span>
        </div>
      </header>

      {/* Cover */}
      <div className="container max-w-5xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={post.cover || "/placeholder.svg"}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Body */}
      <div className="container grid max-w-5xl grid-cols-1 gap-10 py-10 md:grid-cols-[1fr_240px] md:py-14">
        <div className="prose-bazario max-w-none">
          {/* TOC mobile */}
          {toc.length > 0 && (
            <nav
              aria-label="Sommaire"
              className="mb-8 rounded-xl border bg-muted/30 p-5 md:hidden"
            >
              <p className="mb-3 text-sm font-semibold">Sommaire</p>
              <ol className="space-y-2 text-sm">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a className="text-muted-foreground hover:text-foreground" href={`#${t.id}`}>
                      {i + 1}. {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="space-y-5 text-[1.02rem] leading-relaxed text-foreground/90">
            {post.body.map((section, idx) => {
              if (section.type === "h2") {
                return (
                  <h2
                    key={idx}
                    id={section.id}
                    className="mt-10 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
                  >
                    {section.text}
                  </h2>
                )
              }
              if (section.type === "p") {
                return <p key={idx}>{section.text}</p>
              }
              if (section.type === "ul") {
                return (
                  <ul key={idx} className="ml-5 list-disc space-y-2 marker:text-muted-foreground">
                    {section.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                )
              }
              if (section.type === "ol") {
                return (
                  <ol key={idx} className="ml-5 list-decimal space-y-2 marker:text-muted-foreground">
                    {section.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ol>
                )
              }
              if (section.type === "callout") {
                const Icon = section.tone === "tip" ? Lightbulb : section.tone === "warning" ? AlertTriangle : Info
                const toneClass =
                  section.tone === "warning"
                    ? "border-destructive/30 bg-destructive/5"
                    : section.tone === "tip"
                      ? "border-accent/40 bg-accent/5"
                      : "border-border bg-muted/40"
                return (
                  <aside
                    key={idx}
                    className={`my-6 flex gap-4 rounded-xl border p-5 ${toneClass}`}
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                    <div>
                      <p className="font-semibold">{section.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {section.text}
                      </p>
                    </div>
                  </aside>
                )
              }
              if (section.type === "cta") {
                const product = getProductBySlug(section.productSlug)
                if (!product) return null
                return (
                  <Link
                    key={idx}
                    href={`/p/${product.slug}`}
                    className="my-6 flex items-center gap-4 rounded-xl border bg-card p-4 transition hover:border-foreground/30"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        Produit recommandé
                      </p>
                      <p className="mt-1 line-clamp-2 font-semibold leading-snug">
                        {section.label}
                      </p>
                      <p className="mt-1 text-sm font-bold tabular-nums">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </Link>
                )
              }
              return null
            })}
          </div>
        </div>

        {/* TOC desktop */}
        {toc.length > 0 && (
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-xl border bg-card p-5">
              <p className="mb-3 text-sm font-semibold">Sommaire</p>
              <ol className="space-y-2 text-sm">
                {toc.map((t, i) => (
                  <li key={t.id}>
                    <a
                      className="text-muted-foreground transition hover:text-foreground"
                      href={`#${t.id}`}
                    >
                      {i + 1}. {t.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        )}
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t bg-muted/30 py-10 md:py-14">
          <div className="container">
            <h2 className="mb-6 font-display text-xl font-bold tracking-tight md:text-2xl">
              Produits cités dans cet article
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/p/${p.slug}`}
                  className="group overflow-hidden rounded-xl border bg-card transition hover:border-foreground/20"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={p.images[0] || "/placeholder.svg"}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.brand}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold tabular-nums">
                      {formatPrice(p.price, p.currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t py-10 md:py-14">
          <div className="container">
            <h2 className="mb-6 font-display text-xl font-bold tracking-tight md:text-2xl">
              À lire ensuite
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group grid grid-cols-[1fr_140px] gap-4 overflow-hidden rounded-xl border bg-card transition hover:border-foreground/20"
                >
                  <div className="flex flex-col justify-center p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {CATEGORY_LABEL[r.category]}
                    </p>
                    <h3 className="mt-1 font-display text-base font-bold leading-snug">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                  <div className="relative aspect-square">
                    <Image
                      src={r.cover || "/placeholder.svg"}
                      alt={r.title}
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
