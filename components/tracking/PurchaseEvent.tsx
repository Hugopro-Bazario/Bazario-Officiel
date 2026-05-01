"use client";

import { useEffect, useRef } from "react";
import { consumeCheckoutEventId, createEventId } from "@/lib/tracking/client";
import { trackMetaEvent } from "@/lib/tracking/meta";
import { trackTikTokEvent } from "@/lib/tracking/tiktok";

export function PurchaseEvent({
  orderId,
  value,
  contentIds,
  numItems,
  eventIdFromServer
}: {
  orderId: string;
  value: number;
  contentIds: string[];
  numItems: number;
  eventIdFromServer?: string | null;
}) {
  const hasSent = useRef(false);

  useEffect(() => {
    if (hasSent.current) return;
    hasSent.current = true;

    const eventId = eventIdFromServer || consumeCheckoutEventId() || createEventId();

    trackMetaEvent(
      "Purchase",
      {
        value,
        currency: "EUR",
        content_ids: contentIds,
        content_type: "product",
        num_items: numItems,
        order_id: orderId
      },
      { eventId }
    );

    trackTikTokEvent(
      "CompletePayment",
      {
        value,
        currency: "EUR",
        contents: contentIds.map((contentId) => ({ content_id: contentId })),
        order_id: orderId
      },
      { eventId }
    );
  }, [contentIds, eventIdFromServer, numItems, orderId, value]);

  return null;
}
