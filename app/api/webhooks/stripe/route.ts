import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createCjOrderForPaidOrder } from "@/lib/cj/orders";
import { sendTransactionalEmail } from "@/lib/brevo";

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

function parseTemplateId(value: string | undefined): number | null {
  const parsed = Number(cleanEnv(value));
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function parseOrderItems(items: unknown): Array<{ title: string; quantity: number; price: number }> {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (item && typeof item === "object" ? (item as Record<string, unknown>) : null))
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .map((item) => ({
      title: String(item.title || "Produit"),
      quantity: Number(item.quantity || 1),
      price: Number(item.unit_price || 0)
    }));
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const supabase = createSupabaseAdminClient();

  const { data: existingOrder, error: selectError } = await supabase
    .from("orders")
    .select("id,reference,status,cj_order_id,customer_email,customer_name,shipping_address,items,total")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (selectError) {
    throw new Error(`orders lookup failed: ${selectError.message}`);
  }

  if (!existingOrder) {
    console.info(JSON.stringify({ scope: "stripe_webhook", event: event.type, session_id: session.id, action: "order_not_found" }));
    return;
  }

  const alreadyProcessedStatuses = new Set(["paid", "fulfillment_pending", "shipped", "delivered"]);
  if (alreadyProcessedStatuses.has(existingOrder.status) || existingOrder.cj_order_id) {
    console.info(
      JSON.stringify({
        scope: "stripe_webhook",
        event: event.type,
        session_id: session.id,
        order_id: existingOrder.id,
        action: "already_processed"
      })
    );
    return;
  }

  const customerName = session.customer_details?.name || null;
  const customerEmail = session.customer_details?.email || session.customer_email || null;
  const customerPhone = session.customer_details?.phone || null;
  const shippingAddress = session.shipping_details?.address || null;
  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null;

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      stripe_payment_intent_id: paymentIntentId,
      customer_email: customerEmail,
      customer_name: customerName,
      customer_phone: customerPhone,
      shipping_address: shippingAddress,
      subtotal: (session.amount_subtotal || 0) / 100,
      total: (session.amount_total || 0) / 100,
      tax: (session.total_details?.amount_tax || 0) / 100,
      shipping_cost: (session.total_details?.amount_shipping || 0) / 100
    })
    .eq("id", existingOrder.id);

  if (updateError) {
    throw new Error(`orders paid update failed: ${updateError.message}`);
  }

  // Fulfillment CJ + email Brevo seront branchés à l'étape 2/4.
  const fulfillment = await createCjOrderForPaidOrder(existingOrder.id);

  const orderConfirmationTemplate = parseTemplateId(process.env.BREVO_TEMPLATE_ORDER_CONFIRMATION);
  const fulfillmentAlertTemplate = parseTemplateId(process.env.BREVO_TEMPLATE_FULFILLMENT_ALERT);
  const productUnavailableTemplate = parseTemplateId(process.env.BREVO_TEMPLATE_PRODUCT_UNAVAILABLE);
  const adminEmail = cleanEnv(process.env.BAZARIO_ADMIN_EMAIL);

  if (fulfillment.success && existingOrder.customer_email && orderConfirmationTemplate) {
    await sendTransactionalEmail({
      to: {
        email: existingOrder.customer_email,
        name: existingOrder.customer_name || undefined
      },
      templateId: orderConfirmationTemplate,
      params: {
        customer_name: existingOrder.customer_name || "Client",
        order_id: existingOrder.reference,
        items: parseOrderItems(existingOrder.items),
        total: existingOrder.total || 0,
        shipping_address: existingOrder.shipping_address,
        estimated_delivery: "5-10 jours"
      }
    });
  }

  if (!fulfillment.success && adminEmail && fulfillmentAlertTemplate) {
    await sendTransactionalEmail({
      to: { email: adminEmail, name: "Admin Bazario" },
      templateId: fulfillmentAlertTemplate,
      params: {
        order_id: existingOrder.reference,
        reason: fulfillment.status,
        cj_error: fulfillment.reason
      }
    });
  }

  if (!fulfillment.success && fulfillment.status === "fulfillment_failed" && existingOrder.customer_email && productUnavailableTemplate) {
    await sendTransactionalEmail({
      to: {
        email: existingOrder.customer_email,
        name: existingOrder.customer_name || undefined
      },
      templateId: productUnavailableTemplate,
      params: {
        customer_name: existingOrder.customer_name || "Client",
        order_id: existingOrder.reference,
        items_unavailable: parseOrderItems(existingOrder.items).map((entry) => entry.title).join(", "),
        refund_info: "Notre equipe support vous contactera pour finaliser un remboursement."
      }
    });
  }

  console.info(
    JSON.stringify({
      scope: "stripe_webhook",
      event: event.type,
      order_id: existingOrder.id,
      action: "paid_marked",
      fulfillment_status: fulfillment.status,
      fulfillment_success: fulfillment.success
    })
  );
}

async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const supabase = createSupabaseAdminClient();
  const paymentIntentId = paymentIntent.id;

  const { error } = await supabase
    .from("orders")
    .update({ status: "failed" })
    .eq("stripe_payment_intent_id", paymentIntentId);

  if (error) {
    throw new Error(`orders failed update failed: ${error.message}`);
  }
}

async function handleChargeRefunded(event: Stripe.Event) {
  const charge = event.data.object as Stripe.Charge;
  const paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : null;

  if (!paymentIntentId) {
    console.info(JSON.stringify({ scope: "stripe_webhook", event: event.type, action: "missing_payment_intent" }));
    return;
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ status: "refunded" })
    .eq("stripe_payment_intent_id", paymentIntentId);

  if (error) {
    throw new Error(`orders refunded update failed: ${error.message}`);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response("Webhook configuration missing.", { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown signature error";
    return new Response(`Webhook signature failed: ${message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        return Response.json({ received: true, processed: true });
      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event);
        return Response.json({ received: true, processed: true });
      case "charge.refunded":
        await handleChargeRefunded(event);
        return Response.json({ received: true, processed: true });
      default:
        return Response.json({ received: true, ignored: true });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown handler error";
    console.error(JSON.stringify({ scope: "stripe_webhook", event: event.type, error: message }));
    return new Response("Webhook handler error.", { status: 500 });
  }
}
