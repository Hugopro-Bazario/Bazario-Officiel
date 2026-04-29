import { cjFetch, getCjAccessToken } from "../lib/cj";

function getPidFromArgs(): string {
  const cliArg = process.argv.slice(2).find((arg) => arg.startsWith("--pid="));
  if (cliArg) return cliArg.replace("--pid=", "").trim();
  return "";
}

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractProductSummary(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;
  const root = payload as Record<string, unknown>;

  const directData = root.data;
  const product = (Array.isArray(directData) ? directData[0] : directData) as
    | Record<string, unknown>
    | undefined;
  if (!product || typeof product !== "object") return null;

  const title =
    (product.productName as string) ||
    (product.title as string) ||
    (product.name as string) ||
    "";

  const cjPrice =
    asNumber(product.sellPrice) ??
    asNumber(product.price) ??
    asNumber(product.cjPrice) ??
    asNumber(product.costPrice);

  const images =
    (Array.isArray(product.productImage) && product.productImage) ||
    (Array.isArray(product.images) && product.images) ||
    [];

  const stockRaw =
    asNumber(product.totalInventoryNum) ??
    asNumber(product.inventoryNum) ??
    asNumber(product.stock) ??
    0;

  if (!title) return null;

  return {
    title,
    cjPrice,
    imagesCount: images.length,
    stockTotal: stockRaw
  };
}

async function main() {
  const pid = getPidFromArgs();
  if (!pid) {
    throw new Error("PID test manquant. Utilise: --pid=<PID_TEST>");
  }

  await getCjAccessToken();
  console.log("Auth OK");

  const response = await cjFetch(`/product/query?pid=${encodeURIComponent(pid)}`, {
    method: "GET"
  });

  const summary = extractProductSummary(response);
  if (!summary) {
    console.log("Payload CJ brut (debug unique):");
    console.log(JSON.stringify(response, null, 2));
    throw new Error("Structure CJ inattendue. Merci de valider le mapping avant la suite.");
  }

  console.log(`Produit: ${summary.title}`);
  console.log(`Prix CJ: ${summary.cjPrice ?? "N/A"}`);
  console.log(`Images: ${summary.imagesCount}`);
  console.log(`Stock total: ${summary.stockTotal}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
