import { describe, expect, it } from "vitest";
import {
  AVAILABLE_OFFERS,
  calculateOrderTotal,
  normalizeCheckoutPayload,
  validateCheckoutPayload
} from "../../src/core/checkoutLogic";

describe("checkoutLogic > normalizeCheckoutPayload", () => {
  it("normalizes and trims fields", () => {
    const data = normalizeCheckoutPayload({
      fullName: "  Hugo Pro  ",
      email: "  hugo@mail.com ",
      quantity: "2",
      offerId: "starter"
    });

    expect(data.fullName).toBe("Hugo Pro");
    expect(data.email).toBe("hugo@mail.com");
    expect(data.quantity).toBe(2);
  });
});

describe("checkoutLogic > calculateOrderTotal", () => {
  it("calculates total from offer and quantity", () => {
    expect(calculateOrderTotal("growth", 2)).toBe(159.8);
  });

  it("returns 0 for invalid input", () => {
    expect(calculateOrderTotal("unknown", 2)).toBe(0);
    expect(calculateOrderTotal("starter", 0)).toBe(0);
  });
});

describe("checkoutLogic > validateCheckoutPayload", () => {
  it("accepts a valid checkout payload", () => {
    const result = validateCheckoutPayload({
      fullName: "Hugo Pro",
      email: "hugo@mail.com",
      phone: "0600000000",
      city: "Paris",
      country: "France",
      address: "10 rue Victor Hugo",
      offerId: "premium",
      quantity: 1,
      note: "Livraison rapide"
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects invalid fields", () => {
    const result = validateCheckoutPayload({
      fullName: "H",
      email: "invalid",
      phone: "12",
      city: "",
      country: "",
      address: "x",
      offerId: "invalid",
      quantity: 99
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(4);
  });

  it("keeps offer ids aligned with configured offers", () => {
    expect(Object.keys(AVAILABLE_OFFERS)).toEqual(["starter", "growth", "premium"]);
  });
});
