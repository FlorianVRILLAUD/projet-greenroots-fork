import express from 'express';
import { getHomePage } from '../controllers/homeController.js';

// Create a new router instance
const router = express.Router();


router.get('/', getHomePage);


export default router;