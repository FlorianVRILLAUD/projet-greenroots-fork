import { Tree } from '../models/index.js';

const cartController = {
    // Afficher le panier
    async show(req, res) {
        const cart = req.session.cart || [];
        let total = 0;

        // Récupérer les détails des arbres dans le panier
        const cartItems = await Promise.all(cart.map(async (item) => {
            const tree = await Tree.findByPk(item.treeId);
            const subtotal = tree.price_ttc * item.quantity;
            total += subtotal;
            return { ...tree.toJSON(), quantity: item.quantity, subtotal };
        }));


        res.render('cart', { cartItems, total, title: "Panier", cssFile: "cart.css", bulma: process.env.BULMA_URL  });
    },


    // Ajouter un arbre au panier
    async add(req, res) {
        const { treeId, quantity } = req.body;
        const cart = req.session.cart || [];

        const existingItem = cart.find(item => item.treeId === parseInt(treeId));

        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.push({ treeId: parseInt(treeId), quantity: parseInt(quantity) });
        }

        req.session.cart = cart;
        res.redirect('/panier');
    },

    // Mettre à jour la quantité d'un arbre dans le panier
    async update(req, res) {
        const { treeId, quantity } = req.body;
        const cart = req.session.cart || [];

        const itemIndex = cart.findIndex(item => item.treeId === parseInt(treeId));

        if (itemIndex !== -1) {
            cart[itemIndex].quantity = parseInt(quantity);
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }

        req.session.cart = cart;
        res.json({ success: true });
    },

    // Supprimer un arbre du panier
    async remove(req, res) {
        const { treeId } = req.body;
        let cart = req.session.cart || [];

        cart = cart.filter(item => item.treeId !== parseInt(treeId));

        req.session.cart = cart;
        res.redirect('/panier');
    },

    async clearCart(req, res) {
        try {
            // Vider le panier dans la session
            req.session.cart = [];
            
            // Sauvegarder les changements de session
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            res.json({ success: true, message: 'Panier vidé avec succès' });
        } catch (error) {
            console.error('Erreur lors du vidage du panier:', error);
            res.status(500).json({ success: false, message: 'Erreur lors du vidage du panier' });
        }
    },
};

export default cartController;