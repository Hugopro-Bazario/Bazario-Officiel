"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createEventId } from "@/lib/tracking/client";
import { trackMetaPageView } from "@/lib/tracking/meta";
import { trackTikTokPageView } from "@/lib/tracking/tiktok";

export function TrackingRouteEvents() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const eventId = createEventId();
    trackMetaPageView({ eventId });
    trackTikTokPageView({ eventId });
  }, [pathname]);

  return null;
}
