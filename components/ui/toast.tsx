"use client";

import { createContext, useContext, useMemo, useState } from "react";

type ToastMessage = { id: number; text: string };

const ToastContext = createContext<{ push: (text: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const api = useMemo(
    () => ({
      push(text: string) {
        const id = Date.now();
        setMessages((prev) => [...prev, { id, text }]);
        setTimeout(() => setMessages((prev) => prev.filter((item) => item.id !== id)), 1800);
      }
    }),
    []
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-2">
        {messages.map((item) => (
          <div key={item.id} className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white shadow-lg">
            {item.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider.");
  return context;
}
