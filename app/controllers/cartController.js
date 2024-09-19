import { Tree } from '../models/index.js';

const cartController = {
    // Afficher le panier
    async show(req, res) {
        const cart = req.session.cart || [];
        let total = 0;

        // Récupérer les détails des arbres dans le panier
        const cartItems = await Promise.all(cart.map(async (item) => {
            const tree = await Tree.findByPk(item.treeId);
            const subtotal = tree.price_ttc * item.quantity; //Total par article (arbre)
            total += subtotal; //Ajout au total 
            return { ...tree.toJSON(), quantity: item.quantity, subtotal }; //Extraire les données par méthode de l'objet Tree afin de les réutiliser
        }));


        res.render('cart', { cartItems, cart, total, title: "Panier", cssFile: "cart.css" });
    },


    // Ajouter un arbre au panier
    async add(req, res) {
        const { treeId, treeName, treePrice, quantity } = req.body;
        const cart = req.session.cart || []; //Récupère le panier ou initialise

        const existingItem = cart.find(item => item.treeId === parseInt(treeId));
        //Recherche si arbre est dans le panier
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cart.push({ treeId: parseInt(treeId), quantity: parseInt(quantity), treeName, treePrice });
        }

        req.session.cart = cart; //MAJ panier dans la session
        res.redirect('/panier');
    },

    // Mettre à jour la quantité d'un arbre dans le panier
    async update(req, res) {
        const { treeId, quantity } = req.body;
        const cart = req.session.cart || [];

        const itemIndex = cart.findIndex(item => item.treeId === parseInt(treeId));

        if (itemIndex !== -1) {
            cart[itemIndex].quantity = parseInt(quantity);//MAJ quantité
            if (cart[itemIndex].quantity <= 0) { //Si quantité <= on retire l'article du panier
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

        cart = cart.filter(item => item.treeId !== parseInt(treeId)); // On filtre pour retirer le bon arbre du panier

        req.session.cart = cart;
        res.json({ success: true, message: 'Article supprimé avec succès' });
    },

    async clearCart(req, res) {
        try {
            // Vider le panier dans la session
            req.session.cart = [];
            
            // Sauvegarder les changements de session en asynchone
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