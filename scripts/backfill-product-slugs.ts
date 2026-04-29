import { createClient } from "@supabase/supabase-js";
import { slugify } from "../lib/slug";

function cleanEnv(value: string | undefined) {
  return (value || "").trim();
}

async function main() {
  const url = cleanEnv(process.env.SUPABASE_URL || process.env.BAZARIO_SUPABASE_URL);
  const key = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.BAZARIO_SUPABASE_SERVICE_ROLE_KEY);
  if (!url || !key) throw new Error("Missing SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY.");

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("products").select("id,title,cj_product_id");
  if (error) throw new Error(error.message);

  for (const row of data || []) {
    const slug = `${slugify(row.title || row.cj_product_id)}-${row.cj_product_id}`;
    const { error: updateError } = await supabase.from("products").update({ slug }).eq("id", row.id);
    if (updateError) {
      console.error(`Failed ${row.id}: ${updateError.message}`);
    } else {
      console.log(`Updated slug for ${row.id}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
