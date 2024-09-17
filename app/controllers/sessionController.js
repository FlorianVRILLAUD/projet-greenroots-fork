import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import emailValidator from 'email-validator';

export default {
    async showLogin(req, res) {
        const message = req.session.message || null;
        req.session.message = null;
        res.render('login', {message, title: "GreenRoots - Se connecter", cssFile: "connection.css", bulma: process.env.BULMA_URL });
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            console.log("Données reçues:", { email });

            if (!email || !password) {
                req.session.message = {
                    text: 'Veuillez remplir tous les champs',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            if (!emailValidator.validate(email)) {
                req.session.message = {
                    text: 'Email invalide',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            const user = await User.findOne({
                where: { email },
            });

            if (!user) {
                console.log("Utilisateur non trouvé pour l'email:", email);
                req.session.message = {
                    text: 'Utilisateur introuvable',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }
            
            if (!Scrypt.compare(password, user.password)) {
                console.log("Échec de la comparaison du mot de passe pour l'utilisateur:", user.id);
                req.session.message = {
                    text: 'Les mots de passe ne correspondent pas',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            req.session.user = { 
                id: user.id,
                email: user.email,
                role: user.role
            };
            
            req.session.save((err) => {
                if (err) {
                    console.error("Erreur lors de la sauvegarde de la session:", err);
                    return res.redirect('/connexion');
                }
                if (user.role === 'admin') {
                    console.log("Redirection vers la gestion des arbres");
                    res.redirect('/gestion-des-arbres');
                } else {
                    console.log("Redirection vers le profil:", `/profil`);
                    res.redirect(`/profil/`);
                }
            });


            delete user.dataValues.password;
            delete user._previousDataValues.password;

           
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            req.session.message = {
                text: 'Une erreur est survenue lors de la connexion',
                type: 'is-danger'
            };
            res.redirect('back');
        }
    },

    async logout(req, res) {
        console.log("Déconnexion de l'utilisateur");
        req.session.destroy((err) => {
            if (err) {
                console.error("Erreur lors de la destruction de la session:", err);
            }
            console.log("Session détruite, redirection vers la page d'accueil");
            res.redirect('/');
        }); 
    } 
}