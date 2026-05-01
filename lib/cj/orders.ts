import { cjFetch } from "@/lib/cj";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/types/database";

type OrderSnapshotItem = {
  product_id: string;
  cj_product_id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

type FulfillmentResult =
  | { success: true; cjOrderId: string; status: "paid" }
  | { success: false; status: "fulfillment_pending" | "fulfillment_review" | "fulfillment_failed"; reason: string };

const CJ_REQUEST_DELAY_MS = 1100;
const USD_TO_EUR_RATE = Number(process.env.BAZARIO_CJ_USD_TO_EUR || "0.92");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function normalizeCountryName(countryCode: string): string {
  const map: Record<string, string> = {
    FR: "France",
    BE: "Belgium",
    LU: "Luxembourg",
    CH: "Switzerland",
    DE: "Germany",
    ES: "Spain",
    IT: "Italy",
    NL: "Netherlands",
    PT: "Portugal"
  };
  return map[countryCode] || countryCode;
}

function parseOrderItems(value: Json | null): OrderSnapshotItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => asRecord(entry))
    .filter((entry): entry is Record<string, unknown> => Boolean(entry))
    .map((entry) => ({
      product_id: String(entry.product_id || ""),
      cj_product_id: String(entry.cj_product_id || ""),
      title: String(entry.title || ""),
      quantity: Math.floor(Number(entry.quantity || 0)),
      unit_price: Number(entry.unit_price || 0)
    }))
    .filter((item) => item.product_id && item.cj_product_id && item.quantity > 0);
}

function extractStock(payload: unknown): number | null {
  const root = asRecord(payload);
  const data = root?.data;
  let product: unknown = data;
  if (Array.isArray(data)) product = data[0];
  const productRecord = asRecord(product);
  const list = productRecord?.list;
  if (Array.isArray(list)) product = list[0];
  const record = asRecord(product);
  if (!record) return null;

  const stock =
    asNumber(record.totalInventoryNum) ??
    asNumber(record.inventoryNum) ??
    asNumber(record.stock) ??
    asNumber(record.inventory) ??
    asNumber(record.quantity);

  return stock === null ? null : Math.max(0, Math.floor(stock));
}

function extractCurrentCjPriceUsd(payload: unknown): number | null {
  const root = asRecord(payload);
  const data = root?.data;
  let product: unknown = data;
  if (Array.isArray(data)) product = data[0];
  const productRecord = asRecord(product);
  const list = productRecord?.list;
  if (Array.isArray(list)) product = list[0];
  const record = asRecord(product);
  if (!record) return null;

  return (
    asNumber(record.sellPrice) ??
    asNumber(record.price) ??
    asNumber(record.cjPrice) ??
    asNumber(record.costPrice) ??
    null
  );
}

function pickVariantIdentifier(payload: unknown): { vid?: string; sku?: string } {
  const seen = new Set<unknown>();

  function walk(node: unknown): { vid?: string; sku?: string } | null {
    if (!node || typeof node !== "object" || seen.has(node)) return null;
    seen.add(node);

    if (Array.isArray(node)) {
      for (const child of node) {
        const found = walk(child);
        if (found) return found;
      }
      return null;
    }

    const record = node as Record<string, unknown>;
    const vid = typeof record.vid === "string" ? record.vid.trim() : "";
    const sku = typeof record.sku === "string" ? record.sku.trim() : "";
    if (vid || sku) return { vid: vid || undefined, sku: sku || undefined };

    for (const child of Object.values(record)) {
      const found = walk(child);
      if (found) return found;
    }
    return null;
  }

  return walk(payload) || {};
}

function classifyCjError(message: string): "fulfillment_pending" | "fulfillment_review" | "fulfillment_failed" {
  const lower = message.toLowerCase();
  if (lower.includes("stock") || lower.includes("inventory") || lower.includes("out of")) {
    return "fulfillment_failed";
  }
  if (lower.includes("address") || lower.includes("phone") || lower.includes("zipcode") || lower.includes("city")) {
    return "fulfillment_review";
  }
  return "fulfillment_pending";
}

