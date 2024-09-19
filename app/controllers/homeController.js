import { Tree } from '../models/index.js';

export default {
    getHomePage: async (req, res) => {
        try {
            const trees = await Tree.findAll({
                limit: 3,
                order: [['name', 'DESC']] 
            });

            res.render("homePage", { trees: trees, cssFile: "homepage.css" });

        } catch (error) {
            console.error('Erreur dans la récupération des abres:', error);
            res.status(500).render("error", { message: "Erreur lors du chargement de la page d'accueil.", title: "Greenroots - Page d'erreur", cssFile: "error.css" });
        }
    }
};