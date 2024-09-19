import Stripe from "stripe";
import 'dotenv/config';
import { Command, CommandHasTree, Tree } from "../models/index.js";



export default { 
  async pageStripe (req, res) { 
    const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);
    
    
    if (req.session.cart) {
      const cart = req.session.cart
      
      const lineItems = cart.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.treeName, 
          },
          unit_amount: item.treePrice * 100,
        },
        quantity: item.quantity,
        
      }));
      
      
      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:${process.env.PORT}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:${process.env.PORT}/cancel`,
        metadata: {
          cart: JSON.stringify(cart)
        }
      });
      
      req.session.paymentInProgress = true;
      req.session.stripeSessionId = session.id;
      
      res.redirect(303, session.url);
    };  
    
  },   
  
  async successPage(req, res) {
    if (!req.session.paymentInProgress) {
      return res.redirect('/');
    }
  
    const sessionId = req.query.session_id
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
    try {  
      
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (!session) {
        throw new Error('Session Stripe non trouvée');
      }
  
      const cart = JSON.parse(session.metadata.cart);
      if (!cart) {
        throw new Error('Panier non trouvé dans les métadonnées de la session');
      }

  
      const newCommand = await Command.create({
        user_id: req.session?.user?.id || 1,
        amount: session.amount_total / 100,
        items: JSON.stringify(cart), 
        status: 'completed',
        date: new Date(),
        total_price: session.amount_total / 100,
      });

      for (const item of cart) {
        const tree = await Tree.findByPk(item.treeId);
        if (tree) {
          await CommandHasTree.create({
            command_id: newCommand.id,
            tree_id: tree.id,
            quantity: item.quantity
          });
        }
      }
  
      if (!newCommand) {
        throw new Error('Échec de la création de la commande');
      }
  
      req.session.paymentInProgress = false;
      req.session.cart = null;
  
      res.render('success', { commandId: newCommand.id });
  
    } catch (error) { 
      console.error('Erreur dans successPage:', error);
      res.status(500).send(`Erreur du côté de la commande: ${error.message}`);
    }
  },
    
  
  
  cancelPage(req, res) {
    
    if (!req.session.paymentInProgress) {
      
      return res.redirect('/');
    }
    
    req.session.paymentInProgress = false;
    
    res.render('cancel');
  }
}
