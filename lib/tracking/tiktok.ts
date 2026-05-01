"use client";

import { createEventId, hasMarketingConsent } from "@/lib/tracking/client";

type TikTokParams = Record<string, unknown>;

type TikTokWindow = Window & {
  ttq?: {
    track?: (eventName: string, params?: TikTokParams) => void;
  };
};

function canTrack(): boolean {
  if (typeof window === "undefined") return false;
  const trackingEnabled = String(process.env.NEXT_PUBLIC_BAZARIO_TRACKING_ENABLED || "").toLowerCase() === "true";
  if (!trackingEnabled) return false;
  const w = window as TikTokWindow;
  return hasMarketingConsent() && typeof w.ttq?.track === "function";
}

export function trackTikTokEvent(
  eventName: string,
  params: TikTokParams = {},
  options?: { eventId?: string }
): string {
  const eventId = options?.eventId || createEventId();
  if (!canTrack()) return eventId;

  const w = window as TikTokWindow;
  w.ttq?.track?.(eventName, { ...params, event_id: eventId });
  return eventId;
}

export function trackTikTokPageView(options?: { eventId?: string }): string {
  const eventId = options?.eventId || createEventId();
  return trackTikTokEvent("Pageview", {}, { eventId });
}
