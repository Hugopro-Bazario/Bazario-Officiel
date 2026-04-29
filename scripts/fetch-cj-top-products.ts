import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cjFetch } from "../lib/cj";

type TargetQuery = {
  label: string;
  keyword: string;
};

type NormalizedProduct = {
  category: string;
  pid: string;
  name: string;
  sku: string;
  price_usd: number | null;
  image: string;
  url: string;
};

const TARGET_QUERIES: TargetQuery[] = [
  { label: "Maison & cuisine", keyword: "kitchen gadget" },
  { label: "Beaute & soins", keyword: "beauty tool" },
  { label: "Tech accessoires", keyword: "phone accessory" },
  { label: "Sport & outdoor", keyword: "outdoor sport" },
  { label: "Animaux", keyword: "pet accessory" }
];

const PRODUCTS_PER_QUERY = 20;
const REQUEST_DELAY_MS = 1100;
let didLogRawPayload = false;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT_DIR, "data");

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function firstString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) {
    const first = value.find((entry) => typeof entry === "string");
    return typeof first === "string" ? first.trim() : "";
  }
  return "";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function productUrlFromPid(pid: string): string {
  return `https://app.cjdropshipping.com/product-detail.html?productId=${encodeURIComponent(pid)}`;
}

function extractList(payload: unknown): Record<string, unknown>[] {
  if (!payload || typeof payload !== "object") {
    if (!didLogRawPayload) {
      didLogRawPayload = true;
      console.log("Payload CJ brut (debug unique):");
      console.log(JSON.stringify(payload, null, 2));
    }
    return [];
  }

  const root = payload as Record<string, unknown>;
  const data = root.data;

  if (Array.isArray(data)) {
    return data.filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
  }

  if (data && typeof data === "object") {
    const asRecord = data as Record<string, unknown>;
    if (Array.isArray(asRecord.list)) {
      return asRecord.list.filter(
        (item): item is Record<string, unknown> => !!item && typeof item === "object"
      );
    }
  }

  if (!didLogRawPayload) {
    didLogRawPayload = true;
    console.log("Payload CJ brut (debug unique):");
    console.log(JSON.stringify(payload, null, 2));
  }

  return [];
}

function normalizeProduct(raw: Record<string, unknown>, category: string): NormalizedProduct | null {
  const pid = firstString(raw.pid) || firstString(raw.productId) || firstString(raw.id);
  if (!pid) return null;

  const name =
    firstString(raw.productNameEn) ||
    firstString(raw.productName) ||
    firstString(raw.name) ||
    "Produit sans nom";

  const sku = firstString(raw.productSku) || firstString(raw.sku);
  const image = firstString(raw.productImage) || firstString(raw.image);
  const priceUsd =
    asNumber(raw.sellPrice) ??
    asNumber(raw.price) ??
    asNumber(raw.cjPrice) ??
    asNumber(raw.costPrice);

  return {
    category,
    pid,
    name,
    sku,
    price_usd: priceUsd,
    image,
    url: productUrlFromPid(pid)
  };
}

async function fetchProductsByKeyword(query: TargetQuery): Promise<NormalizedProduct[]> {
  const endpoint = `/product/list?pageNum=1&pageSize=${PRODUCTS_PER_QUERY}&productNameEn=${encodeURIComponent(query.keyword)}`;
  const payload = await cjFetch(endpoint, { method: "GET" });
  const list = extractList(payload);

  return list
    .map((item) => normalizeProduct(item, query.label))
    .filter((item): item is NormalizedProduct => item !== null);
}

async function main() {
  console.log("Recuperation CJ top products...");
  const allProducts: NormalizedProduct[] = [];

  for (const query of TARGET_QUERIES) {
    try {
      console.log(`- ${query.label} (${query.keyword})`);
      const products = await fetchProductsByKeyword(query);
      allProducts.push(...products);
      console.log(`  ${products.length} produits recuperes`);
    } catch (error) {
      console.error(
        `  Erreur sur ${query.keyword}: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    await sleep(REQUEST_DELAY_MS);
  }

  const seen = new Set<string>();
  const deduped = allProducts.filter((product) => {
    if (!product.pid || seen.has(product.pid)) return false;
    seen.add(product.pid);
    return true;
  });

  deduped.sort((a, b) => {
    const aPrice = a.price_usd ?? Number.MAX_SAFE_INTEGER;
    const bPrice = b.price_usd ?? Number.MAX_SAFE_INTEGER;
    return aPrice - bPrice;
  });

  await mkdir(OUTPUT_DIR, { recursive: true });

  const jsonPath = path.join(OUTPUT_DIR, "cj-top-products.json");
  const mdPath = path.join(OUTPUT_DIR, "cj-top-products.md");

  await writeFile(jsonPath, JSON.stringify(deduped, null, 2), "utf8");

  const lines = [
    "# Top produits CJ Dropshipping",
    "",
    `Genere le ${new Date().toISOString().slice(0, 10)} - ${deduped.length} produits.`,
    ""
  ];

  for (const [index, product] of deduped.entries()) {
    lines.push(
      `${index + 1}. [${product.name}](${product.url}) - ${product.category} - ${product.price_usd ?? "N/A"} USD - SKU: ${product.sku || "N/A"}`
    );
  }

  await writeFile(mdPath, lines.join("\n"), "utf8");

  console.log(`Termine: ${deduped.length} produits`);
  console.log(`- ${jsonPath}`);
  console.log(`- ${mdPath}`);
}

main().catch((error) => {
  console.error("Echec du script:", error instanceof Error ? error.message : String(error));
  process.exit(1);
});
