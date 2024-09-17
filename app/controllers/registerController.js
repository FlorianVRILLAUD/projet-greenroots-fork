import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import Joi from "joi";
import sanitizeHtml from 'sanitize-html';

const userSchema = Joi.object({
    lastname: Joi.string().min(1).max(255).required(),
    firstname: Joi.string().min(1).max(255).required(),
    adress: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmation: Joi.string().valid(Joi.ref('password')).required(),
});

const sanitizeOptions = {
    allowedTags: [],
    allowedAttributes: {},
};

export default {
    async showRegister(req, res) {
        const message = req.session.message || null;
        req.session.message = null;
        
        res.render('register', {message, title: "GreenRoots - Nous rejoindre", cssFile: "register.css", bulma: process.env.BULMA_URL });
    },

    async register(req, res) {
        try { 
            const { error, value } = userSchema.validate(req.body);
            if (error) {
                req.session.message = {
                    text: error.details[0].message,
                    type: 'is-danger'
                };
                return res.redirect('back');
            }

            // Sanitize input
            const sanitizedData = {
                lastname: sanitizeHtml(value.lastname, sanitizeOptions),
                firstname: sanitizeHtml(value.firstname, sanitizeOptions),
                adress: sanitizeHtml(value.adress, sanitizeOptions),
                email: value.email.toLowerCase(), 
                password: value.password, 
            };

            console.log("Données reçues", sanitizedData);

            // Check if email already exists
            const existingEmail = await User.findOne({
                where: { email: sanitizedData.email },
            });

            if (existingEmail) {
                req.session.message = {
                    text: 'Cet email est déjà utilisé',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            // Hash the password
            const hashPassword = Scrypt.hash(sanitizedData.password);
            const role = "utilisateur";

            // Create user in database
            await User.create({
                lastname: sanitizedData.lastname, 
                firstname: sanitizedData.firstname, 
                adress: sanitizedData.adress, 
                email: sanitizedData.email,
                password: hashPassword,
                role
            });

            req.session.message = {
                text: "Félicitations, vous êtes désormais inscrit sur GreenRoots",
                type: "is-success"
            };
            return res.redirect('/connexion');

        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur création utilisateur');
        }
    }
};