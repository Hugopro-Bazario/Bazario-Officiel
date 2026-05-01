"use client";

import { createEventId, hasMarketingConsent } from "@/lib/tracking/client";

type MetaParams = Record<string, unknown>;

type MetaWindow = Window & {
  fbq?: (...args: unknown[]) => void;
};

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  const trackingEnabled = String(process.env.NEXT_PUBLIC_BAZARIO_TRACKING_ENABLED || "").toLowerCase() === "true";
  if (!trackingEnabled) return false;
  const w = window as MetaWindow;
  return hasMarketingConsent() && typeof w.fbq === "function";
}

export function trackMetaEvent(
  eventName: string,
  params: MetaParams = {},
  options?: { eventId?: string }
): string {
  const eventId = options?.eventId || createEventId();
  if (!canTrack()) return eventId;

  const w = window as MetaWindow;
  w.fbq?.("track", eventName, params, { eventID: eventId });
  return eventId;
}

export function trackMetaPageView(options?: { eventId?: string }): string {
  const eventId = options?.eventId || createEventId();
  if (!canTrack()) return eventId;
  const w = window as MetaWindow;
  w.fbq?.("track", "PageView", {}, { eventID: eventId });
  return eventId;
}
