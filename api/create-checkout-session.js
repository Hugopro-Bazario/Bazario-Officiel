const Stripe = require("stripe");
const { buildOrder, cleanEnv, getBaseUrl, getProductById, parseBody, saveOrder } = require("./_shared");

function getStripe() {
  const secretKey = cleanEnv(process.env.STRIPE_SECRET_KEY);
  return secretKey ? new Stripe(secretKey) : null;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = await parseBody(req);
  const offerId = String(payload?.offerId ?? "").trim();
  const quantity = Math.min(Math.max(Number.parseInt(String(payload?.quantity ?? "1"), 10) || 1, 1), 20);
  const product = getProductById(offerId);

  if (!product) {
    return res.status(400).json({ error: "Produit inconnu" });
  }

  const stripe = getStripe();
  if (!stripe) {
    return res.status(503).json({
      error: "Stripe n'est pas encore configuré",
      missing: ["STRIPE_SECRET_KEY"]
    });
  }

  const baseUrl = getBaseUrl();
  const order = buildOrder({
    fullName: String(payload?.fullName ?? "").trim(),
    email: String(payload?.email ?? "").trim(),
    phone: String(payload?.phone ?? "").trim(),
    city: String(payload?.city ?? "").trim(),
    country: String(payload?.country ?? "").trim(),
    address: String(payload?.address ?? "").trim(),
    note: String(payload?.note ?? "").trim(),
    offerId,
    quantity
  });

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: order.customer.email || undefined,
      line_items: [
        {
          quantity,
          price_data: {
            currency: product.currency.toLowerCase(),
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              description: product.description,
              images: product.image ? [`${baseUrl}/${product.image}`] : undefined,
              metadata: {
                product_id: product.id,
                sku: product.sku
              }
            }
          }
        }
      ],
      metadata: {
        reference: order.reference,
        offer_id: offerId,
        quantity: String(quantity)
      },
      success_url: `${baseUrl}/merci.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout.html?offer=${encodeURIComponent(offerId)}&qty=${quantity}`
    });
  } catch (error) {
    return res.status(502).json({
      error: "Impossible de créer la session Stripe",
      detail: error.message
    });
  }

  const supabaseResult = await saveOrder({
    ...order,
    stripeSessionId: session.id,
    status: "pending"
  });

  return res.status(200).json({
    url: session.url,
    sessionId: session.id,
    reference: order.reference,
    warnings: supabaseResult.ok ? [] : [`Supabase: ${supabaseResult.code}`]
  });
};
