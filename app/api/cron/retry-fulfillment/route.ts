import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createCjOrderForPaidOrder } from "@/lib/cj/orders";
import { sendTransactionalEmail } from "@/lib/brevo";
import type { Database } from "@/types/database";

function cleanEnv(value: string | undefined): string {
  return (value || "").trim().replace(/^"(.*)"$/, "$1");
}

function getBearerToken(authHeader: string | null): string {
  if (!authHeader) return "";
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) return "";
  return token.trim();
}

function parseTemplateId(value: string | undefined): number | null {
  const parsed = Number(cleanEnv(value));
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

type RetryOrder = Pick<
  Database["public"]["Tables"]["orders"]["Row"],
  "id" | "reference" | "customer_name" | "customer_email" | "cj_fulfillment_attempts" | "items"
>;

export async function GET(request: Request) {
  const expectedSecret = cleanEnv(process.env.CRON_SECRET);
  const receivedSecret = getBearerToken(request.headers.get("authorization"));

  if (!expectedSecret || expectedSecret !== receivedSecret) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const adminEmail = cleanEnv(process.env.BAZARIO_ADMIN_EMAIL);
  const alertTemplateId = parseTemplateId(process.env.BREVO_TEMPLATE_FULFILLMENT_ALERT);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: ordersData, error: selectError } = await supabase
    .from("orders")
    .select("id,reference,customer_name,customer_email,cj_fulfillment_attempts,items")
    .eq("status", "fulfillment_pending")
    .lt("cj_fulfillment_attempts", 5)
    .gte("created_at", sevenDaysAgo)
    .order("created_at", { ascending: true })
    .limit(100);

  if (selectError) {
    return Response.json({ error: `Supabase select failed: ${selectError.message}` }, { status: 500 });
  }

  const summary = {
    processed: 0,
    success: 0,
    failed: 0,
    still_pending: 0,
    review: 0,
    errors: [] as string[]
  };

  const orders = (ordersData || []) as RetryOrder[];

  for (const order of orders) {
    summary.processed += 1;

    try {
      const result = await createCjOrderForPaidOrder(order.id);
      if (result.success) {
        summary.success += 1;
        continue;
      }

      if (result.status === "fulfillment_pending") {
        const nextAttempt = (order.cj_fulfillment_attempts || 0) + 1;
        if (nextAttempt >= 5) {
          await (supabase as any)
            .from("orders")
            .update({
              status: "fulfillment_failed",
              cj_last_error: result.reason,
              cj_fulfillment_attempts: nextAttempt
            })
            .eq("id", order.id);

          summary.failed += 1;

          if (adminEmail && alertTemplateId) {
            await sendTransactionalEmail({
              to: { email: adminEmail, name: "Admin Bazario" },
              templateId: alertTemplateId,
              params: {
                order_id: order.reference,
                reason: "retry_exhausted",
                cj_error: result.reason
              }
            });
          }
        } else {
          summary.still_pending += 1;
        }
      } else if (result.status === "fulfillment_review") {
        summary.review += 1;
      } else {
        summary.failed += 1;
      }
    } catch (error) {
      summary.errors.push(
        `Order ${order.id}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  return Response.json(summary, { status: 200 });
}
