const stripe = require("stripe")(
  "sk_test_51LiW94D1ZyZsk1mPEfXhqJ2RBEQyPz2MiS5V8PzbhB96C6Rx85EvtEDsYHzye698JHJcCJVRDCN2srQNzdATQT85002v1vltGM"
);

export default async function handler(req, res) {
  try {
    const customers = await stripe.customers.list();
    res.json(customers);
  } catch (e) {
    console.log(e);
    res.json({ error: e.statusCode });
  }
}
