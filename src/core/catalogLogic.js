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

export function isValidContactRequest(payload) {
  if (!payload || typeof payload !== "object") return false;

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (name.length < 2) return false;
  if (!EMAIL_PATTERN.test(email)) return false;
  if (message.length < 10) return false;

  return true;
}
