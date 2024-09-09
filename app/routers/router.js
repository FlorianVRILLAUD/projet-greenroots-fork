import express from 'express';
import homeController from '../controllers/homeController.js';
import aboutController from '../controllers/aboutController.js';
import userController from '../controllers/userController.js';
import treeController from '../controllers/treeController.js';
import profileController from '../controllers/profileController.js';
import cartController from '../controllers/cartController.js';
import contactController from '../controllers/contactController.js';
import supportController from '../controllers/supportController.js';


// Create a new router instance
const router = express.Router();

router.get('/', homeController.getHomePage);

router.get('/nous-rejoindre', userController.register)
router.post('/nous-rejoindre', userController.register)

router.get('/connexion', userController.login)
router.post('/connexion', userController.login)

export default router;