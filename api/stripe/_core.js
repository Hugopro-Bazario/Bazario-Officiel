const Stripe = require("stripe");
const { createCjOrderFromOrder } = require("../_cj");
const {
  buildOrder,
  cleanEnv,
  escapeHtml,
  getBaseUrl,
  getOrderByReference,
  getProductById,
  parseBody,
  saveOrder,
  sendBrevoEmail
} = require("../_shared");

function getStripeClient() {
  const secretKey = cleanEnv(process.env.STRIPE_SECRET_KEY);
  return secretKey ? new Stripe(secretKey) : null;
}

function getStripeWebhookSecret() {
  return cleanEnv(process.env.STRIPE_WEBHOOK_SECRET);
}

function getThinWebhookSecret() {
  return cleanEnv(process.env.STRIPE_THIN_WEBHOOK_SECRET) || getStripeWebhookSecret();
}

function readHeaderValue(value) {
  if (Array.isArray(value)) return value[0] || "";
  return typeof value === "string" ? value : "";
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendMethodNotAllowed(res, allowedMethods) {
  res.setHeader("Allow", allowedMethods.join(", "));
  return res.status(405).json({ error: "Method not allowed" });
}

function sendMissingStripeConfig(res, extraMissing = []) {
  const missing = ["STRIPE_SECRET_KEY", ...extraMissing].filter((key) => !cleanEnv(process.env[key]));
  return res.status(503).json({
    error: "Stripe non configuré",
    missing
  });
}

function parseQuantity(value, fallback = 1) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isInteger(parsed)) return fallback;
  return Math.min(Math.max(parsed, 1), 99);
}

function parseIntegerAmount(value) {
  const amount = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(amount) && amount > 0 ? amount : null;
}

function getStripeErrorStatus(error) {
  return Number.isInteger(error?.statusCode) ? error.statusCode : 500;
}

function formatStripeError(error) {
  return {
    error: error?.message || "Stripe request failed",
    type: error?.type || null,
    code: error?.code || null
  };
}

function getConnectedAccountId(input = {}, query = {}) {
  const accountId = String(
    input.connected_account_id || input.account_id || input.account || query.connected_account_id || query.account_id || query.account || query.id || ""
  ).trim();
  return accountId || null;
}

function normalizeMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, val]) => typeof key === "string" && key.trim() && val !== undefined && val !== null)
      .map(([key, val]) => [key, String(val)])
  );
}

function readCustomerInput(input = {}, metadata = {}) {
  return {
    fullName: String(input.fullName || input.full_name || metadata.customer_full_name || "").trim(),
    email: String(input.customer_email || input.email || metadata.customer_email || "").trim(),
    phone: String(input.phone || metadata.customer_phone || "").trim(),
    city: String(input.city || metadata.customer_city || "").trim(),
    country: String(input.country || metadata.customer_country || "").trim(),
    address: String(input.address || metadata.customer_address || "").trim(),
    note: String(input.note || metadata.customer_note || "").trim()
  };
}

function buildCheckoutLineItem(input = {}) {
  const quantity = parseQuantity(input.quantity, 1);
  const offerId = String(input.offer_id || input.offerId || "").trim();
  const stripePriceId = String(input.price_id || input.priceId || "").trim();
  const productId = String(input.product_id || input.productId || "").trim();
  const currency = String(input.currency || "eur").toLowerCase();
  const unitAmountFromInput = parseIntegerAmount(input.unit_amount || input.unitAmount);

  if (stripePriceId) {
    return {
      lineItem: {
        price: stripePriceId,
        quantity
      },
      normalizedOfferId: offerId || null,
      stripePriceId
    };
  }

  if (productId && unitAmountFromInput) {
    return {
      lineItem: {
        price_data: {
          currency,
          product: productId,
          unit_amount: unitAmountFromInput
        },
        quantity
      },
      normalizedOfferId: offerId || null,
      stripePriceId: null
    };
  }

  if (offerId) {
    const offer = getProductById(offerId);
    if (!offer) return { lineItem: null, normalizedOfferId: offerId, stripePriceId: null };
    return {
      lineItem: {
        price_data: {
          currency: String(offer.currency || "EUR").toLowerCase(),
          product_data: {
            name: offer.name
          },
          unit_amount: Math.round(Number(offer.price) * 100)
        },
        quantity
      },
      normalizedOfferId: offerId,
      stripePriceId: null
    };
  }

  return { lineItem: null, normalizedOfferId: null, stripePriceId: null };
}

