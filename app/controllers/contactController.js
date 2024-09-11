//* Functionnality : contact form
import Joi from 'joi';
import 'dotenv/config';
import { sendEmailWithTemplate } from '../modules/sendEmail.js';


export default { 
    contactView (req, res) {
        res.render('contact', 
            { title: "GreenRoots - Contact", cssFile: "contact.css", bulma: process.env.BULMA_URL }
            
        )
    },
    
    async createContact(req, res, next) { 
        const { name, email, message } = req.body;
        

        const schema = Joi.object({
            name: Joi.string().min(1).max(128),
            email: Joi.string().min(1).max(128),
            message: Joi.string().min(1).max(500),
            
         });

         const { error } = schema.validate(req.body);
         if (error) {
            return next(error)
         }

        const run = async () => {
            const templateId = 'd-2f59ac17aebf41be90336b0a4f9a0363';
        
            const dynamicData = {
                name,
                email,
                message
            };
        
            await sendEmailWithTemplate(
                process.env.EMAIL_GREENROOTS, // Adresse e-mail du destinataire
                process.env.EMAIL_GREENROOTS, // Adresse e-mail de l'expéditeur (doit être vérifiée dans SendGrid)   
                templateId,
                dynamicData
            );
        };
        
        run();

        res.redirect('/');
    }
}
