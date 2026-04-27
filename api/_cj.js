const { cleanEnv, getProductById } = require("./_shared");

const DEFAULT_CJ_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1";
const CJ_TOKEN_TTL_BUFFER_MS = 60 * 1000;

let cachedToken = {
  value: null,
  expiresAt: 0
};

function getCjBaseUrl() {
  const raw = cleanEnv(process.env.CJ_API_BASE_URL);
  if (!raw) return DEFAULT_CJ_BASE_URL;
  return raw.endsWith("/v1") ? raw : `${raw.replace(/\/$/, "")}/v1`;
}

function countryNameToCode(country) {
  const normalized = String(country || "").trim().toUpperCase();
  if (!normalized) return cleanEnv(process.env.CJ_DEFAULT_COUNTRY_CODE) || "FR";
  if (normalized.length === 2) return normalized;

  const known = {
    FRANCE: "FR",
    FR: "FR",
    BELGIQUE: "BE",
    BELGIUM: "BE",
    CANADA: "CA",
    USA: "US",
    "UNITED STATES": "US",
    ETATSUNIS: "US",
    "ÉTATS-UNIS": "US",
    SPAIN: "ES",
    ESPAGNE: "ES",
    GERMANY: "DE",
    ALLEMAGNE: "DE",
    ITALY: "IT",
    ITALIE: "IT",
    UK: "GB",
    "UNITED KINGDOM": "GB",
    ROYAUMEUNI: "GB",
    "ROYAUME-UNI": "GB"
  };

  return known[normalized] || (cleanEnv(process.env.CJ_DEFAULT_COUNTRY_CODE) || "FR");
}

function sanitizeOrderAddress(order) {
  const customer = order?.customer || {};
  const city = String(customer.city || "").trim();
  const country = String(customer.country || "").trim();
  const shippingCountryCode = countryNameToCode(country);
  return {
    shippingZip: cleanEnv(process.env.CJ_DEFAULT_SHIPPING_ZIP) || "00000",
    shippingCountryCode,
    shippingCountry: country || shippingCountryCode,
    shippingProvince: city || cleanEnv(process.env.CJ_DEFAULT_PROVINCE) || "N/A",
    shippingCity: city || cleanEnv(process.env.CJ_DEFAULT_CITY) || "N/A",
    shippingCounty: "",
    shippingPhone: String(customer.phone || "").trim().slice(0, 20),
    shippingCustomerName: String(customer.fullName || "Client Bazario").trim().slice(0, 50),
    shippingAddress: String(customer.address || "").trim().slice(0, 200),
    shippingAddress2: "",
    email: String(customer.email || "").trim().slice(0, 50),
    remark: String(customer.note || "").trim().slice(0, 500)
  };
}

function buildCjProducts(order) {
  const items = Array.isArray(order?.items) ? order.items : [];
  const products = [];
  const missingMappings = [];

  items.forEach((item, index) => {
    const sourceProduct = getProductById(item.productId);
    const vid = cleanEnv(item.cjVid || sourceProduct?.cjVid);
    const sku = cleanEnv(item.cjSku || sourceProduct?.cjSku);
    if (!vid && !sku) {
      missingMappings.push({
        productId: item.productId,
        reason: "CJ_VID_OR_SKU_MISSING"
      });
      return;
    }

    const quantity = Math.max(1, Number.parseInt(String(item.quantity || 1), 10) || 1);
    const cjProduct = {
      quantity,
      storeLineItemId: `${order.reference}-${index + 1}`
    };
    if (vid) cjProduct.vid = vid;
    if (sku) cjProduct.sku = sku;
    products.push(cjProduct);
  });

  return { products, missingMappings };
}

async function parseJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function cjRequest(path, { method = "POST", body, accessToken, platformToken } = {}) {
  const baseUrl = getCjBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = {
    "Content-Type": "application/json"
  };

  if (accessToken) headers["CJ-Access-Token"] = accessToken;
  if (platformToken !== undefined) headers.platformToken = platformToken;

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const payload = await parseJsonResponse(response);
  return { response, payload };
}

async function getCjAccessToken() {
  const staticToken = cleanEnv(process.env.CJ_ACCESS_TOKEN);
  if (staticToken) return { ok: true, accessToken: staticToken, source: "env_static_token" };

  if (cachedToken.value && Date.now() + CJ_TOKEN_TTL_BUFFER_MS < cachedToken.expiresAt) {
    return { ok: true, accessToken: cachedToken.value, source: "memory_cache" };
  }

  const apiKey = cleanEnv(process.env.CJ_API_KEY) || cleanEnv(process.env.CJ_API_SECRET);
  if (!apiKey) {
    return { ok: false, code: "CJ_CONFIG_MISSING", message: "Missing CJ_API_KEY or CJ_ACCESS_TOKEN" };
  }

  const { response, payload } = await cjRequest("/authentication/getAccessToken", {
    body: { apiKey }
  });

  const token = String(payload?.data?.accessToken || "").trim();
  if (!response.ok || !token || Number(payload?.code) !== 200) {
    return {
      ok: false,
      code: `CJ_TOKEN_HTTP_${response.status}`,
      message: payload?.message || "Failed to obtain CJ access token",
      payload
    };
  }

  const expiryRaw = payload?.data?.accessTokenExpiryDate;
  const expiryMs = expiryRaw ? Date.parse(expiryRaw) : Date.now() + 14 * 24 * 3600 * 1000;
  cachedToken = {
    value: token,
    expiresAt: Number.isNaN(expiryMs) ? Date.now() + 14 * 24 * 3600 * 1000 : expiryMs
  };

  return { ok: true, accessToken: token, source: "auth_api" };
}

