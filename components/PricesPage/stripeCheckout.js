import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;
const STRIPE_API_KEY =
  "pk_live_51LiW94D1ZyZsk1mPS2EcapZkm77mbHh0t9Q2dz4IwihAL6Ei3r0KtfOJxX0urmY5WkTHExsHVWyKIvly5IgGDjuJ000V2PdDHW";

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_API_KEY);
  }
  return stripePromise;
};

export async function stripeCheckout({ lineItems, userEmail, userId }) {
  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "subscription",
    lineItems,
    clientReferenceId: userId,
    customerEmail: userEmail,
    successUrl: "https://damsy-landing.vercel.app/excelai?success=true",
    cancelUrl: "https://damsy-landing.vercel.app/excelai",
  });
}
