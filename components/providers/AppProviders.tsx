"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { ConsentProvider } from "@/components/consent/ConsentProvider";

export function AppProviders({
  children,
  metaPixelId,
  tiktokPixelId,
  trackingEnabled
}: {
  children: ReactNode;
  metaPixelId?: string;
  tiktokPixelId?: string;
  trackingEnabled: boolean;
}) {
  return (
    <ToastProvider>
      <ConsentProvider
        metaPixelId={metaPixelId}
        tiktokPixelId={tiktokPixelId}
        trackingEnabled={trackingEnabled}
      />
      {children}
    </ToastProvider>
  );
}
