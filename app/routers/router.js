import express from 'express';
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

router.get('/', homeController.getHomePage);


router.get('/nous-rejoindre', registerController.showRegister)
router.post('/nous-rejoindre', registerController.register)

router.get('/connexion', sessionController.showLogin)
router.post('/connexion', sessionController.login)

router.use((req, res) => {
    res.status(404).render('404');
});

export default router;