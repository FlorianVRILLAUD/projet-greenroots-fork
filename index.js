// Load environment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';

import router from './app/routers/router.js';

// Create Express app
const app = express();

// Configure view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Configure assets routes (static folder)
app.use(express.static("./public"));

//Attach all defined routes to the Express application
app.use(router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`GreenRoots app started at http://localhost:${port}`);
});