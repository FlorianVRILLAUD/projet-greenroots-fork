import { Tree } from '../models/index.js';


export default { 
    async show(req, res, next) {

        const trees = await Tree.findAll({
            order: [['name', 'ASC']]
        })

        res.render('tree-management', { trees : trees, title: "GreenRoots - Gestion des arbres", cssFile: "tree-management.css", bulma: process.env.BULMA_URL })
    },

}
