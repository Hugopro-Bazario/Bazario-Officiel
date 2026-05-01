import { createHash } from "node:crypto";

function clean(value: string | null | undefined): string {
  return (value || "").trim();
}

export function isTrackingEnabledServer(): boolean {
  return clean(process.env.BAZARIO_TRACKING_ENABLED).toLowerCase() === "true";
}

export function sha256(input: string | null | undefined): string | undefined {
  const normalized = clean(input).toLowerCase();
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

export function firstName(fullName: string | null | undefined): string {
  const value = clean(fullName);
  if (!value) return "";
  return value.split(/\s+/)[0] || "";
}

export function lastName(fullName: string | null | undefined): string {
  const value = clean(fullName);
  if (!value) return "";
  const parts = value.split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(" ") : "";
}

export function getClientIpFromHeaders(headers: Headers): string | undefined {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip") || undefined;
}
