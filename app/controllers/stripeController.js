import Stripe from "stripe";
import 'dotenv/config';
import { Tree } from '../models/index.js'



export default { 
  async pageStripe (req, res) { 
    const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);

    const cart = req.session.cart || [
        { name: 'Pommier', price: 15.80, quantity: 4 },
        { name: 'Chêne', price: 13.50, quantity: 2 }
      ];

    // const trees = await Tree.findAll({
    //     where: { id : [5, 8] }
    // })

    const lineItems = cart.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
        
      }));

    
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });

      req.session.paymentInProgress = true;
    
      res.redirect(303, session.url);
    
        },   
        
        successPage(req, res) {
            if (!req.session.paymentInProgress) {
                // Rediriger l'utilisateur s'il essaie d'accéder à cette page sans avoir fait d'achat
                return res.redirect('/');
              }
            
              // Supprimer l'état du paiement une fois le succès confirmé
              req.session.paymentInProgress = false;


            res.render('success')
            
          },
          
        cancelPage(req, res) {

            if (!req.session.paymentInProgress) {

                return res.redirect('/');
              }
            
              req.session.paymentInProgress = false;

            res.render('cancel');
          }
}
