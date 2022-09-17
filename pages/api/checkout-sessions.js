const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function paymentHandler(req, res) {
  if (req.method !== "POST") res.status(405).end("Method not allowed");

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name: "Plan Mensual",
            },
            unit_amount: 9900,
            recurring: {
              interval: "month",
            },
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
