import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

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

            console.log(`Connexion réussie pour l'utilisateur: ${user.email}`);
            req.session.message = {
                text: `Connexion réussie ${user.firstname}, heureux de vous revoir !`,
                type: 'is-success' 
            };

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production' 
            });

            delete user.dataValues.password;
            delete user._previousDataValues.password;

            if (user.role === 'admin') {
                res.redirect('/gestion-des-arbres');
            } else {
                res.redirect(`/profil/${user.id}`);
            }

        } catch (error) {
            console.error(error);
            req.session.message = {
                text: 'Une erreur est survenue lors de la connexion',
                type: 'is-danger'
            };
            res.redirect('back');
        }
    },

    async logout(req, res) {

        req.session.user = false; //Efface les infos de session
        req.session.destroy(() => {
            res.clearCookie('token'); //Supprime le cookie de session
            res.redirect('/');
        }); 
    } 
}                                  