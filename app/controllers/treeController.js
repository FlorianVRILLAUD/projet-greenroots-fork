//* functionality : trees to offer, view tree details, and handle purchases
import 'dotenv/config';
import { Tree } from '../models/index.js'
import Joi from 'joi';

export default { 
    async getAll(req, res, next) {
        const trees = await Tree.indAll({
            order: [['name', 'ASC']], 
        });

        if (!trees) {
            return next();
        }

        res.render('nosarbres', { trees, title: "GreenRoots - Nos arbres", cssFile: "stylesnosarbres.css", bulma: process.env.BULMA_URL })

    },

    async getOne(req, res, next) {
        const treeSlug = req.params.slug;
        const tree = await Tree.findOne({
            where: { slug: treeSlug}
        });

        if (!tree) {
            return next();
        }

        res.render("detailTree", { tree,  title: `GreenRoots - ${tree.name}`, cssFile: "detailarbre.css", bulma: process.env.BULMA_URL});
    },

    async update(req, res, next) {
         const treeSlug = req.params.slug;
         const { name, slug, image, variety, size, price_ht, price_ttc, origin} = req.body;

         const schema = Joi.object({
            name: Joi.string().min(1).max(255),
            slug: Joi.string().min(1).max(255),
            image: Joi.string().min(1).max(255),
            variety: Joi.string().min(1).max(255),
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
         
         const updateTree = await tree.update({ name: name, slug: slug, image: image, variety: variety, size: size, price_ht: price_ht, price_ttc: price_ttc, origin: origin });
         res.json(updateTree);
     },

        

    async create(req, res, next) {
        const {name, slug, image, variety, size, price_ht, price_ttc, origin} = req.body;

        const schema = Joi.object({
            name: Joi.string().min(1).max(255).required(),
            slug: Joi.string().min(1).max(255).required(),
            image: Joi.string().min(1).max(255).required(),
            variety: Joi.string().min(1).max(255).required(),
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

        const newTree = await Tree.create({ name, slug, image, variety, size, price_ht, price_ttc, origin });

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

        if(!tree) {
            return next();
         }

        // res.redirect('/mon-espace/gestion-des-arbres/')

    }
};