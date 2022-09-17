const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function paymentHandler(req, res) {
  if (req.method !== "POST") res.status(405).end("Method not allowed");

  const product = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      // payment_method_types: "card",
      line_items: [
        {
          price_data: {
            price: product.planId,
            currency: "mxn",
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/excelai",
      cancel_url: "http://localhost:3000/",
    });
    console.log("payed");
    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message);
  }
}
