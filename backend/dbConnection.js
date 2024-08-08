import mongoose from 'mongoose';

// Construct the MongoDB URI
const uri = `mongodb://${localhost}:${27017}/${Jstore}`;

// Function to connect to the database
export async function connectDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}