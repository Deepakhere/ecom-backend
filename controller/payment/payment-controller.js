import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Q0HZjP0cdOaQnu7U7noYsx57Y8YRT99fBlUBbTRP5TDNTrXNs02WpLcMIu62MqcGvVTOxxIntL1oIUQphssJQTj00SI3GTsU6"
);

const paymentController = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export default paymentController;

// app.post('/charge', async (req, res) => {
//   const { token, amount } = req.body;

//   try {
//     const charge = await stripe.charges.create({
//       amount: amount, // In cents
//       currency: 'usd',
//       source: token,
//       description: 'Test charge',
//     });

//     res.json({ success: true, charge });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });
