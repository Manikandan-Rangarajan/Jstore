import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import { collection, names } from "./dbConnection.js";
import axios from 'axios';
import dotenv from 'dotenv'

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

dotenv.config()

// Define __dirname for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Serve the main HTML file
app.get('/', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/projects/api', async (req, res) => {
  try {
    const name = await names.find(); // Retrieve all documents from the 'Name' collection
    res.json(name); // Send the data as JSON to the frontend
  } catch (err) {
    console.error('Error fetching data:', err); // Log detailed error
    res.status(500).send('Server error');
  }
});


app.post('/signup', async (req, res) => {
  const { user, pwd } = req.body;

  const data = {
    user: user,
    password: pwd,
  };

  try {
    // Check if the user already exists
    const check = await collection.findOne({ user: user, password:pwd });

    if (check) {
      res.status(409).json({ message: "User already exists" });
    } else {
      res.status(201).json({ message: "User does not exists" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/sign-in', async (req, res) => {
  const { user, pwd } = req.body;

  const data = {
    user: user,
    password: pwd,
  };

  try {
    // Check if the user already exists
    const check = await collection.findOne({ user: user, password:pwd });

    if (check) {
      
      res.status(409).json({ message: "User already exists" });
    } else {
      await collection.insertMany([data]);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/pricing/api', async (req, res) => {
  const { Sname, description } = req.body;

  const data = {
    Sname: Sname,
    description: description,
  };

  try {
    console.log('Received data:', data); // Log the incoming data

    // Check if the project already exists
    const check = await collection.findOne({ Sname: Sname, description: description });

    if (check) {
      console.log('Project already exists:', check);
      res.status(409).json({ message: "Project already exists in your Db" });
    } else {
      const insertResult = await collection.insertMany([data]);
      console.log('Insert result:', insertResult);
      res.status(201).json({ message: "Project added successfully" });
    }
  } catch (e) {
    console.error('Internal Server Error:', e); // Log the error
    res.status(500).json({ message: "Internal Server Error" });
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
