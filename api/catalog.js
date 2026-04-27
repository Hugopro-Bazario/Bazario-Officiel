const products = require("../src/data/products.json");

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

function searchProducts({ q = "", category = "", limit = 24, offset = 0 } = {}) {
  const query = normalizeText(q);
  const normalizedCategory = normalizeText(category);
  const safeLimit = Math.min(Math.max(Number.parseInt(String(limit), 10) || 24, 1), 100);
  const safeOffset = Math.max(Number.parseInt(String(offset), 10) || 0, 0);

  const filtered = products
    .filter((product) => product.active !== false)
    .filter((product) => {
      const matchesCategory = !normalizedCategory || normalizeText(product.category) === normalizedCategory;
      const searchable = [product.name, product.description, product.category, product.sku].join(" ").toLowerCase();
      const matchesQuery = !query || searchable.includes(query);
      return matchesCategory && matchesQuery;
    });

  return {
    total: filtered.length,
    limit: safeLimit,
    offset: safeOffset,
    items: filtered.slice(safeOffset, safeOffset + safeLimit)
  };
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = searchProducts(req.query || {});
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  return res.status(200).json(result);
};
