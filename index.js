// Load environment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';

// Create Express app
const app = express();

// Configure view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`GreenRoots app started at http://localhost:${port}`);
});