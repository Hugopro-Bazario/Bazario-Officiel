import { firstName, getClientIpFromHeaders, isTrackingEnabledServer, lastName, sha256 } from "@/lib/tracking/server-utils";

type MetaPurchasePayload = {
  eventId: string;
  eventSourceUrl: string;
  value: number;
  currency: string;
  contentIds: string[];
  numItems: number;
  customerEmail?: string | null;
  customerPhone?: string | null;
  customerName?: string | null;
  shippingAddress?: {
    city?: string | null;
    country?: string | null;
    postal_code?: string | null;
  } | null;
  fbc?: string;
  fbp?: string;
  requestHeaders: Headers;
};

function clean(value: string | undefined): string {
  return (value || "").trim();
}

export async function sendMetaPurchaseServerEvent(payload: MetaPurchasePayload) {
  if (!isTrackingEnabledServer()) return { skipped: true, reason: "tracking_disabled" as const };

  const pixelId = clean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
  const accessToken = clean(process.env.META_CAPI_ACCESS_TOKEN);
  if (!pixelId || !accessToken) return { skipped: true, reason: "missing_meta_config" as const };

  const endpoint = `https://graph.facebook.com/v20.0/${encodeURIComponent(pixelId)}/events`;
  const testEventCode = clean(process.env.META_CAPI_TEST_EVENT_CODE);

  const fn = firstName(payload.customerName);
  const ln = lastName(payload.customerName);
  const city = payload.shippingAddress?.city || "";
  const country = payload.shippingAddress?.country || "";
  const zip = payload.shippingAddress?.postal_code || "";
  const ip = getClientIpFromHeaders(payload.requestHeaders);
  const ua = payload.requestHeaders.get("user-agent") || undefined;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        action_source: "website",
        event_source_url: payload.eventSourceUrl,
        user_data: {
          em: sha256(payload.customerEmail),
          ph: sha256(payload.customerPhone),
          fn: sha256(fn),
          ln: sha256(ln),
          ct: sha256(city),
          country: sha256(country),
          zp: sha256(zip),
          client_ip_address: ip,
          client_user_agent: ua,
          fbc: payload.fbc || undefined,
          fbp: payload.fbp || undefined
        },
        custom_data: {
          currency: payload.currency,
          value: payload.value,
          content_ids: payload.contentIds,
          content_type: "product",
          num_items: payload.numItems
        }
      }
    ]
  };

  if (process.env.NODE_ENV !== "production" && testEventCode) {
    body.test_event_code = testEventCode;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Meta CAPI HTTP ${response.status}: ${text}`);
  }

  return { skipped: false, ok: true as const };
}
