import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { cjFetch } from "../lib/cj";

type ImportConfig = {
  usd_to_eur: number;
  markup_multiplier: number;
  compare_price_multiplier: number;
};

type ImportFile = {
  niche: string;
  hero: string;
  products: string[];
  config: ImportConfig;
};

let didLogRawPayload = false;

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

function parseImportArgs() {
  const onlyPidArg = process.argv.slice(2).find((arg) => arg.startsWith("--only-pid="));
  return {
    onlyPid: onlyPidArg ? onlyPidArg.replace("--only-pid=", "").trim() : ""
  };
}

async function readImportConfig(): Promise<ImportFile> {
  const raw = await readFile(new URL("./cj-products.json", import.meta.url), "utf8");
  const parsed = JSON.parse(raw) as ImportFile;

  if (!Array.isArray(parsed.products) || parsed.products.length === 0) {
    throw new Error("Le fichier scripts/cj-products.json doit contenir au moins 1 PID.");
  }

  if (!parsed.config) {
    throw new Error("Le bloc config est requis dans scripts/cj-products.json.");
  }

  return parsed;
}

function roundPrice(value: number): number {
  return Math.round(value * 100) / 100;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickFirstString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    const first = value.find((entry) => typeof entry === "string");
    return typeof first === "string" ? first.trim() : "";
  }
  return "";
}

function asNumber(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function asImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (entry && typeof entry === "object") {
        const asRecord = entry as Record<string, unknown>;
        return (
          pickFirstString(asRecord.url) ||
          pickFirstString(asRecord.image) ||
          pickFirstString(asRecord.src)
        );
      }
      return "";
    })
    .filter(Boolean);
}

function maybeLogRawPayload(payload: unknown) {
  if (didLogRawPayload) return;
  didLogRawPayload = true;
  console.log("Payload CJ brut (debug unique):");
  console.log(JSON.stringify(payload, null, 2));
}

function extractStock(product: Record<string, unknown>): number {
  const fields = [
    "totalInventoryNum",
    "inventoryNum",
    "stock",
    "inventory",
    "quantity"
  ];
  for (const field of fields) {
    const value = asNumber(product[field]);
    if (value !== null) return Math.max(0, Math.floor(value));
  }
  return 0;
}

function extractCjProductPayload(response: unknown): Record<string, unknown> {
  if (!response || typeof response !== "object") {
    maybeLogRawPayload(response);
    throw new Error("Réponse CJ invalide: objet attendu.");
  }

  const root = response as Record<string, unknown>;
  const data = root.data;

  let product: unknown = data;
  if (Array.isArray(data)) product = data[0];
  if (product && typeof product === "object" && "list" in (product as Record<string, unknown>)) {
    const list = (product as Record<string, unknown>).list;
    if (Array.isArray(list)) product = list[0];
  }

  if (!product || typeof product !== "object") {
    maybeLogRawPayload(response);
    throw new Error("Structure CJ inattendue: produit introuvable.");
  }

  return product as Record<string, unknown>;
}

function mapToImportRecord(params: {
  pid: string;
  niche: string;
  heroPid: string;
  config: ImportConfig;
  product: Record<string, unknown>;
  rawResponse: unknown;
}) {
  const { pid, niche, heroPid, config, product, rawResponse } = params;
  const title =
    pickFirstString(product.productName) ||
    pickFirstString(product.title) ||
    pickFirstString(product.name);

  const costUsd =
    asNumber(product.sellPrice) ??
    asNumber(product.price) ??
    asNumber(product.cjPrice) ??
    asNumber(product.costPrice);

  if (!title || costUsd === null) {
    maybeLogRawPayload(rawResponse);
    throw new Error("Mapping CJ incomplet: title ou cost USD introuvable.");
  }

  const price = roundPrice(costUsd * config.usd_to_eur * config.markup_multiplier);
  const comparePrice = roundPrice(price * config.compare_price_multiplier);
  const images =
    asImages(product.productImage) ||
    asImages(product.images) ||
    asImages(product.imageList);
  const stock = extractStock(product);

  return {
    cj_product_id: pid,
    title,
    description: pickFirstString(product.description) || null,
    price,
    compare_price: comparePrice,
    cost_price: roundPrice(costUsd * config.usd_to_eur),
    currency: "EUR",
    images,
    stock,
    niche,
    is_hero: pid === heroPid,
    is_active: stock > 0,
    cj_data: rawResponse
  };
}

async function main() {
  const supabaseUrl = cleanEnv(process.env.SUPABASE_URL);
  const serviceRoleKey = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Variables Supabase manquantes (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }

  const args = parseImportArgs();
  const configFile = await readImportConfig();
  const pids = args.onlyPid
    ? [args.onlyPid]
    : configFile.products.map((pid) => String(pid).trim()).filter(Boolean);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });

  let imported = 0;
  let failed = 0;

  for (const pid of pids) {
    try {
      const response = await cjFetch(`/product/query?pid=${encodeURIComponent(pid)}`, { method: "GET" });
      const product = extractCjProductPayload(response);
      const record = mapToImportRecord({
        pid,
        niche: configFile.niche,
        heroPid: configFile.hero,
        config: configFile.config,
        product,
        rawResponse: response
      });

      const { error } = await supabase
        .from("products")
        .upsert(record, { onConflict: "cj_product_id" });

      if (error) throw new Error(`Supabase upsert: ${error.message}`);

      imported += 1;
      console.log(`✓ "${record.title}" importé à ${record.price.toFixed(2)} EUR`);
    } catch (error) {
      failed += 1;
      console.error(`✗ PID ${pid}: ${error instanceof Error ? error.message : String(error)}`);
    }

    await delay(1100);
  }

  console.log(`Import terminé: ${imported} importés / ${failed} échoués`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
