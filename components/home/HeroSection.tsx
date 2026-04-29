import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function HeroSection({ hero }: { hero: Product | null }) {
  const image = hero?.images[0] || "https://placehold.co/1280x720/f4f4f5/18181b?text=Bazario";

  return (
    <section className="grid gap-8 rounded-2xl bg-zinc-100 p-6 md:grid-cols-2 md:p-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">Selection Bazario</p>
        <h1 className="text-3xl font-black leading-tight md:text-4xl">
          Des produits utiles, choisis pour simplifier ton quotidien.
        </h1>
        <p className="text-zinc-700">
          Livraison Europe, retours simples 30 jours, paiement securise. Catalogue mis a jour en continu.
        </p>
        {hero ? (
          <div className="flex items-center gap-3">
            <Link href={`/produits/${hero.slug}`}>
              <Button>Voir le produit phare</Button>
            </Link>
            <span className="text-sm text-zinc-700">{formatPrice(hero.price)}</span>
          </div>
        ) : null}
      </div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
        <Image src={image} alt={hero?.title || "Produit Bazario"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </section>
  );
}