function buildCheckoutSessionParams(input = {}) {
  const baseUrl = getBaseUrl();
  const { lineItem, normalizedOfferId, stripePriceId } = buildCheckoutLineItem(input);

  if (!lineItem) {
    return {
      error: "Paramètres produit/prix manquants",
      details: "Provide `price_id`, or (`product_id` + `unit_amount`), or a valid `offer_id`."
    };
  }

  const metadata = normalizeMetadata(input.metadata);
  const customer = readCustomerInput(input, metadata);
  const connectedAccountId = getConnectedAccountId(input);
  const quantity = parseQuantity(input.quantity, 1);
  const applicationFeeAmount = parseIntegerAmount(input.application_fee_amount || input.applicationFeeAmount);
  const reference = String(input.reference || `BZ-${Date.now()}`).trim();
  const successUrl =
    String(input.success_url || input.successUrl || "").trim() || `${baseUrl}/merci.html?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = String(input.cancel_url || input.cancelUrl || "").trim() || `${baseUrl}/checkout.html`;

  const sessionParams = {
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_creation: "always",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    line_items: [lineItem],
    metadata: {
      ...metadata,
      quantity: String(quantity),
      reference,
      offer_id: normalizedOfferId || metadata.offer_id || "",
      customer_full_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_city: customer.city,
      customer_country: customer.country,
      customer_address: customer.address,
      customer_note: customer.note
    }
  };

  const customerEmail = customer.email;
  if (customerEmail) {
    sessionParams.customer_email = customerEmail;
  }

  if (connectedAccountId) {
    sessionParams.payment_intent_data = {
      transfer_data: {
        destination: connectedAccountId
      }
    };
    if (applicationFeeAmount) {
      sessionParams.payment_intent_data.application_fee_amount = applicationFeeAmount;
    }
  }

  return { sessionParams, reference, stripePriceId, connectedAccountId, applicationFeeAmount, normalizedOfferId };
}

function mergeStripeEventIds(existingIds, eventId) {
  const initial = Array.isArray(existingIds) ? existingIds.map((id) => String(id)).filter(Boolean) : [];
  if (!eventId) return initial.slice(-50);
  return [...new Set([...initial, String(eventId)])].slice(-50);
}

function readCustomerFromSession(session) {
  return {
    fullName: session.customer_details?.name || session.metadata?.customer_full_name || "",
    email: session.customer_details?.email || session.customer_email || session.metadata?.customer_email || "",
    phone: session.customer_details?.phone || session.metadata?.customer_phone || "",
    city: session.customer_details?.address?.city || session.metadata?.customer_city || "",
    country: session.customer_details?.address?.country || session.metadata?.customer_country || "",
    address:
      [
        session.customer_details?.address?.line1,
        session.customer_details?.address?.line2,
        session.customer_details?.address?.postal_code
      ]
        .filter(Boolean)
        .join(", ") || session.metadata?.customer_address || "",
    note: session.metadata?.customer_note || ""
  };
}

async function processCheckoutCompleted(session, { eventId } = {}) {
  const offerId = session.metadata?.offer_id;
  const product = offerId ? getProductById(offerId) : null;
  const reference = String(session.metadata?.reference || `BZ-${session.id}`).trim();

  if (!product) {
    return { ok: true, skipped: true, code: "PRODUCT_NOT_FOUND", offerId: offerId || null, reference };
  }

  const existingOrderResult = await getOrderByReference(reference);
  const existingPayload = existingOrderResult.ok ? existingOrderResult.order.payload : null;
  const existingProcessedIds = existingPayload?.integrations?.stripe?.processedEventIds;

  if (eventId && Array.isArray(existingProcessedIds) && existingProcessedIds.includes(eventId)) {
    return {
      ok: true,
      duplicate: true,
      reference,
      code: "STRIPE_EVENT_ALREADY_PROCESSED"
    };
  }

  const quantity = parseQuantity(session.metadata?.quantity, 1);
  const customer = readCustomerFromSession(session);
  const nowIso = new Date().toISOString();
  const processedEventIds = mergeStripeEventIds(existingProcessedIds, eventId);

  const order = buildOrder({
    reference,
    stripeSessionId: session.id,
    status: "paid",
    offerId,
    quantity,
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    city: customer.city,
    country: customer.country,
    address: customer.address,
    note: customer.note,
    integrations: {
      ...(existingPayload?.integrations || {}),
      stripe: {
        sessionId: session.id,
        paidAt: nowIso,
        webhookEventId: eventId || null,
        processedEventIds
      }
    }
  });

  const warnings = [];
  const firstSaveResult = await saveOrder(order);
  if (!firstSaveResult.ok) {
    return { ok: false, code: firstSaveResult.code || "ORDER_SAVE_FAILED", supabase: firstSaveResult };
  }

  const cjResult = await createCjOrderFromOrder(order);
  if (!cjResult.ok) {
    warnings.push(`CJDropshipping: ${cjResult.code || "submission_failed"}`);
  }

  const orderWithSupplier = {
    ...order,
    status: cjResult.ok ? "sent_to_supplier" : "paid",
    integrations: {
      ...(order.integrations || {}),
      cjdropshipping: {
        submitted: cjResult.ok,
        submittedAt: cjResult.ok ? nowIso : null,
        orderId: cjResult.data?.orderId || null,
        orderNumber: cjResult.data?.orderNumber || null,
        shipmentOrderId: cjResult.data?.shipmentOrderId || null,
        supplierStatus: cjResult.data?.orderStatus || null,
        lastError: cjResult.ok
          ? null
          : {
              code: cjResult.code || "CJ_SUBMISSION_FAILED",
              message: cjResult.message || "Échec de soumission CJ",
              at: nowIso
            }
      }
    }
  };

  const secondSaveResult = await saveOrder(orderWithSupplier);
  if (!secondSaveResult.ok) {
    return { ok: false, code: secondSaveResult.code || "ORDER_SUPPLIER_SAVE_FAILED", supabase: secondSaveResult };
  }

  const senderEmail = cleanEnv(process.env.BREVO_SENDER_EMAIL);
  const recipients = [];
  if (order.customer.email) recipients.push({ email: order.customer.email, name: order.customer.fullName || "Client Bazario" });
  if (senderEmail && order.customer.email !== senderEmail) recipients.push({ email: senderEmail, name: "Bazario" });

  const brevoResult = await sendBrevoEmail({
    replyTo: order.customer.email ? { email: order.customer.email, name: order.customer.fullName || "Client Bazario" } : undefined,
    to: recipients,
    subject: `Commande payée ${order.reference}`,
    htmlContent: `
      <h3>Commande payée Bazario</h3>
      <p><strong>Référence :</strong> ${escapeHtml(order.reference)}</p>
      <p><strong>Produit :</strong> ${escapeHtml(order.offerLabel)}</p>
      <p><strong>Quantité :</strong> ${escapeHtml(order.quantity)}</p>
      <p><strong>Total :</strong> ${escapeHtml(order.totalAmount)} ${escapeHtml(order.currency)}</p>
      <p><strong>Session Stripe :</strong> ${escapeHtml(session.id)}</p>
      <p><strong>Statut logistique :</strong> ${escapeHtml(orderWithSupplier.status)}</p>
    `
  });

  if (!brevoResult.ok) warnings.push(`Brevo: ${brevoResult.code || "send_failed"}`);

  return {
    ok: true,
    reference: order.reference,
    warnings,
    cjdropshipping: cjResult,
    brevo: brevoResult
  };
}

async function processStripeEvent(event) {
  if (event?.type === "checkout.session.completed") {
    return processCheckoutCompleted(event.data.object, { eventId: event.id });
  }
  return { ok: true, skipped: true };
}

module.exports = {
  buildCheckoutSessionParams,
  cleanEnv,
  formatStripeError,
  getConnectedAccountId,
  getStripeClient,
  getStripeErrorStatus,
  getStripeWebhookSecret,
  getThinWebhookSecret,
  parseBody,
  processStripeEvent,
  readCustomerInput,
  readHeaderValue,
  readRawBody,
  sendMethodNotAllowed,
  sendMissingStripeConfig
};