const { requireAdminApiKey } = require("../_admin");
const { createCjOrderFromOrder } = require("../_cj");
const { getOrderByReference, parseBody, saveOrder } = require("../_shared");

module.exports = async (req, res) => {
  if (!requireAdminApiKey(req, res)) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (await parseBody(req)) || {};
  const reference = String(body.reference || "").trim();
  if (!reference) {
    return res.status(400).json({ error: "Le champ `reference` est requis." });
  }

  const existing = await getOrderByReference(reference);
  if (!existing.ok) {
    return res.status(404).json({ error: "Commande introuvable", code: existing.code });
  }

  const order = existing.order.payload;
  const cj = await createCjOrderFromOrder(order);
  const nowIso = new Date().toISOString();

  const updatedOrder = {
    ...order,
    status: cj.ok ? "sent_to_supplier" : order.status || "paid",
    integrations: {
      ...(order.integrations || {}),
      cjdropshipping: {
        submitted: cj.ok,
        submittedAt: cj.ok ? nowIso : order.integrations?.cjdropshipping?.submittedAt || null,
        orderId: cj.data?.orderId || order.integrations?.cjdropshipping?.orderId || null,
        orderNumber: cj.data?.orderNumber || order.integrations?.cjdropshipping?.orderNumber || reference,
        shipmentOrderId: cj.data?.shipmentOrderId || order.integrations?.cjdropshipping?.shipmentOrderId || null,
        supplierStatus: cj.data?.orderStatus || order.integrations?.cjdropshipping?.supplierStatus || null,
        lastError: cj.ok
          ? null
          : {
              code: cj.code || "CJ_RETRY_FAILED",
              message: cj.message || "Réessai CJ échoué",
              at: nowIso
            }
      }
    }
  };

  const saveResult = await saveOrder(updatedOrder);
  if (!saveResult.ok) {
    return res.status(500).json({ error: "Échec de sauvegarde commande", code: saveResult.code, message: saveResult.message || null });
  }

  return res.status(200).json({
    success: true,
    reference,
    cjdropshipping: cj.ok ? "ok" : "warning",
    result: cj
  });
};
