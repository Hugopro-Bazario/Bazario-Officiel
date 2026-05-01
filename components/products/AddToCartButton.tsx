"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useCartStore } from "@/lib/cart-store";
import { createEventId } from "@/lib/tracking/client";
import { trackMetaEvent } from "@/lib/tracking/meta";
import { trackTikTokEvent } from "@/lib/tracking/tiktok";

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string | null;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { push } = useToast();

  return (
    <Button
      className="w-full"
      onClick={() => {
        addItem({
          product_id: product.id,
          quantity: 1,
          snapshot: {
            title: product.title,
            price: product.price,
            image: product.image
          }
        });
        const eventId = createEventId();
        trackMetaEvent(
          "AddToCart",
          {
            content_ids: [product.id],
            content_type: "product",
            value: product.price,
            currency: "EUR"
          },
          { eventId }
        );
        trackTikTokEvent(
          "AddToCart",
          {
            contents: [{ content_id: product.id, content_name: product.title, quantity: 1, price: product.price }],
            value: product.price,
            currency: "EUR"
          },
          { eventId }
        );
        push("Produit ajoute au panier.");
      }}
      type="button"
    >
      Ajouter au panier
    </Button>
  );
}
