const OFFERS = {
  starter: { label: "Starter", price: 29.9 },
  growth: { label: "Growth", price: 79.9 },
  premium: { label: "Premium", price: 149.9 }
};

function cleanEnv(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/^"(.*)"$/, "$1");
}

function parseJsonSafely(input) {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return parseJsonSafely(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return parseJsonSafely(raw);
}

function validateOrderPayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["payload invalid"] };
  }

  const fullName = String(payload.fullName ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const city = String(payload.city ?? "").trim();
  const country = String(payload.country ?? "").trim();
  const address = String(payload.address ?? "").trim();
  const note = String(payload.note ?? "").trim();
  const offerId = String(payload.offerId ?? "").trim();
  const quantity = Number.parseInt(String(payload.quantity ?? "1"), 10);

  if (fullName.length < 2) errors.push("Nom invalide");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email invalide");
  if (phone.length < 6) errors.push("Téléphone invalide");
  if (city.length < 2) errors.push("Ville invalide");
  if (country.length < 2) errors.push("Pays invalide");
  if (address.length < 4) errors.push("Adresse invalide");
  if (!OFFERS[offerId]) errors.push("Offre inconnue");
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) errors.push("Quantité invalide");
  if (note.length > 500) errors.push("Note trop longue");

  const normalized = {
    fullName,
    email,
    phone,
    city,
    country,
    address,
    note,
    offerId,
    quantity
  };

  return { isValid: errors.length === 0, errors, normalized };
}

function buildOrder(normalized) {
  const offer = OFFERS[normalized.offerId];
  const totalAmount = Number((offer.price * normalized.quantity).toFixed(2));

  return {
    reference: `BZ-${Date.now()}`,
    createdAt: new Date().toISOString(),
    offerId: normalized.offerId,
    offerLabel: offer.label,
    quantity: normalized.quantity,
    unitPrice: offer.price,
    totalAmount,
    currency: "EUR",
    customer: {
      fullName: normalized.fullName,
      email: normalized.email,
      phone: normalized.phone,
      city: normalized.city,
      country: normalized.country,
      address: normalized.address,
      note: normalized.note
    }
  };
}

async function sendBrevoNotification(order) {
  const apiKey = cleanEnv(process.env.BREVO_API_KEY);
  const senderEmail = cleanEnv(process.env.BREVO_SENDER_EMAIL);

  if (!apiKey || !senderEmail) {
    return { ok: false, code: "BREVO_CONFIG_MISSING" };
  }

  const payload = {
    sender: { email: senderEmail, name: "Bazario Officiel" },
    to: [{ email: senderEmail }],
    replyTo: { email: order.customer.email, name: order.customer.fullName },
    subject: `Nouvelle commande ${order.reference}`,
    htmlContent: `
      <h3>Nouvelle commande Bazario</h3>
      <p><strong>Référence :</strong> ${escapeHtml(order.reference)}</p>
      <p><strong>Offre :</strong> ${escapeHtml(order.offerLabel)}</p>
      <p><strong>Quantité :</strong> ${escapeHtml(order.quantity)}</p>
      <p><strong>Total :</strong> ${escapeHtml(order.totalAmount)} ${escapeHtml(order.currency)}</p>
      <p><strong>Client :</strong> ${escapeHtml(order.customer.fullName)} (${escapeHtml(order.customer.email)})</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(order.customer.phone)}</p>
      <p><strong>Adresse :</strong> ${escapeHtml(order.customer.address)}, ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.country)}</p>
      <p><strong>Note :</strong> ${escapeHtml(order.customer.note || "Aucune")}</p>
    `
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    return response.ok
      ? { ok: true }
      : { ok: false, code: `BREVO_HTTP_${response.status}` };
  } catch {
    return { ok: false, code: "BREVO_NETWORK_ERROR" };
  }
}

async function validateCjConnection() {
  const apiKey = cleanEnv(process.env.CJ_API_KEY) || cleanEnv(process.env.CJ_API_SECRET);
  const baseUrl = cleanEnv(process.env.CJ_API_BASE_URL);

  if (!apiKey || !baseUrl) {
    return { ok: false, code: "CJ_CONFIG_MISSING" };
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/authentication/getAccessToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey })
    });

    const data = await response.json().catch(() => ({}));
    const success = response.ok && Number(data.code) === 200 && data.success === true;

    return success
      ? { ok: true }
      : { ok: false, code: `CJ_AUTH_FAILED_${data.code ?? response.status}` };
  } catch {
    return { ok: false, code: "CJ_NETWORK_ERROR" };
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await parseBody(req);
  const validation = validateOrderPayload(payload);

  if (!validation.isValid) {
    return res.status(400).json({
      error: "Payload invalide",
      details: validation.errors
    });
  }

  const order = buildOrder(validation.normalized);
  const brevo = await sendBrevoNotification(order);
  const cjdropshipping = await validateCjConnection();

  const warnings = [];
  if (!brevo.ok) warnings.push(`Brevo: ${brevo.code}`);
  if (!cjdropshipping.ok) warnings.push(`CJDropshipping: ${cjdropshipping.code}`);

  return res.status(200).json({
    success: true,
    order,
    integrations: {
      brevo: brevo.ok ? "ok" : "warning",
      cjdropshipping: cjdropshipping.ok ? "ok" : "warning"
    },
    warnings
  });
};
