import { createSupabaseServerClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slug";
import type { Database, Json } from "@/types/database";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export interface Product {
  id: string;
  cj_product_id: string;
  slug: string;
  title: string;
  description: string | null;
  price: number;
  compare_price: number | null;
  cost_price: number | null;
  currency: string;
  images: string[];
  stock: number;
  niche: string | null;
  is_hero: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  cj_data: Json | null;
}

function asStringArray(value: Json): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function mapProduct(row: ProductRow): Product {
  return {
    ...row,
    slug: `${slugify(row.title)}-${row.cj_product_id}`,
    images: asStringArray(row.images)
  };
}

export async function getAllProducts(options?: { niche?: string; limit?: number; exclude_id?: string }) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("is_hero", { ascending: false })
    .order("created_at", { ascending: false });

  if (options?.niche) query = query.eq("niche", options.niche);
  if (options?.exclude_id) query = query.neq("id", options.exclude_id);
  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw new Error(`Supabase products query failed: ${error.message}`);
  return (data || []).map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const possibleId = slug.split("-").at(-1) || slug;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .or(`cj_product_id.eq.${possibleId},id.eq.${possibleId}`)
    .maybeSingle();

  if (error) throw new Error(`Supabase product by slug failed: ${error.message}`);
  return data ? mapProduct(data) : null;
}

export async function getHeroProduct() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_hero", true)
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`Supabase hero query failed: ${error.message}`);
  return data ? mapProduct(data) : null;
}

export async function getRelatedProducts(productId: string, limit = 4) {
  const supabase = await createSupabaseServerClient();
  const { data: current } = await supabase
    .from("products")
    .select("niche")
    .eq("id", productId)
    .maybeSingle();

  return getAllProducts({
    niche: current?.niche ?? undefined,
    exclude_id: productId,
    limit
  });
}
