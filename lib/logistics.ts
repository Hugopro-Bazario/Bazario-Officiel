// Real-world logistics layer for Bazario seller center.
// Covers orders, shipments, carriers, warehouses, stock, returns.
// Data is mocked but the shapes are production-ready: every field maps
// to a real e-commerce / 3PL contract (DPD, Colissimo, Mondial Relay,
// DHL Express, UPS Standard) and to standard ERP fields.

export type OrderStatus =
  | "new"
  | "to_pack"
  | "packed"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "returned"
  | "cancelled"

export type Carrier =
  | "Colissimo"
  | "Mondial Relay"
  | "Chronopost"
  | "DPD"
  | "DHL Express"
  | "UPS Standard"
  | "FedEx International"
  | "Bazario Express"

export type FulfillmentChannel = "self" | "bazario_logistics" | "dropship_cj" | "dropship_supplier"

export type Address = {
  name: string
  street: string
  zip: string
  city: string
  country: string
  countryCode: string
  phone?: string
}

export type OrderLine = {
  sku: string
  title: string
  qty: number
  unitPrice: number
  image: string
  productSlug: string
  warehouse?: string
}

export type Order = {
  id: string
  number: string
  createdAt: string
  buyer: {
    name: string
    email: string
    address: Address
  }
  lines: OrderLine[]
  subtotal: number
  shippingCost: number
  total: number
  currency: string
  status: OrderStatus
  fulfillment: FulfillmentChannel
  carrier?: Carrier
  tracking?: string
  shippedAt?: string
  deliveredAt?: string
  paymentMethod: string
  notes?: string
}

export type ShipmentStatus =
  | "label_created"
  | "ready_for_pickup"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "exception"

export type Shipment = {
  id: string
  orderNumber: string
  carrier: Carrier
  service: string
  tracking: string
  weightKg: number
  dimsCm: { l: number; w: number; h: number }
  cost: number
  status: ShipmentStatus
  origin: string
  destination: string
  destinationCountry: string
  createdAt: string
  estimatedDelivery: string
  events: { at: string; label: string; location: string }[]
  labelUrl: string
}

export type Warehouse = {
  id: string
  name: string
  city: string
  country: string
  capacityM3: number
  usagePercent: number
  skus: number
}

export type StockMovement = {
  id: string
  sku: string
  title: string
  warehouse: string
  type: "inbound" | "outbound" | "transfer" | "adjust"
  qty: number
  refOrder?: string
  at: string
}

export type ReturnRequest = {
  id: string
  orderNumber: string
  buyerName: string
  reason: string
  items: { sku: string; title: string; qty: number; image: string }[]
  amount: number
  status: "requested" | "label_sent" | "in_transit" | "received" | "refunded" | "rejected"
  createdAt: string
  carrier?: Carrier
  tracking?: string
  resolution: "refund" | "exchange" | "store_credit" | "pending"
}

export type CarrierRate = {
  carrier: Carrier
  service: string
  estimatedDays: string
  price: number
  trackable: boolean
  pickup: boolean
  insurance: boolean
}

// ----- mocked but realistic data -----------------------------------------

