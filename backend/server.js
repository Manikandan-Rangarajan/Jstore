import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import bodyParser if needed
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import connectDB from  './dbConnection.js'


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

connectDB();

// Define __dirname for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/src')));

// Serve the React app's main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/src/main.jsx'));
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: 'username270904@gmail.com',
    pass: 'JokerPanda27'
  }
});

// Route to handle payment notification
app.post('/payment-notification', (req, res) => {
  const paymentDetails = req.body;

  // Email content
  const mailOptions = {
    from: 'username270904@gmail.com',
    to: 'rangamanisathya14@gmail.com',
    subject: 'Payment Received',
    text: `A payment has been received. Details: ${JSON.stringify(paymentDetails)}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Payment confirmed and email sent');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
