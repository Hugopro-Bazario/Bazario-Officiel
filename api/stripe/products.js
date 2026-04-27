const { formatStripeError, getConnectedAccountId, getStripeClient, getStripeErrorStatus, sendMethodNotAllowed, sendMissingStripeConfig } = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const limit = Math.min(Math.max(Number.parseInt(String(req.query?.limit || "20"), 10) || 20, 1), 100);
  const accountId = getConnectedAccountId({}, req.query || {});
  const requestOptions = accountId ? { stripeAccount: accountId } : undefined;

  try {
    const prices = await stripe.prices.list({
      active: true,
      limit,
      expand: ["data.product"]
    }, requestOptions);

    const products = prices.data
      .filter((price) => price.product && typeof price.product === "object")
      .map((price) => ({
        price_id: price.id,
        amount: price.unit_amount,
        currency: price.currency,
        product: {
          id: price.product.id,
          name: price.product.name,
          description: price.product.description || ""
        }
      }));

    return res.status(200).json({
      success: true,
      account_id: accountId,
      products
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