export const ORDERS: Order[] = [
  {
    id: "ord_42193",
    number: "BZ-2026-04193",
    createdAt: "2026-04-26T09:14:00Z",
    buyer: {
      name: "Marie Dupont",
      email: "marie.d@example.com",
      address: {
        name: "Marie Dupont",
        street: "12 rue de la Paix",
        zip: "75002",
        city: "Paris",
        country: "France",
        countryCode: "FR",
        phone: "+33 6 12 34 56 78",
      },
    },
    lines: [
      {
        sku: "AUR-COG",
        title: "Sac à main cuir cognac Aurélie",
        qty: 1,
        unitPrice: 245,
        image: "/product-bag-cognac.jpg",
        productSlug: "sac-cuir-cognac-aurelie",
        warehouse: "WH-PAR",
      },
    ],
    subtotal: 245,
    shippingCost: 0,
    total: 245,
    currency: "EUR",
    status: "new",
    fulfillment: "self",
    paymentMethod: "Carte Visa •• 4242",
  },
  {
    id: "ord_42191",
    number: "BZ-2026-04191",
    createdAt: "2026-04-26T08:02:00Z",
    buyer: {
      name: "Stéphane Bernard",
      email: "s.bernard@example.com",
      address: {
        name: "Stéphane Bernard",
        street: "47 quai de Bondy",
        zip: "69001",
        city: "Lyon",
        country: "France",
        countryCode: "FR",
      },
    },
    lines: [
      {
        sku: "ORB-FIT-BK",
        title: "Smartwatch Orbis Fit GPS",
        qty: 1,
        unitPrice: 199,
        image: "/product-smartwatch.jpg",
        productSlug: "smartwatch-orbis-fit",
        warehouse: "WH-FRA",
      },
    ],
    subtotal: 199,
    shippingCost: 4.9,
    total: 203.9,
    currency: "EUR",
    status: "to_pack",
    fulfillment: "bazario_logistics",
    paymentMethod: "Apple Pay",
  },
  {
    id: "ord_42188",
    number: "BZ-2026-04188",
    createdAt: "2026-04-25T16:42:00Z",
    buyer: {
      name: "Karim Aït Saïd",
      email: "karim@example.com",
      address: {
        name: "Karim Aït Saïd",
        street: "8 rue Victor Hugo",
        zip: "31000",
        city: "Toulouse",
        country: "France",
        countryCode: "FR",
      },
    },
    lines: [
      {
        sku: "PLS-WH",
        title: "Écouteurs sport Pulse",
        qty: 1,
        unitPrice: 129,
        image: "/product-earbuds.jpg",
        productSlug: "ecouteurs-sport-pulse",
        warehouse: "WH-FRA",
      },
      {
        sku: "GRD-SG",
        title: "Gourde isotherme Sage 750 ml",
        qty: 1,
        unitPrice: 32,
        image: "/product-bottle.jpg",
        productSlug: "gourde-isotherme-sage",
        warehouse: "WH-PAR",
      },
    ],
    subtotal: 161,
    shippingCost: 4.9,
    total: 165.9,
    currency: "EUR",
    status: "to_pack",
    fulfillment: "self",
    paymentMethod: "Carte Visa •• 1011",
  },
  {
    id: "ord_42172",
    number: "BZ-2026-04172",
    createdAt: "2026-04-24T12:21:00Z",
    buyer: {
      name: "Léna Chen",
      email: "lena.c@example.com",
      address: {
        name: "Léna Chen",
        street: "21 avenue de la Liberté",
        zip: "L-1931",
        city: "Luxembourg",
        country: "Luxembourg",
        countryCode: "LU",
      },
    },
    lines: [
      {
        sku: "SOL-LT-80",
        title: "Miroir rond Soleil Ø80 cm",
        qty: 1,
        unitPrice: 149,
        image: "/product-mirror.jpg",
        productSlug: "miroir-rond-laiton-soleil",
        warehouse: "WH-PAR",
      },
    ],
    subtotal: 149,
    shippingCost: 14.9,
    total: 163.9,
    currency: "EUR",
    status: "shipped",
    fulfillment: "bazario_logistics",
    carrier: "DPD",
    tracking: "DPD15523784771LU",
    shippedAt: "2026-04-25T10:00:00Z",
    paymentMethod: "Carte Visa •• 8042",
  },
  {
    id: "ord_42120",
    number: "BZ-2026-04120",
    createdAt: "2026-04-22T08:12:00Z",
    buyer: {
      name: "Paul Martin",
      email: "paul.m@example.com",
      address: {
        name: "Paul Martin",
        street: "3 rue des Lilas",
        zip: "13001",
        city: "Marseille",
        country: "France",
        countryCode: "FR",
      },
    },
    lines: [
      {
        sku: "EDN-CRM",
        title: "Foulard 100 % soie Éden",
        qty: 1,
        unitPrice: 89,
        image: "/product-scarf.jpg",
        productSlug: "foulard-soie-eden",
        warehouse: "WH-PAR",
      },
    ],
    subtotal: 89,
    shippingCost: 0,
    total: 89,
    currency: "EUR",
    status: "delivered",
    fulfillment: "self",
    carrier: "Colissimo",
    tracking: "CL00214557789FR",
    shippedAt: "2026-04-22T16:30:00Z",
    deliveredAt: "2026-04-24T11:42:00Z",
    paymentMethod: "Carte Mastercard •• 2018",
  },
  {
    id: "ord_42098",
    number: "BZ-2026-04098",
    createdAt: "2026-04-20T19:55:00Z",
    buyer: {
      name: "Jeanne Moreau",
      email: "j.moreau@example.com",
      address: {
        name: "Jeanne Moreau",
        street: "Calle de Alcalá 45",
        zip: "28014",
        city: "Madrid",
        country: "Espagne",
        countryCode: "ES",
      },
    },
    lines: [
      {
        sku: "CHO-4",
        title: "Chocolat noir Grand Cru Madagascar",
        qty: 2,
        unitPrice: 28,
        image: "/product-chocolate.jpg",
        productSlug: "chocolat-noir-grand-cru",
        warehouse: "WH-FRA",
      },
      {
        sku: "OLI-500",
        title: "Huile d'olive extra-vierge Toscane",
        qty: 1,
        unitPrice: 24,
        image: "/product-olive-oil.jpg",
        productSlug: "huile-olive-toscane-extra",
        warehouse: "WH-FRA",
      },
    ],
    subtotal: 80,
    shippingCost: 9.9,
    total: 89.9,
    currency: "EUR",
    status: "delivered",
    fulfillment: "bazario_logistics",
    carrier: "DHL Express",
    tracking: "DHL5538291004",
    shippedAt: "2026-04-21T07:14:00Z",
    deliveredAt: "2026-04-23T15:10:00Z",
    paymentMethod: "Apple Pay",
  },
  {
    id: "ord_42040",
    number: "BZ-2026-04040",
    createdAt: "2026-04-18T10:18:00Z",
    buyer: {
      name: "Elena Rossi",
      email: "elena.r@example.com",
      address: {
        name: "Elena Rossi",
        street: "Via Roma 18",
        zip: "20121",
        city: "Milano",
        country: "Italie",
        countryCode: "IT",
      },
    },
    lines: [
      {
        sku: "DSH-2",
        title: "Dashcam 4K Night Vision (avant + arrière)",
        qty: 1,
        unitPrice: 229,
        image: "/product-dashcam.jpg",
        productSlug: "dashcam-4k-night",
        warehouse: "DROP-CJ-CN",
      },
    ],
    subtotal: 229,
    shippingCost: 6.9,
    total: 235.9,
    currency: "EUR",
    status: "in_transit",
    fulfillment: "dropship_cj",
    carrier: "FedEx International",
    tracking: "FX7724093311",
    shippedAt: "2026-04-19T03:11:00Z",
    paymentMethod: "Carte Visa •• 9921",
  },
]

