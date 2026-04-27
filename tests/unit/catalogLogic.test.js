import { describe, expect, it } from "vitest";
import {
  buildCategorySummary,
  getFeaturedProducts,
  isValidContactRequest,
  normalizeCategoryName,
  normalizeContactRequest,
  validateContactRequest
} from "../../src/core/catalogLogic";

describe("normalizeCategoryName", () => {
  it("normalizes category strings", () => {
    expect(normalizeCategoryName("  Tech & Innovation  ")).toBe("tech & innovation");
  });

  it("falls back to uncategorized for invalid values", () => {
    expect(normalizeCategoryName("")).toBe("uncategorized");
    expect(normalizeCategoryName(null)).toBe("uncategorized");
  });
});

describe("buildCategorySummary", () => {
  it("aggregates product counts by normalized category", () => {
    const summary = buildCategorySummary([
      { name: "A", category: "Tech" },
      { name: "B", category: " tech " },
      { name: "C", category: "Mode" },
      { name: "D", category: null }
    ]);

    expect(summary).toEqual([
      { category: "tech", total: 2 },
      { category: "mode", total: 1 },
      { category: "uncategorized", total: 1 }
    ]);
  });
});

describe("getFeaturedProducts", () => {
  it("returns top products sorted by score", () => {
    const featured = getFeaturedProducts(
      [
        { name: "Alpha", score: 70 },
        { name: "Beta", score: 92 },
        { name: "Gamma", score: 85 },
        { name: "Delta", score: 92 }
      ],
      3
    );

    expect(featured.map((item) => item.name)).toEqual(["Beta", "Delta", "Gamma"]);
  });

  it("returns empty array for invalid inputs", () => {
    expect(getFeaturedProducts(null)).toEqual([]);
    expect(getFeaturedProducts([], 0)).toEqual([]);
  });
});

describe("isValidContactRequest", () => {
  it("validates a correct contact payload", () => {
    expect(
      isValidContactRequest({
        name: "Hugo",
        email: "hugo@example.com",
        topic: "commande",
        message: "Bonjour, je veux plus d'informations."
      })
    ).toBe(true);
  });

  it("rejects invalid payloads", () => {
    expect(
      isValidContactRequest({
        name: "H",
        email: "not-an-email",
        topic: "invalid",
        message: "short"
      })
    ).toBe(false);
  });
});

describe("normalizeContactRequest", () => {
  it("trims contact fields", () => {
    expect(
      normalizeContactRequest({
        name: "  Hugo  ",
        email: "  hugo@example.com ",
        topic: " commande ",
        message: "  Bonjour Bazario  "
      })
    ).toEqual({
      name: "Hugo",
      email: "hugo@example.com",
      topic: "commande",
      message: "Bonjour Bazario"
    });
  });
});

describe("validateContactRequest", () => {
  it("returns normalized data and no errors for valid contact requests", () => {
    const result = validateContactRequest({
      name: "Hugo",
      email: "hugo@example.com",
      topic: "partenariat",
      message: "Bonjour, je souhaite proposer un partenariat."
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.data.topic).toBe("partenariat");
  });

  it("rejects unknown topics and overly long messages", () => {
    const result = validateContactRequest({
      name: "Hugo",
      email: "hugo@example.com",
      topic: "spam",
      message: "x".repeat(2001)
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Sujet invalide");
    expect(result.errors).toContain("Message trop long");
  });
});
