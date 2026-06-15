"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product_id: string;
  quantity: number;
  snapshot: {
    title: string;
    price: number;
    image: string | null;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.product_id === item.product_id);
          if (!existing) return { items: [...state.items, item] };
          return {
            items: state.items.map((entry) =>
              entry.product_id === item.product_id
                ? { ...entry, quantity: Math.min(entry.quantity + item.quantity, 20) }
                : entry
            )
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((entry) => entry.product_id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((entry) =>
            entry.product_id === productId ? { ...entry, quantity: Math.min(Math.max(quantity, 1), 20) } : entry
          )
        })),
      clearCart: () => set({ items: [] }),
      getTotal: () =>
        get().items.reduce((sum, item) => {
          return sum + item.snapshot.price * item.quantity;
        }, 0),
      getItemsCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0)
    }),
    { name: "bazario-cart" }
  )
);
