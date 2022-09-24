const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export default async function paymentHandler(req, res) {
  if (req.method !== "POST") res.status(405).end("Method not allowed");

  const priceReq = JSON.parse(req.body).price;

  // const prodPrice = await stripe.prices.retrieve(priceReq);
  // console.log(prodPrice);

  try {
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: "price_1LivSQD1ZyZsk1mP95uvYcCj",
          quantity: 1,
        },
      ],
      mode: "subscription",
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
