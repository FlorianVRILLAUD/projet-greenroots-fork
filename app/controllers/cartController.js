//* Functionnality : shopping cart


export default {
    show: async (req, res) => {
            res.render('cart', {title: "GreenRoots - Mon panier", cssFile: "cart.css", bulma: process.env.BULMA_URL,
            });
    },
};

