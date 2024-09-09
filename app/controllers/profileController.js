//* Functionnality : user profile infos and track orders
import { User } from'../models/index.js'

import Joi from 'joi';

export default  { 
   // async show(req, res) {
       // res.render('profile')
    //},

    async show (req, res, next) {
    const id = req.session.userId;
    const {lastname, firstname, adress, email, password} = req.body;
     
    res.render('profile',{user});
    
    },


    
    async update(req, res, next) {
        if(!req.session?.id){
            return res.status(401).json({message: 'utilisateur non authentifie'})
        }
        const id = Number(req.session.id)
        const {lastname, firstname, adress, email, password} = req.body;
        const schema =Joi.object({
            lastname: Joi.string().min(1).max(255),
            firstname: Joi.string().min(1).max(255),
            adress:Joi.string().min(1).max(255),
            email:Joi.string().email().min(5).max(50),
            password:Joi.string().min(6).max(12),


        });
        const { error }= schema.validate(req.body);
          if(error) {
            return next(error)
          }

    const isUserExistAlready =!!(await User.count({
        where: { id:req.body},
    }));
    if (isUserExistAlready) {
        const error =new Error('Utilisateur non trouvé');
        error.status = 409;
        next(error);
    }
    const user = await User.findOne({
        where: { id : id}

    });
    if(!user){
        return next();
    }
    const updateUser = await user.update({lastname: lastname, firstname: firstname, adress: adress, email: email, password: password});
    res.json(updateUser);

//    // async delete(req, res, next) {
//         const id =;

//     }
    
    }
}