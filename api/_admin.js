const { cleanEnv } = require("./_shared");

function getConfiguredAdminKey() {
  return cleanEnv(process.env.ADMIN_API_KEY || process.env.BACKOFFICE_API_KEY);
}

function extractRequestAdminKey(req) {
  const fromHeader = cleanEnv(req.headers?.["x-admin-api-key"]);
  if (fromHeader) return fromHeader;

  const authHeader = cleanEnv(req.headers?.authorization);
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    return cleanEnv(authHeader.slice(7));
  }

  return cleanEnv(req.query?.admin_key);
}

function requireAdminApiKey(req, res) {
  const configured = getConfiguredAdminKey();
  if (!configured) {
    res.status(503).json({
      error: "Back-office non configuré",
      missing: ["ADMIN_API_KEY"]
    });
    return false;
  }

  const provided = extractRequestAdminKey(req);
  if (!provided || provided !== configured) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

module.exports = {
  requireAdminApiKey
};
