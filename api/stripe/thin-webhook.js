const {
  formatStripeError,
  getStripeClient,
  getStripeErrorStatus,
  getThinWebhookSecret,
  parseBody,
  processStripeEvent,
  readHeaderValue,
  readRawBody,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const thinWebhookSecret = getThinWebhookSecret();
  const signature = readHeaderValue(req.headers?.["stripe-signature"]);

  let eventId = null;
  let verifiedEvent = null;

  try {
    if (signature && thinWebhookSecret) {
      const rawBody = await readRawBody(req);
      verifiedEvent = stripe.webhooks.constructEvent(rawBody, signature, thinWebhookSecret);
      eventId = verifiedEvent?.id || null;
    } else {
      const body = (await parseBody(req)) || {};
      eventId = String(body.id || body.event_id || "").trim() || null;
    }
  } catch (error) {
    return res.status(400).json({ error: "Payload webhook invalide", detail: error.message });
  }

  if (!eventId) {
    return res.status(400).json({ error: "Event id manquant." });
  }

  try {
    const event = await stripe.events.retrieve(eventId);
    const result = await processStripeEvent(event);
    if (!result.ok) {
      return res.status(500).json({ error: "Traitement commande incomplet", result });
    }
    return res.status(200).json({ received: true, event_id: event.id });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
