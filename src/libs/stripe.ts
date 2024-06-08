import Stripe from 'stripe';
import { Stripe as StripeClient, loadStripe } from '@stripe/stripe-js';

// Server-side configuration
const serverStripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-08-16' as any,
});

// Client-side configuration
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
  }
  return stripePromise;
};

export { serverStripe };
