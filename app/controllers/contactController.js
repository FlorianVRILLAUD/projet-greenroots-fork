//* Functionnality : contact form
import Joi from 'joi';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();


export default { 
    contactView (req, res) {
        res.render('contact', 
        { title: "GreenRoots - Contact", cssFile: "contact.css", bulma: process.env.BULMA_URL }

        )
    },
    async createContact(req,res) { 


        try    { 
            const {name,email,message} = req.body
            const schema = Joi.object({ 
                name: Joi.string().min(1).max(50).required(),
                email: Joi.string().email().required(),
                message: Joi.string().min(5).max(500).required()
            });
            console.log(req.body.name)
            const { error } = schema.validate(req.body);
            if (error) { 
                return res.render('contact',{ 
                    // Renvoie le formulaire avec les erreurs affichées 
                    error: error.details[0].message,
                    FormData: req.body
                });
            }
                // On configure Nodemailer , pour que le formulaire une fois validé, soit envoyé depuis une adresse vers une autre
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
            });

                // const sendForm = { 
                //     from: process.env.EMAIL_USER,
                //     to:'greenroots.website@gmail.com',
                //     subject: 'Nouveau message via formaulaire de contact',
                //     text: `Nom ${name}\nEmail: ${email}\nMessage: ${message}`
                    
                // };

                async function main() {
                    // send mail with defined transport object
                    const info = await transporter.sendMail({
                      from: process.env.EMAIL_USER, // sender address
                      to: "greenroots.website@gmail.com", // list of receivers
                      subject: "Hello ✔", // Subject line
                      text: "Hello world?", // plain text body
                      html: "<b>Hello world?</b>", // html body
                    });
                    console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
                    };
                    main().catch(console.error);

                // await transporter.sendMail(sendForm);
                

            res.redirect('/',{

                success: "Message envoyé, nous vous répondons sous 24h",
                FormData: req.body,

            });



        } catch (error) { 
            res.render('404', { 
                message: "Une erreur est survenue, vous allez être redirigé vers la page d'accueil."
            });
            
            // Redirection vars la page d'accueil
            // setTimeout(() => {
            //     res.redirect('/');
            // }, 3000);
        }
    }
}