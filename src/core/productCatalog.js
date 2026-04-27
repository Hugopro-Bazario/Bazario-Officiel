import products from "../data/products.json";

export function getAllProducts(source = products) {
  return source.filter((product) => product.active !== false);
}

export function getProductBySlug(slug) {
  return getAllProducts().find((product) => product.slug === slug || product.id === slug || product.url === slug) || null;
}

export function buildOfferMap(source = products) {
  return Object.fromEntries(
    getAllProducts(source).map((product) => [
      product.id,
      {
        label: product.name,
        price: product.price
      }
    ])
  );
}

export function getCheckoutOffers() {
  return buildOfferMap(products);
}

export function searchProducts({ q = "", category = "", limit = 24, offset = 0 } = {}) {
  const query = String(q).trim().toLowerCase();
  const normalizedCategory = String(category).trim().toLowerCase();
  const safeLimit = Math.min(Math.max(Number.parseInt(String(limit), 10) || 24, 1), 100);
  const safeOffset = Math.max(Number.parseInt(String(offset), 10) || 0, 0);

  const filtered = getAllProducts().filter((product) => {
    const matchesCategory = !normalizedCategory || product.category.toLowerCase() === normalizedCategory;
    const searchable = [product.name, product.shortDescription, product.category, product.sku].join(" ").toLowerCase();
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
