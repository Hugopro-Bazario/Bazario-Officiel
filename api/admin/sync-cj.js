const { requireAdminApiKey } = require("../_admin");
const { syncCjOrderStatus } = require("../_cj");
const { getOrderByReference, listOrders, parseBody, saveOrder } = require("../_shared");

function inferLogisticsStatus(syncData) {
  const orderStatus = String(syncData?.detail?.orderStatus || "").toUpperCase();
  if (orderStatus.includes("DELIVER")) return "delivered";
  if (orderStatus.includes("SHIP")) return "shipped";
  if (orderStatus.includes("FULFILL")) return "fulfilled";
  return "sent_to_supplier";
}

async function syncSingleOrder(reference) {
  const existing = await getOrderByReference(reference);
  if (!existing.ok) return { ok: false, code: existing.code };

  const order = existing.order.payload;
  const integrationData = order.integrations?.cjdropshipping || {};
  const syncResult = await syncCjOrderStatus(integrationData);
  if (!syncResult.ok) return syncResult;

  const nowIso = new Date().toISOString();
  const updatedOrder = {
    ...order,
    status: inferLogisticsStatus(syncResult.data),
    integrations: {
      ...(order.integrations || {}),
      cjdropshipping: {
        ...(integrationData || {}),
        supplierStatus: syncResult.data?.detail?.orderStatus || integrationData?.supplierStatus || null,
        syncedAt: nowIso,
        detail: syncResult.data?.detail || null,
        track: syncResult.data?.track || null,
        trackWarning: syncResult.data?.trackWarning || null
      }
    }
  };

  const saveResult = await saveOrder(updatedOrder);
  if (!saveResult.ok) {
    return { ok: false, code: saveResult.code, message: saveResult.message || null };
  }
  return { ok: true, reference, status: updatedOrder.status };
}

module.exports = async (req, res) => {
  if (!requireAdminApiKey(req, res)) return;
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (await parseBody(req)) || {};
  const reference = String(body.reference || "").trim();
  if (reference) {
    const result = await syncSingleOrder(reference);
    const statusCode = result.ok ? 200 : 400;
    return res.status(statusCode).json(result);
  }

  const listResult = await listOrders({ limit: 100 });
  if (!listResult.ok) {
    return res.status(500).json({ error: "Impossible de lire les commandes", code: listResult.code, message: listResult.message || null });
  }

  const candidates = listResult.orders
    .filter((row) => ["sent_to_supplier", "fulfilled", "shipped"].includes(String(row.status || "").toLowerCase()))
    .filter((row) => row.payload?.integrations?.cjdropshipping?.orderId || row.payload?.integrations?.cjdropshipping?.orderNumber)
    .slice(0, 20);

  const results = [];
  for (const row of candidates) {
    const result = await syncSingleOrder(row.reference);
    results.push(result);
  }

  return res.status(200).json({
    success: true,
    synced: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results
  });
};
