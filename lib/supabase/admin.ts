import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

export function createSupabaseAdminClient() {
  const url = cleanEnv(process.env.BAZARIO_SUPABASE_URL) || cleanEnv(process.env.SUPABASE_URL);
  const serviceRoleKey =
    cleanEnv(process.env.BAZARIO_SUPABASE_SERVICE_ROLE_KEY) || cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
