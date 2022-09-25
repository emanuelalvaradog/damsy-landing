import { loadStripe } from "@stripe/stripe-js";

let stripePromise = null;
const STRIPE_API_KEY =
  "pk_test_51LiW94D1ZyZsk1mP3PwYv1GQnHI0gno4iMcXbVTZQ8ir2Ux9gyiE5rrb1KlYUCn6KxBDL7iiAhbC2biJWFsLFPxS00mbZiGWy9";

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
    successUrl: "http://localhost:3000/excelai?success",
    cancelUrl: "http://localhost:3000/excelai",
  });
}
