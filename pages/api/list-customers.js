const stripe = require("stripe")(process.env.STRIPE_PRIV_KEY);

export default async function handler(req, res) {
  try {
    const customers = await stripe.customers.list();
    const subscriptions = await stripe.subscriptions.list()
    res.json({customers, subscriptions});
  } catch (e) {
    console.log(e);
    res.json({ error: e.statusCode });
  }
}
