import { Tree, Variety } from '../models/index.js';
import Joi from 'joi';



export default { 
    async show(req, res, next) {

        const message = req.session.message || null;
        req.session.message = null;

        const trees = await Tree.findAll({
            order: [['name', 'ASC']],
            include: 'variety'
        });

        const varieties = await Variety.findAll({
            order: [['name', 'ASC']]
        })

        res.render('admin', {message, trees : trees, varieties, title: "GreenRoots - Gestion des arbres", cssFile: "tree-management.css", bulma: process.env.BULMA_URL })
    },

    async create(req, res, next) {
        try {
            
            const { name, slug, size, price_ht, price_ttc, origin, variety } = req.body;

            if (!name || !slug || !size || !price_ht || !price_ttc || !origin || !variety) {
                req.session.message = {
                    text: 'Tous les champs sont requis',
                    type: 'is-danger'
                };
    
                return res.redirect('back');
            }
            // Valider les autres champs
            const schema = Joi.object({
                name: Joi.string().min(1).max(255).required(),
                slug: Joi.string().min(1).max(255).required(),
                size: Joi.number().min(0).required(),
                price_ht: Joi.number().min(0).required(),
                price_ttc: Joi.number().min(0).required(),
                origin: Joi.string().min(1).max(255).required(),
                variety: Joi.number().min(1).max(255).required(),
            });
    
            const { error } = schema.validate(req.body);
            if (error) {
                return next(error);
            }
    
            // Vérifier si une image a été uploadée
            if (!req.file) {
                const error = new Error("Une image est requise");
                error.status = 400;
                return next(error);
            }
    
            const image = req.file.filename; // Récupérer le nom de l'image uploadée
    
            // Vérifier si l'arbre existe déjà
            const isTreeExistAlready = !!(await Tree.count({
                where: { name: req.body.name },
            }));
    
            if (isTreeExistAlready) {
                const error = new Error("L'arbre que vous essayez de créer existe déjà");
                error.status = 409;
                return next(error);
            }
    
            // Créer un nouvel arbre
            const newTree = await Tree.create({ name, slug, image, size, price_ht, price_ttc, origin, variety_id: variety });

            if (newTree) {
                req.session.message = {
                    text: 'Arbre ajouté avec succès !',
                    type: 'is-success'
                };
            }
    
            if (!newTree) {
                return next();
            }
    
            // Redirection après succès
            res.redirect('/gestion-des-arbres');
    
        } catch (error) {
            console.log(error);
            next(error); // Appeler next avec l'erreur pour la gérer via middleware
        }
    },

    async createVariety(req, res, next) {
        const { name, slug } = req.body;
        console.log('TEST', req.body);

        if (!name || !slug) {
            req.session.message = {
                text: 'Tous les champs sont requis',
                type: 'is-danger'
            };

            return res.redirect('back');
        }
        

        const schema = Joi.object({
            name: Joi.string().min(1).max(255).required(),
            slug: Joi.string().min(1).max(255).required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }

        const isVarietyExistAlready = !!(await Variety.count({
            where: { name: req.body.name },
        }));

        if (isVarietyExistAlready) {
            const error = new Error("La variété que vous essayez de créer existe déjà");
            error.status = 409;
            return next(error);
        };

        const newVariety = await Variety.create({ name, slug });

        if (newVariety) {
            req.session.message = {
                text: 'Variété ajouté avec succès !',
                type: 'is-success'
            };
        }

        res.redirect('/gestion-des-arbres');
    },

    async update(req, res, next) {
        const treeId = req.params.id;
        console.log(treeId);
        
        const { name, slug, size, price_ht, price_ttc, origin, variety, current_image } = req.body;
        console.log(req.body);
        
    
        const schema = Joi.object({
            name: Joi.string().min(1).max(255),
            slug: Joi.string().min(1).max(255),
            size: Joi.number().min(0),
            price_ht: Joi.number().min(0),
            price_ttc: Joi.number().min(0),
            origin: Joi.string().min(1).max(255),
            variety: Joi.number().min(1).max(255),
            current_image: Joi.string()
        });
    
        const { error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }
    
        // Vérifier si une nouvelle image a été uploadée, sinon utiliser l'image actuelle
        let image;
        if (req.file) {
            image = req.file.filename; // Utiliser la nouvelle image uploadée
        } else if (current_image) {
            image = current_image; // Utiliser l'image actuelle si aucune nouvelle image n'est uploadée
        } else {
            const error = new Error("Une image est requise");
            error.status = 400;
            return next(error);
        }
    
        // Vérifier si un autre arbre existe déjà avec le même nom
        const isTreeExistAlready = !!(await Tree.count({
            where: { name: req.body.name },
        }));
    
        if (isTreeExistAlready) {
            const error = new Error("Un arbre à déjà le même nom !");
            error.status = 409;
            return next(error);
        }
    
        const tree = await Tree.findByPk(treeId)
    
        if (!tree) {
            return next();
        }
    
        const updateTree = await tree.update({
            name, slug, image, size, price_ht, price_ttc, origin, variety_id: variety
        });
    
        if (updateTree) {
            req.session.message = {
                text: 'L\'arbre a été mis à jour avec succès',
                type: 'is-success'
            };
        }
    
        res.redirect('/gestion-des-arbres');
    },


    async delete(req, res) {
        const treeId = req.params.id;
        const tree = await Tree.destroy({
            where: { id: treeId}
        });

        req.session.message = {
            text: 'L\'arbre a été supprimé avec succès',
            type: 'is-success'
        };

        if(!tree) {
            return next();
         }

         res.redirect('/gestion-des-arbres');

    }


}
