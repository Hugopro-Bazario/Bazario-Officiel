import { getClientIpFromHeaders, isTrackingEnabledServer, sha256 } from "@/lib/tracking/server-utils";

type TikTokPurchasePayload = {
  eventId: string;
  value: number;
  currency: string;
  contents: Array<{ content_id: string; content_name: string; quantity: number; price: number }>;
  customerEmail?: string | null;
  customerPhone?: string | null;
  ttp?: string;
  ttclid?: string;
  requestHeaders: Headers;
};

function clean(value: string | undefined): string {
  return (value || "").trim();
}

export async function sendTikTokPurchaseServerEvent(payload: TikTokPurchasePayload) {
  if (!isTrackingEnabledServer()) return { skipped: true, reason: "tracking_disabled" as const };

  const pixelId = clean(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID);
  const accessToken = clean(process.env.TIKTOK_EVENTS_API_TOKEN);
  if (!pixelId || !accessToken) return { skipped: true, reason: "missing_tiktok_config" as const };

  const endpoint = "https://business-api.tiktok.com/open_api/v1.3/event/track/";
  const testCode = clean(process.env.TIKTOK_EVENTS_TEST_CODE);
  const ip = getClientIpFromHeaders(payload.requestHeaders);
  const ua = payload.requestHeaders.get("user-agent") || undefined;

  const body: Record<string, unknown> = {
    event_source: "web",
    event_source_id: pixelId,
    data: [
      {
        event: "CompletePayment",
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        user: {
          email: sha256(payload.customerEmail),
          phone: sha256(payload.customerPhone),
          ttp: payload.ttp || undefined,
          ttclid: payload.ttclid || undefined,
          ip,
          user_agent: ua
        },
        properties: {
          currency: payload.currency,
          value: payload.value,
          contents: payload.contents
        }
      }
    ]
  };

  if (process.env.NODE_ENV !== "production" && testCode) {
    body.test_event_code = testCode;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Token": accessToken
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TikTok Events API HTTP ${response.status}: ${text}`);
  }

  return { skipped: false, ok: true as const };
}
