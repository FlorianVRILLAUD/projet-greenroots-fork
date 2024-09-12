//* functionality : trees to offer, view tree details, and handle purchases
import 'dotenv/config';
import { Op, fn, col } from 'sequelize';
import { Tree, Variety } from '../models/index.js'
import Joi from 'joi';

export default { 
    async getAll(req, res, next) {

        const message = req.session.message || null;
        req.session.message = null;

        const trees = await Tree.findAll({
            order: [['name', 'ASC']],
            include: 'variety',
             
        });

        if (!trees) {
            return next();
        }

        const varieties = await Variety.findAll();


        res.render('nosarbres', 'admin', message, { trees, varieties, title: "GreenRoots - Nos arbres", cssFile: "stylesnosarbres.css", bulma: process.env.BULMA_URL })
    },

    async search (req, res, next) {
      const { output } = req.body;
      const search = output.toLowerCase();

      try {
        const trees = await Tree.findAll({
            where: {
              name: {
                [Op.iLike]: `%${search}%` 
              }
            },
            include: 'variety',
          });

        if (!trees) {
            return next();
        }

        const varieties = await Variety.findAll();
    
        res.render('nosarbres', {trees, varieties, output, title: `GreenRoots - Résultat de recherche: ${search}`, subtitle: " Résultat de recherche" , cssFile: "stylesnosarbres.css", bulma: process.env.BULMA_URL})
        
      } catch (error) {
        console.error('Erreur lors de la recherche des produits :', error);
        throw error;
      }
      
      
      
    },

    async getOne(req, res, next) {
        try {
            const message = req.session.message || null;
            req.session.message = null;
    
            const treeSlug = req.params.slug;
            const tree = await Tree.findOne({
                where: { slug: treeSlug},
                include: 'variety'
            });
    
            if (!tree) {
                return next();
            }        
    
            res.render("detailTree", { tree, admin, message, title: `GreenRoots - ${tree.name}`, cssFile: "detailarbre.css", bulma: process.env.BULMA_URL});
            
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'arbre:', error);
            next(error); // Passer l'erreur au middleware d'erreur
        }
    },

    async update(req, res, next) {
         const treeSlug = req.params.slug;
         const { name, slug, image, size, price_ht, price_ttc, origin} = req.body;

         const schema = Joi.object({
            name: Joi.string().min(1).max(255),
            slug: Joi.string().min(1).max(255),
            image: Joi.string().min(1).max(255),
            size: Joi.number().min(0),
            price_ht: Joi.number().min(0),
            price_ttc: Joi.number().min(0),
            origin: Joi.string().min(1).max(255),
         });

         const { error } = schema.validate(req.body);
         if (error) {
            return next(error)
         }

          // Verify if tree name is already created
        const isTreeExistAlready = !!(await Tree.count({
            where: { name: req.body.name },
        }));

        if (isTreeExistAlready) {
            const error = new Error("Un arbre à déjà le même nom !");
            error.status = 409;
            next(error);
        }

         const tree = await Tree.findOne({
            where: { slug: treeSlug}
        });

         if(!tree) {
            return next();
         }
         
         const updateTree = await tree.update({ name: name, slug: slug, image: image, size: size, price_ht: price_ht, price_ttc: price_ttc, origin: origin });
         req.session.message = {
            text: 'L\'arbre a été mis à jour avec succès',
            type: 'is-success'
        };
        
        return res.redirect('back');
     },

        

    async create(req, res, next) {
        const {name, slug, image, size, price_ht, price_ttc, origin} = req.body;

        const schema = Joi.object({
            name: Joi.string().min(1).max(255).required(),
            slug: Joi.string().min(1).max(255).required(),
            image: Joi.string().min(1).max(255).required(),
            size: Joi.number().min(0).required(),
            price_ht: Joi.number().min(0).required(),
            price_ttc: Joi.number().min(0).required(),
            origin: Joi.string().min(1).max(255).required(),
         });

         const { error } = schema.validate(req.body);
         if (error) {
            return next(error)
         }

         // Verify if tree is already created
        const isTreeExistAlready = !!(await Tree.count({
            where: { name: req.body.name },
        }));

        if (isTreeExistAlready) {
            const error = new Error("L'arbre que vous essayez de créer existe déjà");
            error.status = 409;
            next(error);
        }

        const newTree = await Tree.create({ name, slug, image, size, price_ht, price_ttc, origin });

        if(!newTree) {
            return next();
         }

        res.status(201).json(newTree);
    },

    async delete(req, res) {
        const treeSlug = req.params.slug;
        const tree = await Tree.destroy({
            where: { slug: treeSlug}
        });

        req.session.message = {
            text: 'L\'arbre a été supprimé avec succès',
            type: 'is-success'
        };

        if(!tree) {
            return next();
         }

    }
};

