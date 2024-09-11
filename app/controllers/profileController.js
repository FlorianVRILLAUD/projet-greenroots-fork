//* Functionnality : user profile infos and track orders
import { User } from'../models/index.js'

import Joi from 'joi';

export default  { 
    async show (req, res, next) { 
    
    const id = req.params.id
    const user = await User.findByPk(id)
    if(!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé"})
    };
    res.render('profil',{ user, title: "GreenRoots - Mon profil", cssFile: "profil.css", bulma: process.env.BULMA_URL });
   
    
    },

   
    async update(req, res, next) {



        const id = Number(req.params.id)


        const {lastname, firstname, adress, email, password} = req.body;

        const schema = Joi.object({
            lastname: Joi.string().min(1).max(255),
            firstname: Joi.string().min(1).max(255),
            adress:Joi.string().min(1).max(255),
            email:Joi.string().email().min(5).max(255),
            password:Joi.string().min(6).max(255),
        });


        const { error }= schema.validate(req.body);
          if(error) {
            return next(error)
          }

    const isMailExistAlready = !!(await User.count({
        where: {email: req.body.email},
        
        if (isMailExistAlready) {
            const error = new Error('Mail non trouvé');
            error.status = 409;
            next(error);
        }
        }));

    const user = await User.findOne({
        where: { id : id}

    });

    if(!user){
        return next();
    }

    const updateUser = await User.update({lastname: lastname, firstname: firstname, adress: adress, email: email, password: password});
    res.json(updateUser);




    },

    async delete(req, res) {
        const id = Number(req.session.id);
        const result = await User.destroy({where: {id: id}});
        if(!result) {
            return next()
        }
    }
};