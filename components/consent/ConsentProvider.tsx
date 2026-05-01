"use client";

import { CookieBanner } from "@/components/consent/CookieBanner";
import { CookieSettings } from "@/components/consent/CookieSettings";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { TrackingRouteEvents } from "@/components/tracking/TrackingRouteEvents";
import { TikTokPixel } from "@/components/tracking/TikTokPixel";
import { useConsentStore } from "@/lib/consent";

export function ConsentProvider({ metaPixelId, tiktokPixelId, trackingEnabled }: { metaPixelId?: string; tiktokPixelId?: string; trackingEnabled: boolean }) {
  const consent = useConsentStore((state) => state.getConsent());
  const hasConsented = useConsentStore((state) => state.hasConsented);

  const canLoadMarketingPixels = trackingEnabled && hasConsented() && consent.marketing;

  return (
    <>
      <CookieBanner />
      <CookieSettings />
      {canLoadMarketingPixels && metaPixelId ? <MetaPixel pixelId={metaPixelId} /> : null}
      {canLoadMarketingPixels && tiktokPixelId ? <TikTokPixel pixelId={tiktokPixelId} /> : null}
      {canLoadMarketingPixels ? <TrackingRouteEvents /> : null}
    </>
  );
}
