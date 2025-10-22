// Stripe configuration utilities
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with publishable key
let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};
