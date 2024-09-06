import express from 'express';
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

router.get('/', homeController.getHomePage);

router.get('/register', authController.register)
router.post('/register', authController.register)

export default router;