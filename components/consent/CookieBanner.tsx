"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useConsentStore } from "@/lib/consent";

export function CookieBanner() {
  const consent = useConsentStore((state) => state.getConsent());
  const hasConsented = useConsentStore((state) => state.hasConsented);
  const acceptAll = useConsentStore((state) => state.acceptAll);
  const rejectAll = useConsentStore((state) => state.rejectAll);
  const setCustom = useConsentStore((state) => state.setCustom);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  if (hasConsented()) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl md:left-auto md:max-w-xl">
        <p className="text-sm text-zinc-700">
          Nous utilisons des cookies pour améliorer votre expérience et mesurer l&apos;efficacité de nos publicités.
          Vous pouvez accepter, refuser ou personnaliser vos choix.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            className="rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
            onClick={acceptAll}
            type="button"
          >
            Tout accepter
          </button>
          <button
            className="rounded-md border border-zinc-900 px-4 py-2 text-sm font-medium text-zinc-900"
            onClick={rejectAll}
            type="button"
          >
            Tout refuser
          </button>
          <button
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            onClick={() => setOpen(true)}
            type="button"
          >
            Personnaliser
          </button>
          <Link href="/politique-de-cookies" className="text-sm text-zinc-600 underline">
            Politique de cookies
          </Link>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title="Paramètres cookies">
        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-md border border-zinc-200 p-3 text-sm">
            <span>Nécessaires (obligatoire)</span>
            <input checked disabled type="checkbox" />
          </label>
          <label className="flex items-center justify-between rounded-md border border-zinc-200 p-3 text-sm">
            <span>Analytics</span>
            <input checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} type="checkbox" />
          </label>
          <label className="flex items-center justify-between rounded-md border border-zinc-200 p-3 text-sm">
            <span>Marketing</span>
            <input checked={marketing} onChange={(e) => setMarketing(e.target.checked)} type="checkbox" />
          </label>
          <div className="flex justify-end">
            <button
              className="rounded-md border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
              onClick={() => {
                setCustom({ analytics, marketing });
                setOpen(false);
              }}
              type="button"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
