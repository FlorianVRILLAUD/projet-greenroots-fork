import { Scrypt } from "../Auth/Scrypt.js";
import { User } from "../models/User.js";
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

export default {

async showLogin(req,res) {
    res.render('login');
},

async login(req, res) {
    try {
        const { email, password } = req.body;

        console.log("Données reçues:", { email });

        // Est-ce que les champs sont bien présents ? Si non : message d'erreur
        if (!email || !password) {
            return res.status(400).json('Veuillez remplir tous les champs');
        }

        //On vérifie ici la validité de l'email
        if (!emailValidator.validate(email)) {
            return res.status(400).json('Email invalide');
        }

        //On vérifie si l'utilisateur existe
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            console.log("Utilisateur non trouvé pour l'email:", email);
            return res.status(400).json("Email ou mot de passe incorrect");
        }
        
        if (!Scrypt.compare(password, user.password)) {
            console.log("Échec de la comparaison du mot de passe pour l'utilisateur:", user.id);
            return res.status(400).json("Email ou mot de passe incorrect");
        }
        //Ajoute user à la session
        req.session.user = { 
            id: user.id,
            email: user.email,
            role: user.role
        } 

        if (user.role === 'admin') {
            res.redirect('/gestion-des-arbres');
        } else {
            res.redirect(`/profil/${user.id}`);
        }

        console.log(`Connexion réussie pour l'utilisateur: ${user.email}`);
        
        //On génère le token JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        delete user.dataValues.password; // On efface le MP pour éviter un risque de fuite de données
        delete user._previousDataValues.password;


    } catch (error) {
        console.error(error);
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