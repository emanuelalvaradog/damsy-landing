import { loadStripe } from "@stripe/stripe-js";

export async function stripeCheckout({ lineItems }) {
  let stripePromise = null;
  const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(STRIPE_API_KEY);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "subscription",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
}
