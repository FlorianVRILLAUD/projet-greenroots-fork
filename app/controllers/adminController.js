import { Tree } from '../models/index.js';


export default { 
    async show(req, res, next) {

        const message = req.session.message || null;
        req.session.message = null;

        const trees = await Tree.findAll({
            order: [['name', 'ASC']]
        })

        res.render('admin', {message, trees : trees, title: "GreenRoots - Gestion des arbres", cssFile: "tree-management.css", bulma: process.env.BULMA_URL })
    },



    async delete( req, res, next ) {  
        const treeId = req.params.id;
        const tree = await Tree.destroy({ where: { id: treeId }})
    
    if(tree ===0) {
        return next();
     }
    },
}
