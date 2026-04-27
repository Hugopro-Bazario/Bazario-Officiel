const { requireAdminApiKey } = require("../_admin");
const { listOrders } = require("../_shared");

module.exports = async (req, res) => {
  if (!requireAdminApiKey(req, res)) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const limit = Number.parseInt(String(req.query?.limit || "50"), 10) || 50;
  const result = await listOrders({ limit });
  if (!result.ok) {
    return res.status(500).json({
      error: "Impossible de lister les commandes",
      code: result.code,
      message: result.message || null
    });
  }

  return res.status(200).json({
    success: true,
    count: result.orders.length,
    orders: result.orders
  });
};
