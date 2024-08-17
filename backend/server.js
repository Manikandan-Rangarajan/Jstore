import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import {
  connectToDatabase,
  createUser,
  findUser,
  createProject,
  findProjects,
  createName,
  findNames,
  client,
  findUserProjects,
  createUserProjects
} from './dbConnection.js';

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use(session({
  secret: process.env.SESSION_SECRET || 'Jokerpanda26',
  resave: false,
  saveUninitialized: true,
}));

// Define __dirname for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectToDatabase().catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Get all projects
app.get('/projects/api', async (req, res) => {
  try {
    const db = client.db('Jstore');
    const projects = await findNames({});
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Server error');
  }
});

// Get all pricing data
app.get('/pricing/api/money', async (req, res) => {
  try {
    const db = client.db('Jstore');
    const pricingData = await findProjects({});
    res.json(pricingData);
  } catch (err) {
    console.error('Error fetching pricing data:', err);
    res.status(500).send('Server error');
  }
});

app.get('/pricing/api/projects', async (req, res) => {
  try {
    const userId = req.query.userId;

    // Access the database and collections
    const db = client.db('Jstore');

    // Find the user with the provided username
    const userDocument = await db.collection('UserProjects').findOne({ user: userId });

    if (!userDocument) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve the projects array from the user document
    const projectIds = userDocument.projects;

    // Fetch the projects from the projects collection based on the projectIds
    const projects = await db.collection('projects').find({ _id: { $in: projectIds } }).toArray();

    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Server error');
  }
});



// Get about data
app.get('/about/api', async (req, res) => {
  try {
    const db = client.db('Jstore');
    const aboutData = await findProjects({});
    res.json(aboutData);
  } catch (err) {
    console.error('Error fetching about data:', err);
    res.status(500).send('Server error');
  }
});

// Sign up
app.post('/signup', async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const existingUser = await findUser({ user, password: pwd });
    if (existingUser) {
      res.status(409).json({ message: "Username already taken" });
    } else {
      await createUser({ user, password: pwd });
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (e) {
    console.error('Error during signup:', e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign in
app.post('/sign-in', async (req, res) => {
  const { user, pwd, classSec } = req.body;
  try {
    const existingUser = await findUser({ user, password: pwd, classSec });
    if (existingUser) {
      res.status(200).json({ message: "Sign-in successful" });
    } else {
      await createUser({ user, password: pwd, classSec });
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});


// Add pricing data
app.post('/pricing/api', async (req, res) => {
  const { Sname, description, price, User, zip_url } = req.body;
  try {
    const newProject = { Sname, description, price, User, zip_url };
    const result = await createProject(newProject);

    await client.db('Jstore').collection('collection').updateOne(
      { user: User },
      { $push: { projects: result.insertedId } }
    );

    res.status(201).json({ message: 'Project added and associated with user' });
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ message: 'Error adding project', error: err });
  }
});

// Delete user
app.post('/pricing/usr', async (req, res) => {
  const { User } = req.body;
  try {
    const db = client.db('Jstore');
    const deletedProject = await db.collection('project').findOneAndDelete({ User });

    if (!deletedProject.value) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project successfully deleted' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ message: 'Error deleting project', error: err });
  }
});

//adding projects permanently to user db
app.post('/pricing/usrproject', async (req, res) => {
  const { Sname, description, price, User, zip_url } = req.body;
  try {
    const db = client.db('Jstore');
    const existingUser = await findUserProjects({ User });

    if (existingUser) {
      res.status(409).json({ message: "Project already exists" });
    } else {
      await createUserProjects({ User, zip_url});
      res.status(201).json({ message: "User project added successfully" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e);
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});



// Serve other pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
