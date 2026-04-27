const { createClient } = require("@supabase/supabase-js");
const { requireAdminApiKey } = require("../_admin");
const { cleanEnv } = require("../_shared");

const URL_CANDIDATES = ["SUPABASE_URL", "supabase_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_supabase_SUPABASE_URL"];
const KEY_CANDIDATES = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_KEY",
  "supabase_SUPABASE_SERVICE_ROLE_KEY",
  "supabase_SUPABASE_SECRET_KEY"
];

module.exports = async (req, res) => {
  if (!requireAdminApiKey(req, res)) return;
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const urls = URL_CANDIDATES.map((name) => ({ name, value: cleanEnv(process.env[name]) })).filter((entry) => entry.value);
  const keys = KEY_CANDIDATES.map((name) => ({ name, value: cleanEnv(process.env[name]) })).filter((entry) => entry.value);

  const attempts = [];
  for (const url of urls) {
    for (const key of keys) {
      const client = createClient(url.value, key.value, {
        auth: { persistSession: false, autoRefreshToken: false }
      });
      const { error } = await client.from("orders").select("reference").limit(1);
      attempts.push({
        url_env: url.name,
        key_env: key.name,
        ok: !error,
        code: error?.code || null,
        message: error?.message || null
      });
    }
  }

  return res.status(200).json({
    success: true,
    url_candidates: urls.map((entry) => entry.name),
    key_candidates: keys.map((entry) => entry.name),
    attempts
  });
};
