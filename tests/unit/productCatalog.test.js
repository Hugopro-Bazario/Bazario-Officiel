import { describe, expect, it } from "vitest";
import {
  buildOfferMap,
  getAllProducts,
  getProductBySlug,
  searchProducts
} from "../../src/core/productCatalog";

describe("productCatalog", () => {
  it("exposes active products from the central catalog", () => {
    expect(getAllProducts().length).toBeGreaterThanOrEqual(6);
  });

  it("builds checkout offers keyed by product id", () => {
    expect(Object.keys(buildOfferMap())).toEqual([
      "pack-prompts-ia",
      "template-notion-business",
      "ebook-monetiser-ia",
      "pack-assets-ia",
      "kit-automatisation-ia",
      "megapack-createur"
    ]);
  });

  it("finds products by id or slug", () => {
    expect(getProductBySlug("pack-prompts-ia")?.sku).toBe("BZ-DIG-001");
    expect(getProductBySlug("produit-pack-prompts-ia.html")?.id).toBe("pack-prompts-ia");
  });

  it("searches products by query with pagination bounds", () => {
    const result = searchProducts({ q: "ebook", limit: 1, offset: 0 });

    expect(result.total).toBe(1);
    expect(result.items[0].id).toBe("ebook-monetiser-ia");
    expect(result.limit).toBe(1);
  });

  it("filters products by category", () => {
    const result = searchProducts({ category: "Prompts & IA" });

    expect(result.items.map((product) => product.id)).toEqual([
      "pack-prompts-ia",
      "kit-automatisation-ia"
    ]);
  });
});
