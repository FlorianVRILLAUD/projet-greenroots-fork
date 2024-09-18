import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import Joi from "joi";
import sanitizeHtml from 'sanitize-html';

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const sanitizeOptions = {
    allowedTags: [],
    allowedAttributes: {},
};


export default {
    async showLogin(req, res) {
        const message = req.session.message || null;
        req.session.message = null;
        res.render('login', {message, title: "GreenRoots - Se connecter", cssFile: "connection.css", bulma: process.env.BULMA_URL });
    },

    async login(req, res) {
        try {
            // Validate input
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                req.session.message = {
                    text: error.details[0].message,
                    type: 'is-danger'
                };
                return res.redirect('back');
            }

            // Sanitize input
            const sanitizedData = {
                email: sanitizeHtml(value.email, sanitizeOptions).toLowerCase(),
                password: value.password 
            };

            console.log("Données reçues:", { email: sanitizedData.email });

            const user = await User.findOne({
                where: { email: sanitizedData.email },
            });

            if (!user) {
                console.log("Utilisateur non trouvé pour l'email:", sanitizedData.email);
                req.session.message = {
                    text: 'Identifiants invalides',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }
            
            if (!Scrypt.compare(sanitizedData.password, user.password)) {
                console.log("Échec de la comparaison du mot de passe pour l'utilisateur:", user.id);
                req.session.message = {
                    text: 'Identifiants invalides',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            req.session.user = { 
                id: user.id,
                email: user.email,
                role: user.role
            };

            delete user.dataValues.password;
            delete user._previousDataValues.password;

            if (user.role === 'admin') {
                res.redirect('/gestion-des-arbres');
            } else {
                res.redirect(`/profil`);
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