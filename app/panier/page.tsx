"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function CartPage() {
  const searchParams = useSearchParams();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const { push } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const hasShownCancelledToast = useRef(false);
  const subtotal = useCartStore((state) => state.getTotal());
  const tva = subtotal * 0.2;
  const total = subtotal + tva;

  useEffect(() => {
    const isCancelled = searchParams.get("cancelled") === "true";
    if (isCancelled && !hasShownCancelledToast.current) {
      push("Paiement annule, votre panier est conserve.");
      hasShownCancelledToast.current = true;
    }
  }, [push, searchParams]);

  async function handleCheckout() {
    if (items.length === 0 || isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity
          }))
        })
      });

      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok) {
        push(data.error || "Impossible de lancer le paiement.");
        return;
      }
      if (!data.url) {
        push("URL de paiement introuvable.");
        return;
      }

      window.location.href = data.url;
    } catch {
      push("Erreur reseau. Merci de reessayer.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Panier</h1>
      {items.length === 0 ? <p className="text-zinc-600">Ton panier est vide.</p> : null}
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.product_id} className="flex gap-4 rounded-xl border border-zinc-200 p-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-md bg-zinc-100">
              {item.snapshot.image ? (
                <Image src={item.snapshot.image} alt={item.snapshot.title} fill className="object-cover" sizes="80px" />
              ) : null}
            </div>
            <div className="flex-1 space-y-2">
              <h2 className="font-semibold">{item.snapshot.title}</h2>
              <p className="text-sm text-zinc-600">{formatPrice(item.snapshot.price)}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.product_id, Number(event.target.value) || 1)}
                  className="w-20 rounded-md border border-zinc-300 px-2 py-1 text-sm"
                />
                <button className="text-sm text-rose-700 hover:underline" onClick={() => removeItem(item.product_id)} type="button">
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm">Total HT: {formatPrice(subtotal)}</p>
        <p className="text-sm">TVA (20%): {formatPrice(tva)}</p>
        <p className="mt-1 text-lg font-bold">Total TTC: {formatPrice(total)}</p>
        <Button className="mt-4 w-full" disabled={items.length === 0 || isLoading} onClick={handleCheckout}>
          {isLoading ? "Redirection vers Stripe..." : "Passer au paiement"}
        </Button>
      </section>
    </div>
  );
}
