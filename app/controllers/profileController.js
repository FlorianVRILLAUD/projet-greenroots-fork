//* Functionnality : user profile infos and track orders
import { User } from'../models/index.js'

import Joi from 'joi';

export default  { 
    async show (req, res, next) { 

    const message = req.session.message || null;
    req.session.message = null;

    const id = req.params.id
    const user = await User.findByPk(id)
    if(!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé"})
    };
    res.render('profil',{ user, message, title: "GreenRoots - Mon profil", cssFile: "profil.css", bulma: process.env.BULMA_URL });

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

    const isIdExistAlready = !!(await User.count({
        where: {id: id},

        if (isIdExistAlready) {

         

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


    const updateUser = await User.update({lastname: lastname, firstname: firstname, adress: adress, email: email, password: password},
        { 
            where: { id: id },
            returning: true // Retourne l'utilisateur mis à jour
        }
    );

    req.session.message = {
        text: 'Modification effectuée avec succès',
        type: 'is-success'
    };

    return res.redirect('back');
    

    },

    async delete(req, res) {

        const id = Number(req.params.id);
        console.log(`Tentative de suppression de l'utilisateur avec l'ID: ${id}`);
        
        const result = await User.destroy({where: {id: id}});

        if(result === 0) {
            req.session.message = {
                text: 'Utilisateur non trouvé',
                type: 'is-danger'
            };
        
            return res.redirect('back');
       
            
        }
        req.session.message = {
            text: 'Suppression effectuée avec succès',
            type: 'is-success'
        };
    
        return res.redirect('back');
        
    }
};