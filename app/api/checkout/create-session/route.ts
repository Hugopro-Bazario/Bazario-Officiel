import { stripe } from "@/lib/stripe/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_SESSIONS_PER_HOUR = 10;
const WINDOW_MS = 60 * 60 * 1000;
const rateLimitStore = new Map<string, number[]>();

type CheckoutItemInput = {
  product_id: string;
  quantity: number;
};

type CheckoutBody = {
  items?: CheckoutItemInput[];
  customer_email?: string;
  fbc?: string;
  fbp?: string;
  ttclid?: string;
  tracking_consent?: string;
};

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const previous = rateLimitStore.get(ip) || [];
  const recent = previous.filter((entry) => now - entry < WINDOW_MS);
  if (recent.length >= MAX_SESSIONS_PER_HOUR) {
    rateLimitStore.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);
  return false;
}

function normalizeItems(input: unknown): CheckoutItemInput[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const item = entry as Record<string, unknown>;
      const product_id = String(item.product_id || "").trim();
      const quantity = Number(item.quantity);
      if (!product_id || !Number.isFinite(quantity)) return null;
      return { product_id, quantity: Math.floor(quantity) };
    })
    .filter((item): item is CheckoutItemInput => Boolean(item));
}

function readOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  return process.env.APP_URL || "https://www.bazario-official.com";
}

function asImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return Response.json({ error: "Trop de tentatives. Reessayez dans une heure." }, { status: 429 });
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return Response.json({ error: "Payload invalide." }, { status: 400 });
  }

  const items = normalizeItems(body.items);
  if (items.length === 0) {
    return Response.json({ error: "Votre panier est vide." }, { status: 400 });
  }

  for (const item of items) {
    if (item.quantity <= 0) {
      return Response.json({ error: "Quantite invalide." }, { status: 400 });
    }
  }

  const supabase = createSupabaseAdminClient();
  const lineItems: Array<{
    price_data: {
      currency: "eur";
      unit_amount: number;
      product_data: {
        name: string;
        images?: string[];
      };
    };
    quantity: number;
  }> = [];

  const snapshotItems: Array<{
    product_id: string;
    cj_product_id: string;
    title: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }> = [];

  let subtotal = 0;

  for (const inputItem of items) {
    const { data: product, error } = await supabase
      .from("products")
      .select("id,cj_product_id,title,price,stock,images,is_active")
      .eq("id", inputItem.product_id)
      .maybeSingle();

    if (error) {
      return Response.json({ error: "Impossible de verifier le panier." }, { status: 500 });
    }
    if (!product || !product.is_active) {
      return Response.json({ error: "Produit introuvable ou inactif." }, { status: 400 });
    }
    if (product.stock < inputItem.quantity) {
      return Response.json({ error: `Stock insuffisant pour ${product.title}.` }, { status: 400 });
    }

    const unitAmount = Math.round(product.price * 100);
    const productImages = asImages(product.images);
    lineItems.push({
      price_data: {
        currency: "eur",
        unit_amount: unitAmount,
        product_data: {
          name: product.title,
          images: productImages.length > 0 ? [productImages[0]] : undefined
        }
      },
      quantity: inputItem.quantity
    });

    const totalLinePrice = Number((product.price * inputItem.quantity).toFixed(2));
    subtotal = Number((subtotal + totalLinePrice).toFixed(2));
    snapshotItems.push({
      product_id: product.id,
      cj_product_id: product.cj_product_id,
      title: product.title,
      quantity: inputItem.quantity,
      unit_price: product.price,
      total_price: totalLinePrice
    });
  }

  const shippingCost = 0;
  const tax = 0;
  const total = Number((subtotal + shippingCost + tax).toFixed(2));
  const itemsSummary = JSON.stringify(items).slice(0, 500);
  const origin = readOrigin(request).replace(/\/$/, "");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "LU", "CH", "DE", "ES", "IT", "NL", "PT"]
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Livraison standard 5-10 jours"
          }
        }
      ],
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },
      billing_address_collection: "required",
      customer_email: body.customer_email || undefined,
      locale: "fr",
      success_url: `${origin}/commande/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier?cancelled=true`,
      metadata: {
        items_summary: itemsSummary,
        fbc: body.fbc || "",
        fbp: body.fbp || "",
        ttclid: body.ttclid || "",
        tracking_consent: body.tracking_consent || ""
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60
    });

    const reference = `BZ-${Date.now()}`;
    const { error: orderError } = await supabase.from("orders").insert({
      reference,
      stripe_session_id: session.id,
      customer_email: body.customer_email || null,
      items: snapshotItems,
      subtotal,
      shipping_cost: shippingCost,
      tax,
      total,
      currency: "EUR",
      status: "pending",
      notes: "Checkout session created via API route."
    });

    if (orderError) {
      return Response.json({ error: "Commande en attente non enregistree." }, { status: 500 });
    }

    if (!session.url) {
      return Response.json({ error: "URL de paiement indisponible." }, { status: 500 });
    }

    return Response.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe create-session error:", error);
    return Response.json({ error: "Impossible de creer la session de paiement." }, { status: 500 });
  }
}
