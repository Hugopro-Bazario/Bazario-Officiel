const {
  formatStripeError,
  getConnectedAccountId,
  getStripeClient,
  getStripeErrorStatus,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");

module.exports = async (req, res) => {
  if (req.method !== "GET") return sendMethodNotAllowed(res, ["GET"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const accountId = getConnectedAccountId({}, req.query || {});
  if (!accountId) {
    return res.status(400).json({ error: "Le paramètre `account_id` (ou `id`) est requis." });
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);
    return res.status(200).json({
      success: true,
      account_id: account.id,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
      requirements: account.requirements || null
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
