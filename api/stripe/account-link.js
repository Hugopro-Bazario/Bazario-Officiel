const {
  formatStripeError,
  getConnectedAccountId,
  getStripeClient,
  getStripeErrorStatus,
  parseBody,
  sendMethodNotAllowed,
  sendMissingStripeConfig
} = require("./_core");
const { getBaseUrl } = require("../_shared");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendMethodNotAllowed(res, ["POST"]);

  const stripe = getStripeClient();
  if (!stripe) return sendMissingStripeConfig(res);

  const body = (await parseBody(req)) || {};
  const accountId = getConnectedAccountId(body, req.query || {});
  if (!accountId) {
    return res.status(400).json({ error: "Le champ `account_id` est requis." });
  }

  const baseUrl = getBaseUrl();
  const refreshUrl = String(body.refresh_url || body.refreshUrl || "").trim() || `${baseUrl}/checkout.html?connect=retry`;
  const returnUrl = String(body.return_url || body.returnUrl || "").trim() || `${baseUrl}/checkout.html?connect=done`;

  try {
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding"
    });

    return res.status(200).json({
      success: true,
      account_link: accountLink
    });
  } catch (error) {
    return res.status(getStripeErrorStatus(error)).json(formatStripeError(error));
  }
};
