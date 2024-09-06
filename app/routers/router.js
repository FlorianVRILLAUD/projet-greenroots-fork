import express from 'express';
import { catchErrors } from '../middlewares/catchErrors.js';
import homeController from '../controllers/homeController.js';
import aboutController from '../controllers/aboutController.js';
import authController from '../controllers/authController.js';
import treeController from '../controllers/treeController.js';
import profileController from '../controllers/profileController.js';
import cartController from '../controllers/cartController.js';
import contactController from '../controllers/contactController.js';
import supportController from '../controllers/supportController.js';


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

export default router;