export const SHIPMENTS: Shipment[] = [
  {
    id: "shp_77821",
    orderNumber: "BZ-2026-04172",
    carrier: "DPD",
    service: "DPD Classic Europe",
    tracking: "DPD15523784771LU",
    weightKg: 4.2,
    dimsCm: { l: 90, w: 12, h: 12 },
    cost: 14.9,
    status: "in_transit",
    origin: "Roissy CDG, FR",
    destination: "Luxembourg-Ville, LU",
    destinationCountry: "LU",
    createdAt: "2026-04-25T10:00:00Z",
    estimatedDelivery: "2026-04-27",
    events: [
      { at: "2026-04-25T10:00:00Z", label: "Étiquette créée", location: "Paris" },
      { at: "2026-04-25T18:24:00Z", label: "Pris en charge transporteur", location: "Roissy CDG" },
      { at: "2026-04-26T05:42:00Z", label: "En transit vers le pays de destination", location: "Saarbrücken" },
    ],
    labelUrl: "#",
  },
  {
    id: "shp_77800",
    orderNumber: "BZ-2026-04120",
    carrier: "Colissimo",
    service: "Colissimo Domicile",
    tracking: "CL00214557789FR",
    weightKg: 0.18,
    dimsCm: { l: 22, w: 18, h: 4 },
    cost: 5.6,
    status: "delivered",
    origin: "Paris, FR",
    destination: "Marseille, FR",
    destinationCountry: "FR",
    createdAt: "2026-04-22T16:30:00Z",
    estimatedDelivery: "2026-04-24",
    events: [
      { at: "2026-04-22T16:30:00Z", label: "Étiquette créée", location: "Paris" },
      { at: "2026-04-23T08:12:00Z", label: "En cours d'acheminement", location: "Lyon" },
      { at: "2026-04-24T11:42:00Z", label: "Livré au destinataire", location: "Marseille" },
    ],
    labelUrl: "#",
  },
  {
    id: "shp_77742",
    orderNumber: "BZ-2026-04098",
    carrier: "DHL Express",
    service: "DHL Express Worldwide",
    tracking: "DHL5538291004",
    weightKg: 1.6,
    dimsCm: { l: 30, w: 22, h: 12 },
    cost: 18.4,
    status: "delivered",
    origin: "Frankfurt, DE",
    destination: "Madrid, ES",
    destinationCountry: "ES",
    createdAt: "2026-04-21T07:14:00Z",
    estimatedDelivery: "2026-04-23",
    events: [
      { at: "2026-04-21T07:14:00Z", label: "Étiquette créée", location: "Frankfurt" },
      { at: "2026-04-22T13:02:00Z", label: "Hub de tri", location: "Leipzig" },
      { at: "2026-04-23T15:10:00Z", label: "Livré", location: "Madrid" },
    ],
    labelUrl: "#",
  },
  {
    id: "shp_77640",
    orderNumber: "BZ-2026-04040",
    carrier: "FedEx International",
    service: "FedEx International Priority",
    tracking: "FX7724093311",
    weightKg: 0.9,
    dimsCm: { l: 20, w: 18, h: 8 },
    cost: 22.9,
    status: "in_transit",
    origin: "Shenzhen, CN",
    destination: "Milano, IT",
    destinationCountry: "IT",
    createdAt: "2026-04-19T03:11:00Z",
    estimatedDelivery: "2026-04-29",
    events: [
      { at: "2026-04-19T03:11:00Z", label: "Pris en charge fournisseur", location: "Shenzhen" },
      { at: "2026-04-21T11:42:00Z", label: "Vol cargo en route", location: "Hong Kong → Frankfurt" },
      { at: "2026-04-25T08:12:00Z", label: "Hub de tri Europe", location: "Frankfurt" },
    ],
    labelUrl: "#",
  },
]

