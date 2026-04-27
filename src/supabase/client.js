import { createClient } from "@supabase/supabase-js";

let supabaseInstance;

function readEnv(name) {
  const value = import.meta.env[name];
  return typeof value === "string" ? value.trim() : "";
}

function resolveSupabaseConfig() {
  const url = readEnv("VITE_SUPABASE_URL");
  const key = readEnv("VITE_SUPABASE_ANON_KEY") || readEnv("VITE_SUPABASE_PUBLISHABLE_KEY");

  return {
    url,
    key
  };
}

export function getSupabaseClient() {
  const { url, key } = resolveSupabaseConfig();

  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  return supabaseInstance;
}
