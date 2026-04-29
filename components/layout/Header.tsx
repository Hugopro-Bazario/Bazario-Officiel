"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/produits", label: "Produits" },
  { href: "/a-propos", label: "A propos" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const itemsCount = useCartStore((state) => state.getItemsCount());

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-black">
          Bazario
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-zinc-700 hover:text-zinc-950">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/panier" className="relative rounded-md border border-zinc-300 px-3 py-2 text-sm">
            Panier
            {itemsCount > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-zinc-900 px-1.5 py-0.5 text-xs text-white">
                {itemsCount}
              </span>
            ) : null}
          </Link>
          <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm md:hidden" onClick={() => setOpen(true)} type="button">
            Menu
          </button>
        </div>
      </div>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <div className="space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-zinc-700 hover:text-zinc-950"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Sheet>
    </header>
  );
}
