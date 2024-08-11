import mongoose from "mongoose";
import { type } from "os";

mongoose.connect("mongodb://localhost:27017/Jstore")
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB...", err));

const userData = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})


const collection = mongoose.model("collection", userData)
collection.createIndexes();
export default collection