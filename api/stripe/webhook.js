const {
  formatStripeError,
  getStripeClient,
  getStripeErrorStatus,
  getStripeWebhookSecret,
  processStripeEvent,
  readHeaderValue,
  readRawBody,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  const stripe = getStripeClient();
  const webhookSecret = getStripeWebhookSecret();

  if (!stripe || !webhookSecret) {
    return sendMissingStripeConfig(res, ["STRIPE_WEBHOOK_SECRET"]);
  }

  const signature = readHeaderValue(req.headers?.["stripe-signature"]);
  if (!signature) {
    return res.status(400).json({ error: "Header stripe-signature manquant." });
  }

  let event;
  try {
    const rawBody = await readRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    return res.status(400).json({ error: "Signature Stripe invalide", detail: error.message });
  }

  try {
    const result = await processStripeEvent(event);
    if (!result.ok) {
      return res.status(500).json({ error: "Traitement commande incomplet", result });
    }
    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
