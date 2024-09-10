//* Functionality: Handle user registration and login

import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import emailValidator from 'email-validator';


export default {

    async showRegister(req, res) {
        res.render('register', {title: "GreenRoots - Nous rejoindre", cssFile: "register.css", bulma: process.env.BULMA_URL });
    },

    async register (req, res) {
        try { 
            const {
                role,
                lastname, 
                firstname, 
                adress, 
                email,
                password,
                confirmation: confirmationPassword
            } = req.body;

            console.log("Données reçues:", { lastname, firstname, adress, email, role, password });
            
            // Est-ce que les champs sont bien présents ? Si non : message d'erreur
            if (!lastname || !firstname || !adress || !email || !password || !role) {
                return res.status(400).json('Veuillez remplir tous les champs');
            }
            
            //On vérifie ici la validité de l'email
            if (!emailValidator.validate(email)) {
                return res.status(400).json('Email invalide');
            }

            //On vérifie si les MP correspondent
            if (password !== confirmationPassword) {
                return res.status(400).json('Les mots de passe ne correspondent pas');
            }

            //On vérifie que l'adresse email n'existe pas déjà dans la BDD
            const existingEmail = await User.findAll({
                where: { email },
            });

            if (existingEmail.length >= 1) {
                return res.status(400).json("Cet email est déjà utilisé")

            }

            //On hash le MP
            const hashPassword = Scrypt.hash(password);

            //On stock l'utilisateur en BDD
            await User.create({
                role,
                lastname, 
                firstname, 
                adress, 
                email,
                password: hashPassword,
            });

            
            res.redirect('/nous-rejoindre');

        } catch (error) {
            console.error(error);
            res.status(500).json('Erreur création utlisateur');
        }
    },

    
};

