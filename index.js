// Load environment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';
import session from 'express-session';

//Import Stripe
import Stripe from 'stripe';

import router from './app/routers/router.js';
import { errorHandler, notFound } from './app/middlewares/errorHandlers.js';
import authMiddleware from './app/middlewares/authMiddleware.js';

// Create Express app
const app = express();

// Create Stripe app
const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);
const MON_DOMAIN ='http://localhost:3000'

// Configure view engine
app.set("views", "./app/views");
app.set("view engine", "ejs");

app.use(express.json());
// Configure assets routes (static folder)
app.use("/public", express.static("public"));

//Making parsed data available in 'req.body'
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production", 
    httpOnly: true,
    maxAge: 86400000
    },
}));

app.use(authMiddleware);

//Attach all defined routes to the Express application
app.use(router);

// middleware 404
app.use(notFound);

// Error handler
app.use(errorHandler);


// Start server

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`GreenRoots app started at http://localhost:${port}`);
});