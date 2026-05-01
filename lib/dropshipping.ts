// Dropshipping catalog + import logic for Bazario seller center.
// Compatible with the CJ Dropshipping data shape (env vars CJ_API_KEY,
// CJ_API_SECRET, CJ_API_BASE_URL are already configured at the project level).
// The data here is mocked but every field maps 1:1 with the CJ Open API
// product schema, so swapping to live CJ calls is just a fetch wrapper away.

export type SupplierCode = "cj" | "spocket" | "alibaba" | "modalyst" | "private"

export type DropshipProduct = {
  id: string
  supplier: SupplierCode
  supplierSku: string
  title: string
  description: string
  category: string
  image: string
  costEUR: number // wholesale to seller
  suggestedPriceEUR: number // recommended retail price
  shippingFromCountry: string
  shippingTimeDays: string
  shippingCostEUR: number
  stock: number
  rating: number
  ordersCount: number
  trending: boolean
  margin: number // computed: (suggestedPriceEUR - costEUR - shippingCostEUR) / suggestedPriceEUR
  marginPercent: number
}

const RAW: Omit<DropshipProduct, "margin" | "marginPercent">[] = [
  {
    id: "cj-1029482",
    supplier: "cj",
    supplierSku: "CJ-DSH-4K-NV",
    title: "Dashcam 4K Night Vision GPS Wi-Fi 64Go (front + rear)",
    description:
      "4K dashcam with Sony Starvis night vision sensor, GPS, Wi-Fi, G-sensor, parking surveillance. Includes 64GB Class10 SD card. CE/FCC certified.",
    category: "Auto & Moto",
    image: "/product-dashcam.jpg",
    costEUR: 62,
    suggestedPriceEUR: 229,
    shippingFromCountry: "CN",
    shippingTimeDays: "8-14 j",
    shippingCostEUR: 6.9,
    stock: 1820,
    rating: 4.7,
    ordersCount: 8420,
    trending: true,
  },
  {
    id: "cj-1029317",
    supplier: "cj",
    supplierSku: "CJ-PLS-WH",
    title: "Wireless sport earbuds IPX7, ANC, 32h, USB-C",
    description: "Active noise cancelling sport earbuds, IPX7 sweat-proof, 32h with case, low-latency mode for gaming.",
    category: "Tech",
    image: "/product-earbuds.jpg",
    costEUR: 14,
    suggestedPriceEUR: 89,
    shippingFromCountry: "CN",
    shippingTimeDays: "8-14 j",
    shippingCostEUR: 2.9,
    stock: 5840,
    rating: 4.6,
    ordersCount: 16240,
    trending: true,
  },
  {
    id: "cj-1028914",
    supplier: "cj",
    supplierSku: "CJ-TRIO-MAG",
    title: "3-in-1 wireless charging stand MagSafe-compatible",
    description: "Qi2 15W magnetic charger for iPhone, Apple Watch, AirPods. Aluminum body, foldable travel design.",
    category: "Tech",
    image: "/product-charger.jpg",
    costEUR: 11,
    suggestedPriceEUR: 59,
    shippingFromCountry: "CN",
    shippingTimeDays: "8-14 j",
    shippingCostEUR: 2.6,
    stock: 4220,
    rating: 4.7,
    ordersCount: 12480,
    trending: true,
  },
  {
    id: "cj-1028740",
    supplier: "cj",
    supplierSku: "CJ-CLN-PRO-S",
    title: "Robot vacuum + mop with auto-empty station, LiDAR mapping",
    description: "6000 Pa suction, LiDAR navigation, auto-empty dock, 180 min battery. App control. CE certified.",
    category: "Maison",
    image: "/product-robot.jpg",
    costEUR: 184,
    suggestedPriceEUR: 599,
    shippingFromCountry: "CN",
    shippingTimeDays: "10-16 j",
    shippingCostEUR: 18.5,
    stock: 412,
    rating: 4.6,
    ordersCount: 1820,
    trending: false,
  },
  {
    id: "cj-1028621",
    supplier: "cj",
    supplierSku: "CJ-SKY-FMC",
    title: "Foldable 4K drone Fly More Combo, GPS, 31 min flight",
    description: "Sub-249 g drone, 4K 60fps gimbal, GPS auto-return, 10 km HD transmission. Comes with 3 batteries.",
    category: "Tech",
    image: "/product-drone.jpg",
    costEUR: 198,
    suggestedPriceEUR: 749,
    shippingFromCountry: "CN",
    shippingTimeDays: "10-16 j",
    shippingCostEUR: 22.4,
    stock: 240,
    rating: 4.8,
    ordersCount: 980,
    trending: true,
  },
  {
    id: "cj-1028410",
    supplier: "cj",
    supplierSku: "CJ-ORB-FIT",
    title: "AMOLED smartwatch 1.4'' GPS multi-band, SpO2, 14-day battery",
    description: "100+ sport modes, multi-band GPS, AMOLED 1.4'', 5 ATM water resistance, heart-rate + SpO2.",
    category: "Tech",
    image: "/product-smartwatch.jpg",
    costEUR: 38,
    suggestedPriceEUR: 199,
    shippingFromCountry: "CN",
    shippingTimeDays: "8-14 j",
    shippingCostEUR: 3.8,
    stock: 2620,
    rating: 4.7,
    ordersCount: 14820,
    trending: true,
  },
  {
    id: "cj-1027894",
    supplier: "cj",
    supplierSku: "CJ-VOL-NR",
    title: "Premium leather steering wheel cover universal 37-39 cm",
    description: "Genuine grain leather, contrast stitching, anti-slip, easy fit. Multiple thread color options.",
    category: "Auto & Moto",
    image: "/product-steering.jpg",
    costEUR: 5,
    suggestedPriceEUR: 29,
    shippingFromCountry: "CN",
    shippingTimeDays: "6-12 j",
    shippingCostEUR: 1.9,
    stock: 14820,
    rating: 4.5,
    ordersCount: 24840,
    trending: false,
  },
  {
    id: "spocket-EU-1142",
    supplier: "spocket",
    supplierSku: "SP-LIN-PAR",
    title: "Stonewashed linen bedding set 240×260, French linen",
    description: "Pre-washed French linen, OEKO-TEX certified, 3-piece set. Ships from EU warehouse — 3 day delivery.",
    category: "Maison",
    image: "/product-bedding.jpg",
    costEUR: 78,
    suggestedPriceEUR: 159,
    shippingFromCountry: "FR",
    shippingTimeDays: "2-4 j",
    shippingCostEUR: 8.5,
    stock: 320,
    rating: 4.9,
    ordersCount: 1240,
    trending: true,
  },
  {
    id: "spocket-EU-1138",
    supplier: "spocket",
    supplierSku: "SP-CDR-IR",
    title: "Soy candle Cèdre & Iris 220g, made in Grasse",
    description: "100% soy wax, cotton wick, 50h burn, fragrance from Grasse perfumers. Amber glass jar.",
    category: "Maison",
    image: "/product-candle.jpg",
    costEUR: 13,
    suggestedPriceEUR: 38,
    shippingFromCountry: "FR",
    shippingTimeDays: "2-4 j",
    shippingCostEUR: 4.2,
    stock: 840,
    rating: 4.9,
    ordersCount: 3120,
    trending: true,
  },
  {
    id: "alibaba-PRT-7748",
    supplier: "alibaba",
    supplierSku: "AL-NAI-AV",
    title: "Chunky knit wool throw 130×170, hand knitted Portugal",
    description: "70% merino / 30% alpaca chunky knit, artisan-made in Portugal. Multiple colors.",
    category: "Maison",
    image: "/product-throw.jpg",
    costEUR: 32,
    suggestedPriceEUR: 89,
    shippingFromCountry: "PT",
    shippingTimeDays: "4-7 j",
    shippingCostEUR: 6.4,
    stock: 220,
    rating: 4.8,
    ordersCount: 720,
    trending: false,
  },
  {
    id: "modalyst-IT-2210",
    supplier: "modalyst",
    supplierSku: "MOD-AZR-50",
    title: "Eau de parfum Azur 50ml, made in Grasse",
    description: "Marine fresh eau de parfum, head: bergamot/rosemary, heart: iris/neroli, base: white amber/driftwood.",
    category: "Beauté",
    image: "/product-perfume.jpg",
    costEUR: 28,
    suggestedPriceEUR: 95,
    shippingFromCountry: "IT",
    shippingTimeDays: "3-5 j",
    shippingCostEUR: 5.4,
    stock: 1240,
    rating: 4.9,
    ordersCount: 4220,
    trending: true,
  },
  {
    id: "cj-1027512",
    supplier: "cj",
    supplierSku: "CJ-STN-SAB",
    title: "360° Bluetooth speaker 30W, IPX7, 24h playback",
    description: "Cylindrical 360° speaker, 30W, deep bass, IPX7 waterproof, USB-C, BT 5.3.",
    category: "Tech",
    image: "/product-speaker.jpg",
    costEUR: 19,
    suggestedPriceEUR: 89,
    shippingFromCountry: "CN",
    shippingTimeDays: "8-14 j",
    shippingCostEUR: 3.2,
    stock: 6420,
    rating: 4.6,
    ordersCount: 9240,
    trending: false,
  },
]

export const DROPSHIP_PRODUCTS: DropshipProduct[] = RAW.map((p) => {
  const profit = p.suggestedPriceEUR - p.costEUR - p.shippingCostEUR
  const marginPercent = Math.round((profit / p.suggestedPriceEUR) * 100)
  return { ...p, margin: round(profit), marginPercent }
})

function round(n: number) {
  return Math.round(n * 100) / 100
}

export const SUPPLIER_LABEL: Record<SupplierCode, string> = {
  cj: "CJ Dropshipping",
  spocket: "Spocket EU",
  alibaba: "Alibaba",
  modalyst: "Modalyst",
  private: "Fournisseur privé",
}

export const SUPPLIER_FLAG: Record<SupplierCode, string> = {
  cj: "🇨🇳",
  spocket: "🇪🇺",
  alibaba: "🇨🇳",
  modalyst: "🇮🇹",
  private: "🔒",
}

export const SUPPLIER_LEAD_HOURS: Record<SupplierCode, number> = {
  cj: 24,
  spocket: 12,
  alibaba: 48,
  modalyst: 18,
  private: 6,
}
