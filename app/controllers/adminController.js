import { User } from '../models/index.js';

export default {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                order: [['id', 'DESC']] 
            });
            console.log(users)
            res.render("test", {users: users});

        } catch (error) {
            res.status(500).json({error: 'Erreur de chargement des utilisateurs'})
        }
    },

       getOneUser: async (req, res) => {
        try {
            const { userId } = req.params; 

            const user = await User.findOne({
                where: { id: userId }
            });

            if (!user) {
                return res.status(404).render('error', { error: 'Utilisateur non trouvé' });
            }

            res.render("mon-espace/gestion-des-arbres", { user: user });

        } catch (error) {
            console.error("Erreur lors du chargement de l'utilisateur");
            res.status(500).render('error', { error: "Erreur de chargement de l'utilisateur" });
        }
    },
};

    
