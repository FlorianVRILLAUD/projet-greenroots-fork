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

import adminController from '../controllers/adminController.js';
import favoritesController from '../controllers/favoritesController.js';


import { isLoggedIn } from '../middlewares/isLoggedInMiddleware.js'
import  isAdmin  from '../middlewares/isAdmin.js'
import authMiddleware from '../middlewares/authMiddleware.js';


// Create a new router instance
const router = express.Router();

router.get('/', catchErrors(homeController.getHomePage));
router.get('/nos-arbres', catchErrors(treeController.getAll));
router.get('/nos-arbres/:slug', catchErrors(treeController.getOne));
// CONTACT PAGE
router.get('/contact', catchErrors(contactController.contactView));

// SUBMIT FORM
router.post('/contact', catchErrors(contactController.createContact));

// CREATE TREE
router.post('/mon-espace/gestion-des-arbres', catchErrors(treeController.create));

// UPDATE TREE
router.patch('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.update));

// DELETE TREE
router.delete('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.delete));

// FAVORITES PAGE
router.get('/favoris', catchErrors(favoritesController.show))

// ADD TREE IN FAVORITE
router.post('/add-favorite', catchErrors(favoritesController.addFavorite));

// DELETE TREE IN FAVORITE
router.post('/remove-favorite', catchErrors(favoritesController.deleteFavorite));

// SEARCH BAR
router.post('/recherche', catchErrors(treeController.search));

// Profil id
router.get('/profil/:id(\\d+)', catchErrors(profileController.show)); 
router.patch('/profil/:id(\\d+)', catchErrors(profileController.update));
router.delete('/profil/:id(\\d+)', catchErrors(profileController.delete));



router.get('/nous-rejoindre', registerController.showRegister)
router.post('/nous-rejoindre', registerController.register)

router.get('/connexion', sessionController.showLogin)

router.post('/connexion', sessionController.login)
router.post('/connexion', sessionController.logout)


// CART PAGES
router.get('/panier', catchErrors(cartController.show));
router.post('/panier/ajouter', catchErrors(cartController.add));
router.post('/panier/mettre-a-jour', catchErrors(cartController.update));
router.post('/panier/supprimer', catchErrors(cartController.remove));





router.get('/gestion-des-arbres', isAdmin, adminController.show);


// ABOUT PAGE
router.get('/a-propos', aboutController.getAboutPage);




export default router;

