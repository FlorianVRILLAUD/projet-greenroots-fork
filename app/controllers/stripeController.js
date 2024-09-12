import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const MON_DOMAIN = 'http://localhost:3001';

// Remplacement de la fonction fléchée par une fonction classique
function createCheckoutSession(req, res) {
  try {
    stripe.checkout.sessions.create({
      line_items: [
        {
          price: '{{PRICE_ID}}', // Remplacez par le vrai Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${MON_DOMAIN}?success=true`,
      cancel_url: `${MON_DOMAIN}?canceled=true`,
    })
    .then((session) => {
      res.redirect(303, session.url);
    })
    .catch((err) => {
      console.error('Erreur lors de la création de la session:', err);
      res.status(500).send('Erreur lors de la création de la session');
    });
  } catch (err) {
    console.error('Erreur lors de la création de la session:', err);
    res.status(500).send('Erreur lors de la création de la session');
  }
}

// Exportation par défaut
export default {
  createCheckoutSession,
};