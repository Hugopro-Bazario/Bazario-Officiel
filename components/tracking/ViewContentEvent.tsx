"use client";

import { useEffect } from "react";
import { createEventId } from "@/lib/tracking/client";
import { trackMetaEvent } from "@/lib/tracking/meta";
import { trackTikTokEvent } from "@/lib/tracking/tiktok";

export function ViewContentEvent({
  productId,
  title,
  price
}: {
  productId: string;
  title: string;
  price: number;
}) {
  useEffect(() => {
    const eventId = createEventId();
    trackMetaEvent(
      "ViewContent",
      {
        content_ids: [productId],
        content_type: "product",
        value: price,
        currency: "EUR",
        content_name: title
      },
      { eventId }
    );
    trackTikTokEvent(
      "ViewContent",
      {
        contents: [{ content_id: productId, content_name: title, quantity: 1, price }],
        value: price,
        currency: "EUR"
      },
      { eventId }
    );
  }, [price, productId, title]);

  return null;
}
