// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, '../dist')));

// // Serve the main HTML file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import collection from "./dbConnection.js"

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Load environment variables
// dotenv.config();

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'Jstore';
let db;


// const userSchema = new mongoose.Schema({
//     name : String,
//     class : Number  
// })

// const Jstore = mongoose.model("users",userSchema)

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define __dirname for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Serve the main HTML file
app.get('/',cors(), (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.post('/', async(req,res)=>{
     const{user,pwd} = req.body

     try{
        const check = await collection.findOne({user:user})

        if(check){
          res.json("exists")
        }else{
          res.json("not exists")
        }
     }catch(e){
      res.json("not exists")
     }

})

app.post('/signup', async(req,res)=>{
     const{user,pwd} = req.body

    const data={
      user:user,
      password:pwd
    }

     try{
        const check = await collection.findOne({user:user})

        if(check){
          res.json("exists")
        }else{
          res.json("not exists")
          await collection.insertMany([data])
        }
     }catch(e){
      res.json("not exists")
     }

})

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

// Start the server and connect to MongoDB
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
