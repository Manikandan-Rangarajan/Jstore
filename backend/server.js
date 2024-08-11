import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import collection from "./dbConnection.js";

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define __dirname for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Serve the main HTML file
app.get('/', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/signup', async (req, res) => {
  const { user, pwd } = req.body;

  const data = {
    user: user,
    password: pwd,
  };

  try {
    const check = await collection.findOne({ user: user });

    if (check) {
      res.json("exists");
    } else {
      res.json("not exists");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("not exists");
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
