import { describe, expect, it } from "vitest";
import {
  buildOfferMap,
  getAllProducts,
  getProductBySlug,
  searchProducts
} from "../../src/core/productCatalog";

describe("productCatalog", () => {
  it("exposes active products from the central catalog", () => {
    expect(getAllProducts().length).toBeGreaterThanOrEqual(3);
  });

  it("builds checkout offers keyed by product id", () => {
    expect(Object.keys(buildOfferMap())).toEqual([
      "organisateur-voyage",
      "support-telephone",
      "lampe-led-nomade"
    ]);
  });

  it("finds products by id or slug", () => {
    expect(getProductBySlug("organisateur-voyage")?.sku).toBe("BZ-DEMO-001");
    expect(getProductBySlug("produit-organisateur-voyage.html")?.id).toBe("organisateur-voyage");
  });

  it("searches products by query with pagination bounds", () => {
    const result = searchProducts({ q: "lampe", limit: 1, offset: 0 });

    expect(result.total).toBe(1);
    expect(result.items[0].id).toBe("lampe-led-nomade");
    expect(result.limit).toBe(1);
  });

  it("filters products by category", () => {
    const result = searchProducts({ category: "Maison pratique" });

    expect(result.items.map((product) => product.id)).toEqual([
      "organisateur-voyage",
      "lampe-led-nomade"
    ]);
  });
});
