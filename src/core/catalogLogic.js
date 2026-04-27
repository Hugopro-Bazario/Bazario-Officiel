const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeCategoryName(category) {
  if (typeof category !== "string") return "uncategorized";
  const normalized = category.trim().toLowerCase();
  return normalized.length > 0 ? normalized : "uncategorized";
}

export function buildCategorySummary(products) {
  if (!Array.isArray(products)) return [];

  const counts = new Map();

  for (const product of products) {
    const category = normalizeCategoryName(product?.category);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total || a.category.localeCompare(b.category));
}

export function getFeaturedProducts(products, max = 3) {
  if (!Array.isArray(products) || max <= 0) return [];

  return [...products]
    .filter((item) => typeof item?.score === "number")
    .sort((a, b) => b.score - a.score || String(a.name ?? "").localeCompare(String(b.name ?? "")))
    .slice(0, max);
}

export function normalizeContactRequest(payload) {
  const input = payload && typeof payload === "object" ? payload : {};

  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    topic: String(input.topic ?? "").trim(),
    message: String(input.message ?? "").trim()
  };
}

export function validateContactRequest(payload) {
  const data = normalizeContactRequest(payload);
  const errors = [];

  if (data.name.length < 2) errors.push("Nom invalide");
  if (!EMAIL_PATTERN.test(data.email)) errors.push("Email invalide");
  if (!["commande", "livraison", "retour", "partenariat", "autre"].includes(data.topic)) {
    errors.push("Sujet invalide");
  }
  if (data.message.length < 10) errors.push("Message trop court");
  if (data.message.length > 2000) errors.push("Message trop long");

  return {
    isValid: errors.length === 0,
    errors,
    data
  };
}

export function isValidContactRequest(payload) {
  return validateContactRequest(payload).isValid;
}
