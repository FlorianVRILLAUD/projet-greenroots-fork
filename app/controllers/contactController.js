//* Functionnality : contact form
import Joi from 'joi';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });


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

            res.render('a-decider',{ 
                /* voir si on décide d'une vue ou non pour le succes de la soumission au formulaire */
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