export const WAREHOUSES: Warehouse[] = [
  { id: "WH-PAR", name: "Bazario Hub Paris-Nord", city: "Roissy CDG", country: "France", capacityM3: 8400, usagePercent: 62, skus: 1842 },
  { id: "WH-FRA", name: "Bazario Hub Frankfurt", city: "Frankfurt", country: "Allemagne", capacityM3: 12500, usagePercent: 71, skus: 3120 },
  { id: "WH-MIL", name: "Atelier Milano (vendeur)", city: "Milano", country: "Italie", capacityM3: 240, usagePercent: 48, skus: 184 },
  { id: "DROP-CJ-CN", name: "CJ Dropshipping Shenzhen", city: "Shenzhen", country: "Chine", capacityM3: 0, usagePercent: 0, skus: 12480 },
]

export const STOCK_MOVEMENTS: StockMovement[] = [
  { id: "mv_1", sku: "AUR-COG", title: "Sac à main cuir cognac Aurélie", warehouse: "WH-PAR", type: "outbound", qty: 1, refOrder: "BZ-2026-04193", at: "2026-04-26T09:14:00Z" },
  { id: "mv_2", sku: "AUR-COG", title: "Sac à main cuir cognac Aurélie", warehouse: "WH-PAR", type: "inbound", qty: 24, at: "2026-04-25T08:00:00Z" },
  { id: "mv_3", sku: "ORB-FIT-BK", title: "Smartwatch Orbis Fit GPS", warehouse: "WH-FRA", type: "outbound", qty: 1, refOrder: "BZ-2026-04191", at: "2026-04-26T08:02:00Z" },
  { id: "mv_4", sku: "ORB-FIT-BK", title: "Smartwatch Orbis Fit GPS", warehouse: "WH-FRA", type: "transfer", qty: 30, at: "2026-04-24T14:42:00Z" },
  { id: "mv_5", sku: "PLS-WH", title: "Écouteurs sport Pulse", warehouse: "WH-FRA", type: "outbound", qty: 1, refOrder: "BZ-2026-04188", at: "2026-04-25T16:42:00Z" },
  { id: "mv_6", sku: "GRD-SG", title: "Gourde isotherme Sage", warehouse: "WH-PAR", type: "adjust", qty: -2, at: "2026-04-23T11:18:00Z" },
]

