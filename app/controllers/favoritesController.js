import { User, Tree, Variety, UserHasTree } from "../models/index.js";


export default { 
    async show (req, res) {  
        
        const message = req.session.message || null;
        req.session.message = null;

        if (req.session.user) {
            const allTrees = await User.findByPk(req.session.user.id, {
                include: 
                    {
                        model: Tree,
                        as: 'trees',
                        include: {
                            model: Variety,
                            as: 'variety'
                        }
                    }})
            
                    res.render('favorites', { trees: allTrees.trees, message, title: "GreenRoots - Favoris", cssFile: "favorites.css", bulma: process.env.BULMA_URL });
        } else {
            res.redirect('/');
        }

    },
    
    async addFavorite (req, res, next) {
        try {
            const { treeId } = req.body;
            const userId = req.session.user.id; 

            const existingFavorite = await UserHasTree.findOne({
                where: { 
                    user_id: userId,
                    tree_id: treeId
                }
            });
    
            if (existingFavorite) {
                req.session.message = {
                    text: 'Cet arbre est déjà dans vos favoris',
                    type: 'is-danger'
                };

                return res.redirect('back');
            }
    
            const newFavorite = await UserHasTree.create({ user_id: userId, tree_id: Number(treeId) });
    
            if (!newFavorite) {
                req.session.message = {
                    text: 'Erreur lors de l\'ajout de l\'arbre dans les favoris',
                    type: 'is-danger'
                };

                return res.redirect('back');
            }
    
            req.session.message = {
                text: 'Arbre ajouté aux favoris !',
                type: 'is-success'
            };

            return res.redirect('back');
    
        } catch (error) {
            console.error('Erreur lors de l\'ajout aux favoris:', error);
            req.session.message = {
                text: 'Erreur lors de l\'ajout aux favoris',
                type: 'is-danger'
            };
            return res.redirect('back');
        }
    
    },

    async deleteFavorite (req, res) {
        try {
            
            
            
            if (req.session.user) {
                const { treeId } = req.body;
                const userId = req.session.user.id; 
                
                const favorite = await UserHasTree.findOne({
                    where: {
                        user_id: userId,
                        tree_id: treeId
                    }
                });
                
                await favorite.destroy();
                
                req.session.message = {
                    text: "L'arbre a été supprimé de vos favoris",
                    type: "is-success"
                };
                return res.redirect('back');
            }
            
            if (!favorite) {
                
                return res.redirect('back');
            }


        } catch (error) {
            console.error(error);
            return res.redirect('back');
        }
    }
    
}