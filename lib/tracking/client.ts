"use client";

const CHECKOUT_EVENT_ID_KEY = "bazario-tracking-checkout-event-id";

function readConsent() {
  try {
    const raw = localStorage.getItem("bazario-consent");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { consent?: { marketing?: boolean; timestamp?: string } } };
    return parsed?.state?.consent || null;
  } catch {
    return null;
  }
}

export function hasMarketingConsent(): boolean {
  if (typeof window === "undefined") return false;
  const consent = readConsent();
  return Boolean(consent?.marketing);
}

export function createEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function setCheckoutEventId(eventId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHECKOUT_EVENT_ID_KEY, eventId);
}

export function getCheckoutEventId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CHECKOUT_EVENT_ID_KEY);
}

export function consumeCheckoutEventId(): string | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CHECKOUT_EVENT_ID_KEY);
  if (value) localStorage.removeItem(CHECKOUT_EVENT_ID_KEY);
  return value;
}

export function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function getTrackingPayloadFromBrowser() {
  return {
    fbc: getCookieValue("_fbc") || "",
    fbp: getCookieValue("_fbp") || "",
    ttclid: getCookieValue("ttclid") || "",
    ttp: getCookieValue("_ttp") || "",
    tracking_consent: hasMarketingConsent() ? "granted" : "denied"
  };
}
