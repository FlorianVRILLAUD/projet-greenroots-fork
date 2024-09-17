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

import  isLoggedIn  from '../middlewares/isLoggedIn.js';
import  isAdmin  from '../middlewares/isAdmin.js';
import stripeController from '../controllers/stripeController.js';
import commandController from '../controllers/commandController.js';
import upload from '../modules/uploadImage.js';


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

// UPDATE TREE
router.patch('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.update));

// DELETE TREE
router.delete('/mon-espace/gestion-des-arbres/:slug', catchErrors(treeController.delete));

// FAVORITES PAGE
router.get('/favoris', isLoggedIn, catchErrors(favoritesController.show));

// ADD TREE IN FAVORITE
router.post('/add-favorite', isLoggedIn, catchErrors(favoritesController.addFavorite))

// DELETE TREE IN FAVORITE
router.post('/remove-favorite', isLoggedIn, catchErrors(favoritesController.deleteFavorite));

// SEARCH BAR
router.post('/recherche', catchErrors(treeController.search));

// Profil id
router.get('/profil', isLoggedIn, catchErrors(profileController.show)); 
router.post('/profil/update', isLoggedIn, catchErrors(profileController.update));
router.post('/profil/delete', isLoggedIn, catchErrors(profileController.delete));


//Page command
router.get('/profil/mes-commandes', catchErrors(commandController.showCommands));
router.get('/profil/mes-commandes/:id', catchErrors(commandController.oneCommand));



router.get('/nous-rejoindre', catchErrors(registerController.showRegister));
router.post('/nous-rejoindre', catchErrors(registerController.register));

router.get('/connexion', catchErrors(sessionController.showLogin));


router.post('/connexion', catchErrors(sessionController.login));
router.post('/deconnexion', isLoggedIn, catchErrors(sessionController.logout));



// CART PAGES
router.get('/panier', catchErrors(cartController.show));
router.post('/panier/ajouter', catchErrors(cartController.add));
router.post('/panier/mettre-a-jour', catchErrors(cartController.update));
router.post('/panier/supprimer', catchErrors(cartController.remove));
router.post('/panier/vider', catchErrors(cartController.clearCart));


router.get('/gestion-des-arbres', isLoggedIn, isAdmin, catchErrors(adminController.show));
router.post('/gestion-des-arbres', upload.single('image'), catchErrors(adminController.create));
router.post('/gestion-des-arbres/variete', catchErrors(adminController.createVariety))
router.post('/gestion-des-arbres/mise-a-jour/:id', upload.single('image'), catchErrors(adminController.update));
router.post('/gestion-des-arbres/supprimer/:id', catchErrors(adminController))
// ABOUT PAGE
router.get('/a-propos', catchErrors(aboutController.getAboutPage));

//Stripe
router.post('/create-checkout-session', catchErrors(stripeController.pageStripe));
router.get('/success', catchErrors(stripeController.successPage));
router.get('/cancel', catchErrors(stripeController.cancelPage));




export default router;

