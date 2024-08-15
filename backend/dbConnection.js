import mongoose from "mongoose";
import dotenv from "dotenv";
import { type } from "os";

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const userData = new mongoose.Schema({
    user:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    // Reference to nameSchema
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Name'
    }]
})

const projectSchema = new mongoose.Schema({
    
    Sname: String,
    description: String,
    price: Number,
    User : {
        type: String,
        required: true,
    },
    zip_url: String,
});

const nameSchema = new mongoose.Schema({
    
    Sname: String,
    description: String,
    price: Number,
    zip_url: String
});

const names = mongoose.model("names", nameSchema);
names.createIndexes();

const project = mongoose.model("project", projectSchema);
names.createIndexes();


const collection = mongoose.model("collection", userData)
collection.createIndexes();
export { names, collection,project }