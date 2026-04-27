const {
  formatStripeError,
  getStripeClient,
  getStripeErrorStatus,
  parseBody,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const body = (await parseBody(req)) || {};
  const email = String(body.email || "").trim();
  const country = String(body.country || "FR").toUpperCase();

  try {
    const account = await stripe.accounts.create({
      type: "express",
      country,
      email: email || undefined,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true }
      }
    });

    return res.status(200).json({
      success: true,
      account
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
