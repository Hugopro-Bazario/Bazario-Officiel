const { cleanEnv, getSupabaseAdmin } = require("../_shared");

const REQUEST_DELAY_MS = 1100;
const CJ_DEFAULT_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";
const TOKEN_TTL_MS = 14 * 24 * 60 * 60 * 1000;

let cjTokenCache = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBearerToken(headerValue) {
  if (!headerValue || typeof headerValue !== "string") return "";
  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) return "";
  return token.trim();
}

function asNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function getCjConfig() {
  const email = cleanEnv(process.env.CJ_EMAIL) || cleanEnv(process.env.BAZARIO_CJ_EMAIL);
  const apiKey = cleanEnv(process.env.CJ_API_KEY) || cleanEnv(process.env.BAZARIO_CJ_API_KEY);
  const baseUrl = (cleanEnv(process.env.CJ_API_BASE_URL) || CJ_DEFAULT_BASE_URL).replace(/\/$/, "");

  if (!email || !apiKey) {
    throw new Error("Configuration CJ manquante (CJ_EMAIL/CJ_API_KEY).");
  }

  return { email, apiKey, baseUrl };
}

async function getCjAccessToken() {
  const now = Date.now();
  if (cjTokenCache && cjTokenCache.expiresAt > now) return cjTokenCache.token;

  const { email, apiKey, baseUrl } = getCjConfig();
  const response = await fetch(`${baseUrl}/authentication/getAccessToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, apiKey })
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`Auth CJ HTTP ${response.status}`);
  }

  if (payload && payload.result === false) {
    throw new Error(`Auth CJ refusée: ${payload.message || "unknown error"}`);
  }

  const token = typeof payload?.data === "string" ? payload.data : payload?.data?.accessToken;
  if (!token || typeof token !== "string") {
    throw new Error("Auth CJ: access token introuvable.");
  }

  cjTokenCache = { token, expiresAt: now + TOKEN_TTL_MS };
  return token;
}

async function cjFetch(endpoint) {
  const token = await getCjAccessToken();
  const { baseUrl } = getCjConfig();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const response = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CJ-Access-Token": token
    }
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(`CJ HTTP ${response.status}`);
  }
  if (payload && payload.result === false) {
    throw new Error(`CJ API: ${payload.message || "unknown error"}`);
  }

  return payload;
}

function extractStock(payload) {
  if (!payload || typeof payload !== "object") return null;
  const data = payload.data;
  let product = data;
  if (Array.isArray(data)) product = data[0];
  if (product && typeof product === "object" && Array.isArray(product.list)) {
    product = product.list[0];
  }
  if (!product || typeof product !== "object") return null;

  const stock =
    asNumber(product.totalInventoryNum) ??
    asNumber(product.inventoryNum) ??
    asNumber(product.stock) ??
    asNumber(product.inventory) ??
    asNumber(product.quantity);

  if (stock === null) return null;
  return Math.max(0, Math.floor(stock));
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const expectedSecret = cleanEnv(process.env.CRON_SECRET);
  const receivedSecret = getBearerToken(req.headers.authorization || "");

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return res.status(401).send("Unauthorized");
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return res.status(500).json({ error: "Configuration Supabase manquante." });
  }

  const { data: products, error: selectError } = await supabase
    .from("products")
    .select("id,cj_product_id,is_active")
    .eq("is_active", true);

  if (selectError) {
    return res.status(500).json({ error: `Supabase select failed: ${selectError.message}` });
  }

  let synced = 0;
  let deactivated = 0;
  const errors = [];

  for (const product of products || []) {
    try {
      const payload = await cjFetch(`/product/query?pid=${encodeURIComponent(product.cj_product_id)}`);
      const stock = extractStock(payload);

      if (stock === null) {
        errors.push(`PID ${product.cj_product_id}: stock introuvable`);
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
          errors.push(`PID ${product.cj_product_id}: update failed (${updateError.message})`);
        } else {
          synced += 1;
          if (!nextIsActive) deactivated += 1;
        }
      }
    } catch (error) {
      errors.push(`PID ${product.cj_product_id}: ${error.message || String(error)}`);
    }

    await sleep(REQUEST_DELAY_MS);
  }

  return res.status(200).json({ synced, deactivated, errors });
};
