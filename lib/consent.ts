"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const CONSENT_STORAGE_KEY = "bazario-consent";
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 395; // ~13 mois

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

type ConsentInput = {
  analytics: boolean;
  marketing: boolean;
};

type ConsentState = {
  consent: ConsentPreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  setCustom: (prefs: ConsentInput) => void;
  hasConsented: () => boolean;
  getConsent: () => ConsentPreferences;
};

function nowIso() {
  return new Date().toISOString();
}

function createConsent(prefs: ConsentInput): ConsentPreferences {
  return {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: nowIso()
  };
}

function isConsentFresh(timestamp: string): boolean {
  const value = new Date(timestamp).getTime();
  if (!Number.isFinite(value)) return false;
  return Date.now() - value <= CONSENT_MAX_AGE_MS;
}

export const useConsentStore = create<ConsentState>()(
  persist(
    (set, get) => ({
      consent: createConsent({ analytics: false, marketing: false }),
      acceptAll: () => set({ consent: createConsent({ analytics: true, marketing: true }) }),
      rejectAll: () => set({ consent: createConsent({ analytics: false, marketing: false }) }),
      setCustom: (prefs) => set({ consent: createConsent(prefs) }),
      hasConsented: () => isConsentFresh(get().consent.timestamp),
      getConsent: () => get().consent
    }),
    {
      name: CONSENT_STORAGE_KEY
    }
  )
);
