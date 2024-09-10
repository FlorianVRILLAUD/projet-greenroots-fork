import express from 'express';
import { catchErrors } from '../middlewares/catchErrors.js';
import homeController from '../controllers/homeController.js';
import aboutController from '../controllers/aboutController.js';
import registerController from '../controllers/registerController.js';
import treeController from '../controllers/treeController.js';
import profileController from '../controllers/profileController.js';
import cartController from '../controllers/cartController.js';
import contactController from '../controllers/contactController.js';
import supportController from '../controllers/supportController.js';
import sessionController from '../controllers/sessionController.js';

import { isLoggedIn } from '../middlewares/isLoggedInMiddleware.js'

// Create a new router instance
const router = express.Router();

router.get('/', catchErrors(homeController.getHomePage));
router.get('/nos-arbres', catchErrors(treeController.getAll));
router.get('/nos-arbres/:slug', catchErrors(treeController.getOne));

// CREATE TREE
router.post('/mon-espace/gestion-des-arbres', catchErrors(treeController.create));

// UPDATE TREE
router.patch('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.update));

// DELETE TREE
router.delete('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.delete));


// PROFIL USER
router.get('/profil/:id(\\d+)', catchErrors(profileController.show)); 

<<<<<<< HEAD
// UPDATE USER
router.patch('/profil/:id(\\d+)', catchErrors(profileController.update));

//DELET USER
router.delete('/profil/:id(\\d+)', catchErrors(profileController.delete));
=======
router.get('/profil', catchErrors(profileController.show)); 
router.get('/profil/:id', catchErrors(profileController.show)); 
router.patch('/profil/:id', catchErrors(profileController.update));
router.delete('/profil/:id', catchErrors(profileController.delete));
>>>>>>> 5f4aca80029c7c98dc854619440780dcd497c4a5

router.get('/nous-rejoindre', registerController.showRegister)
router.post('/nous-rejoindre', registerController.register)

router.get('/connexion', sessionController.showLogin)
router.post('/connexion', sessionController.login)
router.post('/connexion', sessionController.logout)

router.get('/panier', cartController.show);


export default router;