export const RETURNS: ReturnRequest[] = [
  {
    id: "rma_2041",
    orderNumber: "BZ-2026-04001",
    buyerName: "Sophie Garcia",
    reason: "Taille trop grande",
    items: [{ sku: "REB-IND-32", title: "Jean selvedge indigo brut Rebel", qty: 1, image: "/product-jeans.jpg" }],
    amount: 145,
    status: "received",
    createdAt: "2026-04-23T10:12:00Z",
    carrier: "Colissimo",
    tracking: "CL00200013442FR",
    resolution: "refund",
  },
  {
    id: "rma_2038",
    orderNumber: "BZ-2026-03980",
    buyerName: "Lucas Petit",
    reason: "Produit défectueux à réception",
    items: [{ sku: "STN-ANT", title: "Enceinte Bluetooth Stone 360°", qty: 1, image: "/product-speaker.jpg" }],
    amount: 89,
    status: "label_sent",
    createdAt: "2026-04-22T16:08:00Z",
    carrier: "DPD",
    tracking: "DPD15500987462FR",
    resolution: "exchange",
  },
  {
    id: "rma_2034",
    orderNumber: "BZ-2026-03921",
    buyerName: "Élodie Martin",
    reason: "Ne correspond pas à la description",
    items: [{ sku: "PAL-SMK", title: "Palette ombres Smoky Noir", qty: 1, image: "/product-palette.jpg" }],
    amount: 42,
    status: "refunded",
    createdAt: "2026-04-19T14:32:00Z",
    resolution: "refund",
  },
]

// ----- helpers -----------------------------------------------------------

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Nouvelle",
  to_pack: "À expédier",
  packed: "Préparée",
  shipped: "Expédiée",
  in_transit: "En transit",
  delivered: "Livrée",
  returned: "Retournée",
  cancelled: "Annulée",
}

export const SHIPMENT_LABEL: Record<ShipmentStatus, string> = {
  label_created: "Étiquette créée",
  ready_for_pickup: "Prête à enlever",
  picked_up: "Prise en charge",
  in_transit: "En transit",
  out_for_delivery: "En tournée",
  delivered: "Livrée",
  exception: "Incident",
}

export const RETURN_LABEL: Record<ReturnRequest["status"], string> = {
  requested: "Demande reçue",
  label_sent: "Étiquette envoyée",
  in_transit: "En retour",
  received: "Reçue à l'entrepôt",
  refunded: "Remboursée",
  rejected: "Refusée",
}

// Pricing engine: simulate carrier rates for a given destination and weight.
export function computeRates(weightKg: number, destinationCountry: string): CarrierRate[] {
  const isFR = destinationCountry === "FR"
  const isEU = ["FR", "BE", "LU", "DE", "NL", "ES", "IT", "PT", "AT", "IE"].includes(destinationCountry)
  const w = Math.max(0.1, weightKg)
  const base: CarrierRate[] = isFR
    ? [
        { carrier: "Colissimo", service: "Domicile", estimatedDays: "2-3 j", price: round(4.6 + w * 0.9), trackable: true, pickup: true, insurance: true },
        { carrier: "Mondial Relay", service: "Point Relais", estimatedDays: "3-5 j", price: round(3.2 + w * 0.7), trackable: true, pickup: false, insurance: false },
        { carrier: "Chronopost", service: "Chrono 13", estimatedDays: "Demain 13h", price: round(12.5 + w * 1.4), trackable: true, pickup: true, insurance: true },
        { carrier: "Bazario Express", service: "Same-day Paris", estimatedDays: "Aujourd'hui", price: round(7.9 + w * 0.4), trackable: true, pickup: true, insurance: true },
      ]
    : isEU
      ? [
          { carrier: "DPD", service: "Classic Europe", estimatedDays: "2-4 j", price: round(8.4 + w * 1.1), trackable: true, pickup: true, insurance: true },
          { carrier: "Colissimo", service: "International", estimatedDays: "3-5 j", price: round(9.9 + w * 1.3), trackable: true, pickup: true, insurance: true },
          { carrier: "DHL Express", service: "Worldwide", estimatedDays: "1-2 j", price: round(18.2 + w * 1.8), trackable: true, pickup: true, insurance: true },
        ]
      : [
          { carrier: "DHL Express", service: "Worldwide", estimatedDays: "2-4 j", price: round(28.5 + w * 2.4), trackable: true, pickup: true, insurance: true },
          { carrier: "FedEx International", service: "Priority", estimatedDays: "2-3 j", price: round(31.2 + w * 2.6), trackable: true, pickup: true, insurance: true },
          { carrier: "UPS Standard", service: "International", estimatedDays: "3-6 j", price: round(24.4 + w * 2.1), trackable: true, pickup: true, insurance: true },
        ]
  return base.sort((a, b) => a.price - b.price)
}

function round(n: number) {
  return Math.round(n * 100) / 100
}

export function fmtEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n)
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })
}

export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
}