export async function createCjOrderForPaidOrder(orderId: string): Promise<FulfillmentResult> {
  const supabase = createSupabaseAdminClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id,reference,customer_name,customer_phone,shipping_address,items,cj_order_id,cj_fulfillment_attempts,status")
    .eq("id", orderId)
    .maybeSingle();

  if (orderError || !order) {
    return { success: false, status: "fulfillment_pending", reason: "Commande introuvable pour fulfillment." };
  }

  if (order.cj_order_id) {
    return { success: true, cjOrderId: order.cj_order_id, status: "paid" };
  }

  const snapshotItems = parseOrderItems(order.items);
  if (snapshotItems.length === 0) {
    await supabase.from("orders").update({ status: "fulfillment_review", cj_last_error: "Items absents pour CJ." }).eq("id", order.id);
    return { success: false, status: "fulfillment_review", reason: "Items absents pour fulfillment CJ." };
  }

  const cjProducts: Array<{ vid?: string; sku?: string; quantity: number; cj_product_id: string }> = [];

  for (const item of snapshotItems) {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("cj_product_id,cost_price,cj_data")
      .eq("id", item.product_id)
      .maybeSingle();

    if (productError || !product) {
      await supabase
        .from("orders")
        .update({
          status: "fulfillment_review",
          cj_last_error: `Produit introuvable pour item ${item.product_id}.`
        })
        .eq("id", order.id);
      return { success: false, status: "fulfillment_review", reason: "Produit snapshot introuvable." };
    }

    const productPayload = await cjFetch(`/product/query?pid=${encodeURIComponent(product.cj_product_id)}`, { method: "GET" });
    const cjStock = extractStock(productPayload);
    if (cjStock !== null && cjStock < item.quantity) {
      await supabase
        .from("orders")
        .update({
          status: "fulfillment_failed",
          cj_last_error: `Stock CJ insuffisant pour ${item.title}.`,
          cj_fulfillment_attempts: (order.cj_fulfillment_attempts || 0) + 1
        })
        .eq("id", order.id);

      console.info(
        JSON.stringify({
          order_id: order.id,
          attempt: (order.cj_fulfillment_attempts || 0) + 1,
          cj_response_code: "stock_insufficient",
          cj_message: `Stock CJ insuffisant pour ${item.title}.`,
          success: false
        })
      );
      return { success: false, status: "fulfillment_failed", reason: `Stock CJ insuffisant pour ${item.title}.` };
    }

    const currentCjPriceUsd = extractCurrentCjPriceUsd(productPayload);
    const currentCjPriceEur = currentCjPriceUsd === null ? null : Number((currentCjPriceUsd * USD_TO_EUR_RATE).toFixed(2));
    const baseCost = product.cost_price || null;

    if (baseCost !== null && currentCjPriceEur !== null && baseCost > 0) {
      const diffRatio = Math.abs(currentCjPriceEur - baseCost) / baseCost;
      if (diffRatio > 0.1) {
        await supabase
          .from("orders")
          .update({
            status: "fulfillment_review",
            cj_last_error: `Ecart prix CJ >10% (${item.title}).`,
            cj_fulfillment_attempts: (order.cj_fulfillment_attempts || 0) + 1
          })
          .eq("id", order.id);

        console.info(
          JSON.stringify({
            order_id: order.id,
            attempt: (order.cj_fulfillment_attempts || 0) + 1,
            cj_response_code: "price_review",
            cj_message: `Price diff >10% on ${item.cj_product_id}`,
            success: false
          })
        );

        return { success: false, status: "fulfillment_review", reason: `Ecart prix >10% pour ${item.title}.` };
      }
    }

    const fromCjData = pickVariantIdentifier(product.cj_data);
    const fromProductPayload = pickVariantIdentifier(productPayload);
    const variant = fromCjData.vid || fromCjData.sku ? fromCjData : fromProductPayload;

    if (!variant.vid && !variant.sku) {
      await supabase
        .from("orders")
        .update({
          status: "fulfillment_review",
          cj_last_error: `Variant CJ introuvable pour ${item.title}.`,
          cj_fulfillment_attempts: (order.cj_fulfillment_attempts || 0) + 1
        })
        .eq("id", order.id);
      return { success: false, status: "fulfillment_review", reason: `Variant CJ introuvable pour ${item.title}.` };
    }

    cjProducts.push({
      vid: variant.vid,
      sku: variant.sku,
      quantity: item.quantity,
      cj_product_id: item.cj_product_id
    });

    await sleep(CJ_REQUEST_DELAY_MS);
  }

  const shipping = asRecord(order.shipping_address);
  const countryCode = String(shipping?.country || "FR").toUpperCase();
  const shippingAddress = [shipping?.line1, shipping?.line2].filter(Boolean).join(" ").trim();

  if (!shippingAddress || !shipping?.city || !shipping?.postal_code) {
    await supabase
      .from("orders")
      .update({
        status: "fulfillment_review",
        cj_last_error: "Adresse de livraison incomplete pour CJ."
      })
      .eq("id", order.id);
    return { success: false, status: "fulfillment_review", reason: "Adresse de livraison incomplete." };
  }

  const requestBody = {
    orderNumber: String(order.id),
    shippingZip: String(shipping.postal_code || ""),
    shippingCountryCode: countryCode,
    shippingCountry: normalizeCountryName(countryCode),
    shippingProvince: String(shipping.state || ""),
    shippingCity: String(shipping.city || ""),
    shippingAddress,
    shippingCustomerName: String(order.customer_name || "Client Bazario"),
    shippingPhone: String(order.customer_phone || ""),
    remark: "",
    fromCountryCode: cleanCountryCode(process.env.BAZARIO_CJ_FROM_COUNTRY || "CN"),
    logisticName: process.env.BAZARIO_CJ_LOGISTIC_NAME || "CJPacket Ordinary",
    payType: 3,
    products: cjProducts.map((item) => ({
      ...(item.vid ? { vid: item.vid } : {}),
      ...(item.sku ? { sku: item.sku } : {}),
      quantity: item.quantity
    }))
  };

  const attempt = (order.cj_fulfillment_attempts || 0) + 1;

  try {
    const response = await cjFetch("/shopping/order/createOrderV2", {
      method: "POST",
      body: JSON.stringify(requestBody)
    });

    const responseRecord = asRecord(response);
    const data = asRecord(responseRecord?.data);
    const cjOrderId = String(data?.orderId || data?.id || "").trim();

    if (!cjOrderId) {
      throw new Error("CJ orderId introuvable dans la reponse.");
    }

    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        cj_order_id: cjOrderId,
        cj_last_error: null,
        cj_fulfillment_attempts: attempt
      })
      .eq("id", order.id);

    if (updateError) throw new Error(updateError.message);

    console.info(
      JSON.stringify({
        order_id: order.id,
        attempt,
        cj_response_code: responseRecord?.code || 200,
        cj_message: responseRecord?.message || "ok",
        success: true
      })
    );

    return { success: true, cjOrderId, status: "paid" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown CJ error";
    const nextStatus = classifyCjError(message);

    await supabase
      .from("orders")
      .update({
        status: nextStatus,
        cj_last_error: message,
        cj_fulfillment_attempts: attempt
      })
      .eq("id", order.id);

    console.info(
      JSON.stringify({
        order_id: order.id,
        attempt,
        cj_response_code: "error",
        cj_message: message,
        success: false
      })
    );

    return { success: false, status: nextStatus, reason: message };
  }
}

function cleanCountryCode(value: string): string {
  const normalized = String(value || "").trim().toUpperCase();
  return normalized.length === 2 ? normalized : "CN";
}
