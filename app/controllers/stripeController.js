import Stripe from "stripe";
import { Tree } from "../models/Tree";
import db from "../database";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = 'http://localhost:3001';

async function sessionBdd(req, res) {
  try {
    const { slug } = req.body; // Récupère l'ID du produit depuis la requête
    const tree = await Tree.findOne({ where: { slug: treeSlug } }); // Récupère le produit de la BDD
  }
  //   if (!tree) {
  //     return res.status(404).send('Produit non trouvé');
  //   }
   
  // }  catch()
   }  



function createCheckoutSession(req, res) {
  try {
    stripe.checkout.sessions.create({
      line_items: [
        {
          price: '{{PRICE_ID}}', // Remplacer?
          quantity: 1,
        },
      ],
      mode: 'payment',// session de paiement pour achat unique 
      success_url: `${MON_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,//contient id de la session pour verifier plus tard l'information de paiement sur Stripe
      cancel_url: `${MON_DOMAIN}/cancel`,
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

function successPage(req, res) {
  res.render('success')
  
}

function cancelPage(req, res) {
  res.render('cancel');
}

// Export
export default {
  sessionBdd,
  createCheckoutSession,
  successPage,
  cancelPage,
};