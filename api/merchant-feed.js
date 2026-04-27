const products = require("../src/data/products.json");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getBaseUrl() {
  return (process.env.APP_URL || "https://www.bazario-official.com").replace(/\/$/, "");
}

function buildMerchantFeed(source = products) {
  const baseUrl = getBaseUrl();
  const items = source
    .filter((product) => product.active !== false)
    .map((product) => {
      const link = product.url ? `${baseUrl}/${product.url}` : `${baseUrl}/catalogue.html#${product.id}`;
      const imageLink = product.image ? `${baseUrl}/${product.image}` : `${baseUrl}/assets/organisateur-voyage.svg`;

      return `
        <item>
          <g:id>${escapeXml(product.sku || product.id)}</g:id>
          <g:title>${escapeXml(product.name)}</g:title>
          <g:description>${escapeXml(product.description)}</g:description>
          <g:link>${escapeXml(link)}</g:link>
          <g:image_link>${escapeXml(imageLink)}</g:image_link>
          <g:availability>${product.availability === "in_stock" ? "in stock" : "out of stock"}</g:availability>
          <g:price>${Number(product.price).toFixed(2)} ${escapeXml(product.currency || "EUR")}</g:price>
          <g:brand>${escapeXml(product.brand || "Bazario")}</g:brand>
          <g:condition>new</g:condition>
        </item>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Bazario Officiel</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>Flux produits Bazario pour Google Merchant Center.</description>
    ${items}
  </channel>
</rss>`;
}

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=3600");
  return res.status(200).send(buildMerchantFeed());
};

module.exports.buildMerchantFeed = buildMerchantFeed;
