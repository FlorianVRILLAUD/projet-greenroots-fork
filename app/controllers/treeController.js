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


        res.render('nosarbres', { trees, message, varieties, title: "GreenRoots - Nos arbres", subtitle: "Nos arbres", cssFile: "stylesnosarbres.css", bulma: process.env.BULMA_URL })
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

            const session = req.session.user;
    
            const treeSlug = req.params.slug;
            const tree = await Tree.findOne({
                where: { slug: treeSlug},
                include: 'variety'
            });
    
            if (!tree) {
                return next();
            }        
    
            res.render("detailTree", { tree, session, message, title: `GreenRoots - ${tree.name}`, cssFile: "detailarbre.css", bulma: process.env.BULMA_URL});
            
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'arbre:', error);
            next(error); // Passer l'erreur au middleware d'erreur
        }
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

