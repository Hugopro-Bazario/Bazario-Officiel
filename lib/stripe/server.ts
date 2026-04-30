import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY.");
}

const apiVersion: Stripe.LatestApiVersion = "2025-03-31.basil";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion
});
