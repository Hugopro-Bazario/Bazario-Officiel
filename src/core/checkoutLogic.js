import { buildOfferMap } from "./productCatalog.js";
import products from "../data/products.json" with { type: "json" };

export const AVAILABLE_OFFERS = Object.freeze(buildOfferMap(products));

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeCheckoutPayload(payload) {
  const input = payload && typeof payload === "object" ? payload : {};

  return {
    fullName: String(input.fullName ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    city: String(input.city ?? "").trim(),
    country: String(input.country ?? "").trim(),
    address: String(input.address ?? "").trim(),
    offerId: String(input.offerId ?? "").trim(),
    quantity: Number.parseInt(String(input.quantity ?? "1"), 10),
    note: String(input.note ?? "").trim()
  };
}

export function calculateOrderTotal(offerId, quantity) {
  const offer = AVAILABLE_OFFERS[offerId];
  const normalizedQty = Number.isInteger(quantity) ? quantity : Number.parseInt(String(quantity), 10);

  if (!offer || !Number.isInteger(normalizedQty) || normalizedQty < 1) return 0;
  return Number((offer.price * normalizedQty).toFixed(2));
}

export function validateCheckoutPayload(payload) {
  const data = normalizeCheckoutPayload(payload);
  const errors = [];

  if (data.fullName.length < 2) errors.push("Nom invalide");
  if (!EMAIL_PATTERN.test(data.email)) errors.push("Email invalide");
  if (data.phone.length < 6) errors.push("Téléphone invalide");
  if (data.city.length < 2) errors.push("Ville invalide");
  if (data.country.length < 2) errors.push("Pays invalide");
  if (data.address.length < 4) errors.push("Adresse invalide");
  if (!AVAILABLE_OFFERS[data.offerId]) errors.push("Offre inconnue");
  if (!Number.isInteger(data.quantity) || data.quantity < 1 || data.quantity > 20) errors.push("Quantité invalide");
  if (data.note.length > 500) errors.push("Note trop longue");

  return {
    isValid: errors.length === 0,
    errors,
    data
  };
}
