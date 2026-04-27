const Stripe = require("stripe");
const { buildOrder, cleanEnv, escapeHtml, getProductById, saveOrder, sendBrevoEmail } = require("./_shared");

function getStripe() {
  const secretKey = cleanEnv(process.env.STRIPE_SECRET_KEY);
  return secretKey ? new Stripe(secretKey) : null;
}

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

async function handleCheckoutCompleted(session) {
  const offerId = session.metadata?.offer_id;
  const product = getProductById(offerId);
  const quantity = Number.parseInt(session.metadata?.quantity || "1", 10);

  if (!product) {
    return { ok: false, code: "PRODUCT_NOT_FOUND" };
  }

  const order = buildOrder({
    reference: session.metadata?.reference,
    stripeSessionId: session.id,
    status: "paid",
    offerId,
    quantity,
    fullName: session.customer_details?.name || "",
    email: session.customer_details?.email || session.customer_email || "",
    phone: session.customer_details?.phone || "",
    city: session.customer_details?.address?.city || "",
    country: session.customer_details?.address?.country || "",
    address: [
      session.customer_details?.address?.line1,
      session.customer_details?.address?.line2,
      session.customer_details?.address?.postal_code
    ]
      .filter(Boolean)
      .join(", ")
  });

  const supabaseResult = await saveOrder(order);
  const brevoResult = await sendBrevoEmail({
    replyTo: order.customer.email ? { email: order.customer.email, name: order.customer.fullName || "Client Bazario" } : undefined,
    subject: `Commande payée ${order.reference}`,
    htmlContent: `
      <h3>Commande payée Bazario</h3>
      <p><strong>Référence :</strong> ${escapeHtml(order.reference)}</p>
      <p><strong>Produit :</strong> ${escapeHtml(order.offerLabel)}</p>
      <p><strong>Quantité :</strong> ${escapeHtml(order.quantity)}</p>
      <p><strong>Total :</strong> ${escapeHtml(order.totalAmount)} ${escapeHtml(order.currency)}</p>
      <p><strong>Session Stripe :</strong> ${escapeHtml(session.id)}</p>
    `
  });

  return {
    ok: supabaseResult.ok,
    supabase: supabaseResult,
    brevo: brevoResult
  };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = getStripe();
  const webhookSecret = cleanEnv(process.env.STRIPE_WEBHOOK_SECRET);

  if (!stripe || !webhookSecret) {
    return res.status(503).json({
      error: "Stripe webhook non configuré",
      missing: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"].filter((key) => !cleanEnv(process.env[key]))
    });
  }

  const signature = req.headers["stripe-signature"];
  const rawBody = await readRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    return res.status(400).json({ error: "Signature Stripe invalide", detail: error.message });
  }

  if (event.type === "checkout.session.completed") {
    const result = await handleCheckoutCompleted(event.data.object);
    if (!result.ok) {
      return res.status(500).json({ error: "Traitement commande incomplet", result });
    }
  }

  return res.status(200).json({ received: true });
};
