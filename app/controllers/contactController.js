//* Functionnality : contact form
import Joi from 'joi';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { text } from 'express';

dotenv.config();


export default { 
    contactView (req, res) {
        res.render('contact', 
        { title: "GreenRoots - Contact", cssFile: "contact.css", bulma: process.env.BULMA_URL }
        )
    },

    async createContact(req,res) { 
        try { 
            const schema = Joi.object({ 
                name: Joi.string().min(1).max(50).required(),
                email: Joi.string().email().required(),
                message: Joi.string().min(5).max(500).required()
            });

            const { error } = schema.validate(req.body);
            if (error) { 
                return res.render('contact',{ 
                    // Renvoie le formulaire avec les erreurs affichées 
                    error: error.details[0].message,
                    FormData: req.body
                });
            }
                // On configure Nodemailer , pour que le formulaire une fois validé, soit envoyé depuis une adresse vers une autre
                // Ce qui allège le poids de la Bdd et améliore les temps de réponse puisqu'envoyé par un autre serveur que celui du site 
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
            });

                const sendForm = { 
                    from: process.env.EMAIL_USER,
                    to:'greenroots.website@gmail.com',
                    subject: 'Nouveau message via formaulaire de contact',
                    text: `Nom ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
                };

                await transporter.sendMail(sendForm);

            res.render('contact',{ 
                success: "Message envoyé, nous vous répondons sous 24h",
                FormData: req.body
            });
        } catch (error) { 
            res.render('contact-error', { 
                message: "Une erreur est survenue, vous allez être redirigé vers la page d'accueil."
            });
    
            // Redirection vars la page d'accueil
            setTimeout(() => {
                res.redirect('/');
            }, 3000);
        }
    }
}