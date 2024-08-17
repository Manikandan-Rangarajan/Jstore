import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB...');
        // Ensure indexes here if needed
        await createIndexes();
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
    }
}

async function createIndexes() {
    const db = client.db(); // Use default database

    const userCollection = db.collection('collection');
    await userCollection.createIndex({ user: 1 }, { unique: true });
    
    const projectCollection = db.collection('project');
    await projectCollection.createIndex({ User: 1 });
    
    const nameCollection = db.collection('names');
    await nameCollection.createIndex({ Sname: 1 });

    const ClientProjects = db.collection('UserProjects');
    await ClientProjects.createIndex({ Sname: 1 });
}


// User operations
async function createUser(userData) {
    const db = client.db();
    const collection = db.collection('collection');
    const result = await collection.insertOne(userData);
    return result;
}

async function findUser(query) {
    const db = client.db();
    const collection = db.collection('collection');
    const user = await collection.findOne(query);
    return user;
}

// Project operations
async function createProject(projectData) {
    const db = client.db();
    const projectCollection = db.collection('project');
    const result = await projectCollection.insertOne(projectData);
    return result;
}

async function findProjects(query) {
    const db = client.db();
    const projectCollection = db.collection('project');
    const projects = await projectCollection.find(query).toArray();
    return projects;
}

// Name operations
async function createName(nameData) {
    const db = client.db();
    const nameCollection = db.collection('names');
    const result = await nameCollection.insertOne(nameData);
    return result;
}

async function findNames(query) {
    const db = client.db();
    const nameCollection = db.collection('names');
    const names = await nameCollection.find(query).toArray();
    return names;
}

// Name operations
async function createClientProjects(nameData) {
    const db = client.db();
    const ClientProjects = db.collection('UserProjects');
    const result = await ClientProjects.insertOne(nameData);
    return result;
}

async function findClientProjects(query) {
    const db = client.db();
    const ClientProjects = db.collection('UserProjects');
    const userprojects = await ClientProjects.find(query).toArray();
    return userprojects;
}

export {
    connectToDatabase,
    createUser,
    findUser,
    createProject,
    findProjects,
    createName,
    findNames,
    createClientProjects,
    findClientProjects,
    client
};
