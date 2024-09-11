//* Functionality: Handle user registration and login

import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import emailValidator from 'email-validator';

export default {
    async showRegister(req, res) {
        const message = req.session.message || null;
        req.session.message = null;
        
        res.render('register', {message, title: "GreenRoots - Nous rejoindre", cssFile: "register.css", bulma: process.env.BULMA_URL });
    },

    async register(req, res) {
        try { 
            const {
                lastname, 
                firstname, 
                adress, 
                email,
                password,
                confirmation
            } = req.body;

            console.log("Données reçues:", req.body);
            
            // Est-ce que les champs sont bien présents ? Si non : message d'erreur
            if (!lastname || !firstname || !adress || !email || !password || !confirmation) {
                req.session.message = {
                    text: 'Veuillez remplir tous les champs',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }
            
            //On vérifie ici la validité de l'email
            if (!emailValidator.validate(email)) {
                req.session.message = {
                    text: 'Email invalide',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            //On vérifie si les MP correspondent
            if (password !== confirmation) {
                req.session.message = {
                    text: 'Les mots de passe ne correspondent pas',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            //On vérifie que l'adresse email n'existe pas déjà dans la BDD
            const existingEmail = await User.findAll({
                where: { email },
            });

            if (existingEmail.length >= 1) {
                req.session.message = {
                    text: 'Cet email déjà utilisé',
                    type: 'is-danger' 
                };
                return res.redirect('back');
            }

            //On hash le MP
            const hashPassword = Scrypt.hash(password);
            const role = "utilisateur";
            //On stock l'utilisateur en BDD
            await User.create({
                lastname, 
                firstname, 
                adress, 
                email,
                password: hashPassword,
                role
            });

            req.session.message = {
                text: "Félicitation vous êtes désormais inscris sur GreenRoots",
                type: "is-success"
            };
            return res.redirect('back');

        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur création utlisateur');
        }
    }
};