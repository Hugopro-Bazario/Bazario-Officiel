"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Sheet({ open, onClose, children }: SheetProps) {
  return (
    <div className={cn("fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <button
        aria-label="Fermer le menu"
        className={cn(
          "absolute inset-0 bg-black/30 transition",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        type="button"
      />
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-72 bg-white p-5 shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </aside>
    </div>
  );
}
