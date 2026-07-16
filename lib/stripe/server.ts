import Stripe from "stripe";

let cached: Stripe | null = null;

/**
 * Client Stripe instancié paresseusement : le build (collecte des routes) ne
 * nécessite pas la clé secrète, mais toute requête réelle échoue proprement si
 * `STRIPE_SECRET_KEY` n'est pas configurée. On laisse le SDK utiliser sa
 * version d'API par défaut pour rester compatible entre versions.
 */
export function getStripe(): Stripe {
  if (cached) return cached;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }
  cached = new Stripe(stripeSecretKey);
  return cached;
}

/**
 * Compatibilité : un proxy qui se comporte comme une instance Stripe mais
 * n'instancie le client réel qu'au premier accès, à l'exécution.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
