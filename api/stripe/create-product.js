const {
  formatStripeError,
  getConnectedAccountId,
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
  const name = String(body.name || body.product_name || "").trim();
  const description = String(body.description || "").trim();
  const currency = String(body.currency || "eur").toLowerCase();
  const amount = Number.parseInt(String(body.unit_amount || body.amount || ""), 10);
  const accountId = getConnectedAccountId(body, req.query || {});
  const requestOptions = accountId ? { stripeAccount: accountId } : undefined;

  if (!name) {
    return res.status(400).json({ error: "Le champ `name` est requis." });
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    return res.status(400).json({ error: "Le champ `unit_amount` (en centimes) est requis." });
  }

  try {
    const metadata = body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata) ? body.metadata : {};
    const product = await stripe.products.create({
      name,
      description: description || undefined,
      metadata: accountId ? { ...metadata, account_id: accountId } : metadata
    }, requestOptions);

    const price = await stripe.prices.create({
      currency,
      unit_amount: amount,
      product: product.id
    }, requestOptions);

    return res.status(200).json({
      success: true,
      account_id: accountId,
      product,
      price
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
