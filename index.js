// Load environment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';

import router from './app/routers/router.js';

// Create Express app
const app = express();

// Configure view engine
app.set("views", "./app/views");
app.set("view engine", "ejs");

app.use(express.json());
// Configure assets routes (static folder)
app.use("/public", express.static("public"));

//Making parsed data available in 'req.body'
app.use(express.urlencoded({ extended: true })); 

//Attach all defined routes to the Express application
app.use(router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`GreenRoots app started at http://localhost:${port}`);
});