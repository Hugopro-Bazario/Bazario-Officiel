import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/ProductGallery";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductCard } from "@/components/products/ProductCard";
import { ViewContentEvent } from "@/components/tracking/ViewContentEvent";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produit introuvable" };

  return {
    title: `${product.title} | Bazario`,
    description: product.description || "Produit disponible sur Bazario.",
    alternates: { canonical: `/produits/${slug}` },
    openGraph: {
      title: product.title,
      description: product.description || "Produit Bazario",
      images: product.images.slice(0, 1),
      type: "website",
      url: `https://www.bazario-official.com/produits/${slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description || "Produit Bazario",
      images: product.images.slice(0, 1)
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, 4);
  const isPromo = typeof product.compare_price === "number" && product.compare_price > product.price;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || "",
    image: product.images,
    sku: product.cj_product_id,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: String(product.price),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `https://www.bazario-official.com/produits/${slug}`
    }
  };

  return (
    <article className="space-y-8">
      <ViewContentEvent productId={product.id} title={product.title} price={product.price} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery title={product.title} images={product.images} />
        <section className="space-y-4">
          <h1 className="text-3xl font-black">{product.title}</h1>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {isPromo ? <span className="text-zinc-500 line-through">{formatPrice(product.compare_price!)}</span> : null}
            {isPromo ? <Badge>Promo</Badge> : null}
          </div>
          <p className="text-zinc-700">{product.description || "Description produit a venir."}</p>
          <AddToCartButton product={{ id: product.id, title: product.title, price: product.price, image: product.images[0] || null }} />
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            <p className="font-semibold">Garantie 30 jours satisfait ou rembourse</p>
            <p className="mt-1">Livraison Europe estimee entre 5 et 10 jours selon la destination.</p>
          </div>
        </section>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Avis clients</h2>
        <p className="text-sm text-zinc-600">Bloc avis en attente d'integration Loox/Judge.me (phase v2).</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Produits similaires</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((entry) => (
            <ProductCard key={entry.id} product={entry} />
          ))}
        </div>
      </section>
    </article>
  );
}
