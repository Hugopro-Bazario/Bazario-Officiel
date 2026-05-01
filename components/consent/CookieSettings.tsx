"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useConsentStore } from "@/lib/consent";

export function CookieSettings() {
  const consent = useConsentStore((state) => state.getConsent());
  const setCustom = useConsentStore((state) => state.setCustom);
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(consent.analytics);
  const [marketing, setMarketing] = useState(consent.marketing);

  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-40 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium shadow"
        onClick={() => {
          setAnalytics(consent.analytics);
          setMarketing(consent.marketing);
          setOpen(true);
        }}
        type="button"
      >
        Cookies
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} title="Préférences cookies">
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
