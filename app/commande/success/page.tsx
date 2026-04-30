import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/server";
import { formatPrice } from "@/lib/format";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { ClearCartOnSuccess } from "@/components/checkout/ClearCartOnSuccess";

export const dynamic = "force-dynamic";

type SuccessSearchParams = {
  session_id?: string;
};

function formatAmountFromCents(amount: number | null | undefined): string {
  return formatPrice(((amount || 0) / 100));
}

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: Promise<SuccessSearchParams>;
}) {
  const params = await searchParams;
  const sessionId = String(params.session_id || "").trim();

  if (!sessionId) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price", "customer_details", "shipping_details"]
  });

  const paymentPaid = session.payment_status === "paid";

  if (paymentPaid) {
    const supabase = createSupabaseAdminClient();
    const customerName = session.customer_details?.name || null;
    const customerEmail = session.customer_details?.email || session.customer_email || null;
    const customerPhone = session.customer_details?.phone || null;
    const shippingAddress = session.shipping_details?.address || null;

    await supabase
      .from("orders")
      .update({
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null,
        customer_email: customerEmail,
        customer_name: customerName,
        customer_phone: customerPhone,
        shipping_address: shippingAddress,
        status: "paid",
        subtotal: (session.amount_subtotal || 0) / 100,
        total: (session.amount_total || 0) / 100,
        tax: (session.total_details?.amount_tax || 0) / 100,
        shipping_cost: (session.total_details?.amount_shipping || 0) / 100
      })
      .eq("stripe_session_id", session.id);
  }

  const lineItems = session.line_items?.data || [];
  const orderShort = session.id.slice(-8).toUpperCase();

  return (
    <main className="space-y-6">
      {paymentPaid ? <ClearCartOnSuccess /> : null}
      <h1 className="text-3xl font-black">Commande confirmee</h1>
      <p className="text-zinc-700">
        Numero de commande: <span className="font-semibold">{orderShort}</span>
      </p>

      {paymentPaid ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          Paiement confirme. Un email de confirmation sera envoye dans la prochaine phase (fichier 05).
        </p>
      ) : (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Paiement en cours de traitement.
        </p>
      )}

      <section className="space-y-3 rounded-xl border border-zinc-200 p-4">
        <h2 className="text-xl font-semibold">Recapitulatif</h2>
        {lineItems.length === 0 ? <p className="text-sm text-zinc-600">Aucun article recupere.</p> : null}
        {lineItems.map((item) => (
          <article key={item.id} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{item.description}</p>
              <p className="text-zinc-600">Quantite: {item.quantity || 0}</p>
            </div>
            <p className="font-semibold">{formatAmountFromCents(item.amount_total)}</p>
          </article>
        ))}
        <div className="border-t border-zinc-200 pt-3 text-sm">
          <p>Total: <span className="font-semibold">{formatAmountFromCents(session.amount_total)}</span></p>
        </div>
      </section>

      {session.shipping_details?.address ? (
        <section className="rounded-xl border border-zinc-200 p-4 text-sm">
          <h2 className="mb-2 text-xl font-semibold">Adresse de livraison</h2>
          <p>{session.shipping_details.name || "Destinataire"}</p>
          <p>{session.shipping_details.address.line1}</p>
          {session.shipping_details.address.line2 ? <p>{session.shipping_details.address.line2}</p> : null}
          <p>
            {session.shipping_details.address.postal_code} {session.shipping_details.address.city}
          </p>
          <p>{session.shipping_details.address.country}</p>
        </section>
      ) : null}

      <div className="flex gap-3">
        <Link href="/produits" className="rounded-md border border-zinc-300 px-4 py-2 text-sm">
          Continuer mes achats
        </Link>
        <Link href="/" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
          Retour accueil
        </Link>
      </div>
    </main>
  );
}
