"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useCartStore } from "@/lib/cart-store";

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
        push("Produit ajoute au panier.");
      }}
      type="button"
    >
      Ajouter au panier
    </Button>
  );
}
