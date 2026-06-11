import Stripe from "stripe";

let client: Stripe | null = null;

function getStripe(): Stripe {
  if (!client) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("Missing STRIPE_SECRET_KEY.");
    }
    client = new Stripe(stripeSecretKey);
  }
  return client;
}

// Lazy proxy so importing this module never requires the secret at build time;
// the key is only read on the first real Stripe call.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripe();
    const value = instance[prop as keyof Stripe];
    return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(instance) : value;
  }
});
