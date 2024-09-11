//* Functionnality : shopping cart


export default {
    show: async (req, res) => {

        const message = req.session.message || null;
        req.session.message = null;

            res.render('cart', message, {title: "GreenRoots - Mon panier", cssFile: "cart.css", bulma: process.env.BULMA_URL,
            });
    },
};

