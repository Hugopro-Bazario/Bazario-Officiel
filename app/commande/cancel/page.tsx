import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-black">Paiement annule</h1>
      <p className="text-zinc-700">
        Ton paiement n&apos;a pas ete finalise. Ton panier est conserve, tu peux reessayer quand tu veux.
      </p>
      <div className="flex gap-3">
        <Link href="/panier" className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">
          Retour au panier
        </Link>
        <Link href="/produits" className="rounded-md border border-zinc-300 px-4 py-2 text-sm">
          Continuer mes achats
        </Link>
      </div>
    </main>
  );
}
