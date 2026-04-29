import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Bazario</h3>
          <p className="mt-2 text-sm text-zinc-600">
            Selection de produits utiles en dropshipping mono-vendeur, avec une experience claire et transparente.
          </p>
          <p className="mt-3 text-sm text-zinc-700">Paiement securise Stripe</p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/cgv" className="hover:underline">
            CGV
          </Link>
          <Link href="/mentions-legales" className="hover:underline">
            Mentions legales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:underline">
            Politique de confidentialite
          </Link>
          <Link href="/politique-de-retour" className="hover:underline">
            Politique de retour
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
      <p className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Bazario. Tous droits reserves.
      </p>
    </footer>
  );
}