async function createCjOrderFromOrder(order) {
  const tokenResult = await getCjAccessToken();
  if (!tokenResult.ok) return tokenResult;

  const logisticName = cleanEnv(process.env.CJ_LOGISTIC_NAME);
  const fromCountryCode = cleanEnv(process.env.CJ_FROM_COUNTRY_CODE) || "CN";
  const payType = Number.parseInt(String(process.env.CJ_ORDER_PAY_TYPE || "3"), 10) || 3;
  const shopLogisticsType = Number.parseInt(String(process.env.CJ_SHOP_LOGISTICS_TYPE || "2"), 10) || 2;

  if (!logisticName) {
    return { ok: false, code: "CJ_LOGISTIC_NAME_MISSING", message: "Missing CJ_LOGISTIC_NAME environment variable" };
  }

  const { products, missingMappings } = buildCjProducts(order);
  if (products.length === 0) {
    return {
      ok: false,
      code: "CJ_PRODUCT_MAPPING_MISSING",
      message: "No order item contains CJ mapping (cjVid/cjSku)",
      missingMappings
    };
  }

  const address = sanitizeOrderAddress(order);
  if (!address.shippingAddress) {
    return { ok: false, code: "CJ_SHIPPING_ADDRESS_MISSING", message: "Order shipping address is required" };
  }

  const payload = {
    orderNumber: order.reference,
    ...address,
    payType,
    logisticName,
    fromCountryCode,
    platform: "Api",
    shopLogisticsType,
    products
  };

  const storageId = cleanEnv(process.env.CJ_STORAGE_ID);
  if (shopLogisticsType === 1 && storageId) {
    payload.storageId = storageId;
  }

  const platformToken = cleanEnv(process.env.CJ_PLATFORM_TOKEN);
  const { response, payload: responsePayload } = await cjRequest("/shopping/order/createOrderV2", {
    body: payload,
    accessToken: tokenResult.accessToken,
    platformToken
  });

  const isSuccess = response.ok && Number(responsePayload?.code) === 200 && responsePayload?.success !== false;
  if (!isSuccess) {
    return {
      ok: false,
      code: `CJ_CREATE_ORDER_HTTP_${response.status}`,
      message: responsePayload?.message || "CJ createOrderV2 failed",
      payload: responsePayload
    };
  }

  return {
    ok: true,
    data: {
      orderId: responsePayload?.data?.orderId || null,
      orderNumber: responsePayload?.data?.orderNumber || order.reference,
      shipmentOrderId: responsePayload?.data?.shipmentOrderId || null,
      orderStatus: responsePayload?.data?.orderStatus || null,
      raw: responsePayload
    }
  };
}

async function getCjOrderDetail({ orderId, orderNumber }) {
  const tokenResult = await getCjAccessToken();
  if (!tokenResult.ok) return tokenResult;

  const body = {};
  if (orderId) body.orderId = orderId;
  if (orderNumber) body.orderNumber = orderNumber;
  if (!body.orderId && !body.orderNumber) {
    return { ok: false, code: "CJ_ORDER_IDENTIFIER_MISSING", message: "orderId or orderNumber required" };
  }

  const { response, payload } = await cjRequest("/shopping/order/getOrderDetail", {
    body,
    accessToken: tokenResult.accessToken
  });

  const isSuccess = response.ok && Number(payload?.code) === 200 && payload?.success !== false;
  if (!isSuccess) {
    return {
      ok: false,
      code: `CJ_GET_ORDER_HTTP_${response.status}`,
      message: payload?.message || "CJ getOrderDetail failed",
      payload
    };
  }
  return { ok: true, data: payload?.data || null, raw: payload };
}

async function getCjTrackInfo({ shipmentOrderId, orderId }) {
  const tokenResult = await getCjAccessToken();
  if (!tokenResult.ok) return tokenResult;

  if (!shipmentOrderId && !orderId) {
    return { ok: false, code: "CJ_TRACK_IDENTIFIER_MISSING", message: "shipmentOrderId or orderId required" };
  }

  const body = {
    shipmentOrderId: shipmentOrderId || undefined,
    orderId: orderId || undefined
  };

  const { response, payload } = await cjRequest("/logistic/trackInfo", {
    body,
    accessToken: tokenResult.accessToken
  });

  const isSuccess = response.ok && Number(payload?.code) === 200 && payload?.success !== false;
  if (!isSuccess) {
    return {
      ok: false,
      code: `CJ_TRACK_HTTP_${response.status}`,
      message: payload?.message || "CJ trackInfo failed",
      payload
    };
  }
  return { ok: true, data: payload?.data || null, raw: payload };
}

async function syncCjOrderStatus(integrationData) {
  const cjOrderId = cleanEnv(integrationData?.orderId);
  const cjOrderNumber = cleanEnv(integrationData?.orderNumber);
  const shipmentOrderId = cleanEnv(integrationData?.shipmentOrderId);

  const detailResult = await getCjOrderDetail({
    orderId: cjOrderId || undefined,
    orderNumber: cjOrderNumber || undefined
  });
  if (!detailResult.ok) return detailResult;

  const trackResult = await getCjTrackInfo({
    shipmentOrderId: shipmentOrderId || detailResult?.data?.shipmentOrderId,
    orderId: cjOrderId || detailResult?.data?.orderId
  });

  return {
    ok: true,
    data: {
      detail: detailResult.data,
      detailRaw: detailResult.raw,
      track: trackResult.ok ? trackResult.data : null,
      trackRaw: trackResult.ok ? trackResult.raw : null,
      trackWarning: trackResult.ok ? null : { code: trackResult.code, message: trackResult.message }
    }
  };
}

module.exports = {
  createCjOrderFromOrder,
  getCjAccessToken,
  getCjOrderDetail,
  getCjTrackInfo,
  syncCjOrderStatus
};
