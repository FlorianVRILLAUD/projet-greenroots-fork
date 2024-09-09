//* Functionnality : contact form
import Joi from 'joi';

export default { 
    async createContact(req,res) { 
        try { 
            const schema = Joi.object({ 
                name: Joi.string().min(1).max(20).required(),
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
                res.status(500).json({error: "Une erreur est survenue, vous allez être redirigé vers page d'accueil"});
        }
    }
};
