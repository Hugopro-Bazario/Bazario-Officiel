const { createClient } = require("@supabase/supabase-js");
const products = require("../src/data/products.json");

function parseJsonSafely(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

async function parseBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return parseJsonSafely(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return parseJsonSafely(raw);
}

function cleanEnv(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/^"(.*)"$/, "$1");
}

function getAppUrl() {
  return cleanEnv(process.env.APP_URL) || "https://www.bazario-official.com";
}

function getBaseUrl() {
  return getAppUrl().replace(/\/$/, "");
}

function getSupabaseAdmin() {
  const url = cleanEnv(process.env.BAZARIO_SUPABASE_URL) || cleanEnv(process.env.SUPABASE_URL);
  const serviceRoleKey =
    cleanEnv(process.env.BAZARIO_SUPABASE_SERVICE_ROLE_KEY) ||
    cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    cleanEnv(process.env.SUPABASE_SECRET_KEY);

  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

function getActiveProducts(products) {
  return products.filter((product) => product.active !== false);
}

function getProductById(id, source = products) {
  return getActiveProducts(source).find((product) => product.id === id) || null;
}

function buildOrderReference() {
  return `BZ-${Date.now()}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildOrder(input) {
  const product = getProductById(input.offerId);
  const quantity = Math.min(Math.max(Number.parseInt(String(input.quantity ?? "1"), 10) || 1, 1), 20);
  const totalAmount = product ? Number((product.price * quantity).toFixed(2)) : 0;

  return {
    reference: input.reference || buildOrderReference(),
    createdAt: new Date().toISOString(),
    status: input.status || "pending",
    stripeSessionId: input.stripeSessionId || null,
    offerId: input.offerId,
    offerLabel: product?.name || input.offerId,
    quantity,
    unitPrice: product?.price || 0,
    totalAmount,
    currency: product?.currency || "EUR",
    customer: {
      fullName: String(input.fullName ?? "").trim(),
      email: String(input.email ?? "").trim(),
      phone: String(input.phone ?? "").trim(),
      city: String(input.city ?? "").trim(),
      country: String(input.country ?? "").trim(),
      address: String(input.address ?? "").trim(),
      note: String(input.note ?? "").trim()
    },
    items: product
      ? [
          {
            productId: product.id,
            productName: product.name,
            quantity,
            unitPrice: product.price,
            totalAmount,
            currency: product.currency || "EUR"
          }
        ]
      : []
  };
}

async function sendBrevoEmail({ subject, htmlContent, replyTo }) {
  const apiKey = cleanEnv(process.env.BREVO_API_KEY);
  const senderEmail = cleanEnv(process.env.BREVO_SENDER_EMAIL);
  const senderName = cleanEnv(process.env.BREVO_SENDER_NAME) || "Bazario";

  if (!apiKey || !senderEmail) {
    return { ok: false, code: "BREVO_CONFIG_MISSING" };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: senderEmail }],
        replyTo,
        subject,
        htmlContent
      })
    });

    return response.ok ? { ok: true } : { ok: false, code: `BREVO_HTTP_${response.status}` };
  } catch {
    return { ok: false, code: "BREVO_NETWORK_ERROR" };
  }
}

async function upsertSupabaseOrder(order) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false, code: "SUPABASE_CONFIG_MISSING" };

  const { error } = await supabase.from("orders").upsert(
    {
      reference: order.reference,
      stripe_session_id: order.stripeSessionId || null,
      status: order.status,
      customer_email: order.customer.email,
      customer_name: order.customer.fullName,
      total_amount: order.totalAmount,
      currency: order.currency,
      payload: order
    },
    { onConflict: "reference" }
  );

  if (error) return { ok: false, code: error.code || "SUPABASE_ORDER_ERROR", message: error.message };
  return { ok: true };
}

async function insertSupabaseOrderItem({ orderReference, item }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false, code: "SUPABASE_CONFIG_MISSING" };

  const { error } = await supabase.from("order_items").upsert(
    {
      order_reference: orderReference,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_amount: item.totalAmount,
      currency: item.currency
    },
    { onConflict: "order_reference,product_id" }
  );

  if (error) return { ok: false, code: error.code || "SUPABASE_ORDER_ITEM_ERROR", message: error.message };
  return { ok: true };
}

async function saveOrder(order) {
  const orderResult = await upsertSupabaseOrder(order);
  if (!orderResult.ok) return orderResult;

  for (const item of order.items || []) {
    const itemResult = await insertSupabaseOrderItem({ orderReference: order.reference, item });
    if (!itemResult.ok) return itemResult;
  }

  return { ok: true };
}

module.exports = {
  buildOrder,
  buildOrderReference,
  cleanEnv,
  escapeHtml,
  getAppUrl,
  getBaseUrl,
  getProductById,
  getSupabaseAdmin,
  parseBody,
  products,
  saveOrder,
  sendBrevoEmail,
  insertSupabaseOrderItem,
  upsertSupabaseOrder
};
