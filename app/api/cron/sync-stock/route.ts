import { createClient } from "@supabase/supabase-js";
import { cjFetch } from "@/lib/cj";

const REQUEST_DELAY_MS = 1100;

type ProductRow = {
  id: string;
  cj_product_id: string;
  is_active: boolean;
};

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

function getBearerToken(authHeader: string | null): string {
  if (!authHeader) return "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return "";
  return token.trim();
}

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractStockFromCjPayload(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;
  const data = root.data;

  let product: unknown = data;
  if (Array.isArray(data)) product = data[0];
  if (product && typeof product === "object" && "list" in (product as Record<string, unknown>)) {
    const list = (product as Record<string, unknown>).list;
    if (Array.isArray(list)) product = list[0];
  }

  if (!product || typeof product !== "object") return null;
  const p = product as Record<string, unknown>;
  const stock =
    asNumber(p.totalInventoryNum) ??
    asNumber(p.inventoryNum) ??
    asNumber(p.stock) ??
    asNumber(p.inventory) ??
    asNumber(p.quantity);

  if (stock === null) return null;
  return Math.max(0, Math.floor(stock));
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: Request) {
  const expectedSecret = cleanEnv(process.env.CRON_SECRET);
  const receivedSecret = getBearerToken(request.headers.get("authorization"));

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = cleanEnv(process.env.BAZARIO_SUPABASE_URL) || cleanEnv(process.env.SUPABASE_URL);
  const serviceRoleKey =
    cleanEnv(process.env.BAZARIO_SUPABASE_SERVICE_ROLE_KEY) || cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      { error: "Configuration Supabase manquante (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await supabase
    .from("products")
    .select("id,cj_product_id,is_active")
    .eq("is_active", true);

  if (error) {
    return Response.json({ error: `Supabase select failed: ${error.message}` }, { status: 500 });
  }

  const products = (data || []) as ProductRow[];
  let synced = 0;
  let deactivated = 0;
  const errors: string[] = [];

  for (const product of products) {
    try {
      const payload = await cjFetch(`/product/query?pid=${encodeURIComponent(product.cj_product_id)}`, {
        method: "GET"
      });

      const stock = extractStockFromCjPayload(payload);
      if (stock === null) {
        errors.push(`PID ${product.cj_product_id}: stock introuvable dans la reponse CJ.`);
      } else {
        const nextIsActive = stock > 0;
        const { error: updateError } = await supabase
          .from("products")
          .update({
            stock,
            is_active: nextIsActive,
            updated_at: new Date().toISOString()
          })
          .eq("id", product.id);

        if (updateError) {
          errors.push(`PID ${product.cj_product_id}: update Supabase failed (${updateError.message}).`);
        } else {
          synced += 1;
          if (!nextIsActive) deactivated += 1;
        }
      }
    } catch (err) {
      errors.push(
        `PID ${product.cj_product_id}: ${err instanceof Error ? err.message : String(err)}`
      );
    }

    await delay(REQUEST_DELAY_MS);
  }

  return Response.json({
    synced,
    deactivated,
    errors
  });
}
