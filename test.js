import { User, Tree } from "./app/models/index.js";  // Assure-toi d'importer le modèle Tree

async function test() {
    const userWithTrees = await User.findByPk(2, {
        include: {
            model: Tree,   // Indique que tu veux inclure les arbres
            as: 'trees'    // Utilise l'alias défini dans ton association
        }
    });

    console.log(userWithTrees.trees);
}

test();
