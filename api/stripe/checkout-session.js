const {
  buildCheckoutSessionParams,
  formatStripeError,
  getStripeClient,
  getStripeErrorStatus,
  parseBody,
  readCustomerInput,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");
const { buildOrder, saveOrder } = require("../_shared");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const body = (await parseBody(req)) || {};
  const built = buildCheckoutSessionParams(body);

  if (built.error) {
    return res.status(400).json({
      error: built.error,
      details: built.details
    });
  }

  try {
    if (built.stripePriceId) {
      try {
        const price = await stripe.prices.retrieve(built.stripePriceId);
        if (price?.recurring) {
          built.sessionParams.mode = "subscription";
          delete built.sessionParams.payment_intent_data;
          if (built.connectedAccountId) {
            built.sessionParams.subscription_data = {
              transfer_data: {
                destination: built.connectedAccountId
              }
            };
          }
        }
      } catch {
        // Si la récupération du prix échoue, on conserve le mode payment par défaut.
      }
    }
    const session = await stripe.checkout.sessions.create(built.sessionParams);
    const customer = readCustomerInput(body, built.sessionParams.metadata || {});
    const pendingOrder = buildOrder({
      reference: built.reference,
      stripeSessionId: session.id,
      status: "created",
      offerId: built.normalizedOfferId || body.offer_id || body.offerId || "",
      quantity: body.quantity,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      country: customer.country,
      address: customer.address,
      note: customer.note,
      integrations: {
        stripe: {
          sessionId: session.id,
          checkoutCreatedAt: new Date().toISOString()
        }
      }
    });
    const pendingOrderSave = await saveOrder(pendingOrder);
    return res.status(200).json({
      success: true,
      session_id: session.id,
      url: session.url,
      reference: built.reference,
      order_saved: pendingOrderSave.ok,
      order_save_warning: pendingOrderSave.ok ? null : pendingOrderSave.code,
      order_save_warning_message: pendingOrderSave.ok ? null : pendingOrderSave.message || null
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
