import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import { collection, names, project } from "./dbConnection.js";
import dotenv from 'dotenv'
import session from 'express-session';

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
dotenv.config()


app.use(session({
  secret: process.env.SESSION_SECRET || 'Jokerpanda26',
  resave: false,
  saveUninitialized: true,
}));
// async function getUserData(userId) {
//   // Simulate a database call or any async operation
//   try {
//     const userData = await mongoose.model('collection').findById(userId);
//     return userData;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// }

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

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

app.get('/pricing/api/money', async (req, res) => {
  try {
    const name = await project.find(); // Retrieve all documents from the 'Name' collection
    res.json(name); // Send the data as JSON to the frontend
  } catch (err) {
    console.error('Error fetching data:', err); // Log detailed error
    res.status(500).send('Server error');
  }
});

app.get('/about/api', async (req, res) => {
  try {
    const Name = await project.find(); // Retrieve all documents from the 'Name' collection
    res.json(Name); // Send the data as JSON to the frontend
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
      res.status(409).json({ message: "Username already taken" });
      return check.user
    } else {
      res.status(201).json({ message: "User does not exists" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/sign-in', async (req, res) => {
  const { user, pwd, classSec } = req.body;

  try {
    // Check if the user already exists
    const check = await collection.findOne({ user: user, password: pwd, classSec: classSec });
    
    if (check) {
      res.status(200).json({ message: "Sign-in successful" });
    } else {
      await collection.insertMany([{ user, password: pwd, classSec: classSec }]);
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (e) {
    console.error("Error during sign-in:", e); // Log the error to the console
    res.status(500).json({ message: "Internal Server Error", error: e.message });
  }
});


app.post('/pricing/api', async (req, res) => {
  const { Sname, description, price,User,zip_url} = req.body;
  try {
      // Step 2: Create and save a new Name document
      const newName = new project({
          Sname,
          description,
          price,
          User,
          zip_url,
      });

      const savedName = await newName.save();

      //Find the user by username and update their projects array
      await project.findOneAndUpdate(
          { $push: { projects: savedName._id } }
      );
    //  await collection.findByIdAndUpdate(userId, { $push: { projects: savedProject._id } });

      res.status(201).json({ message: 'Project added and associated with user' });
  } catch (err) {
      res.status(500).json({ message: 'Error adding project', error: err });
  }
});


app.post('/pricing/usr', async (req, res) => {
  const { User} = req.body;

  try {
    // Find and delete the specific project document
    const deletedProject = await project.findByIdAndDelete(User);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err });
  }
});



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
