const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://127.0.0.1:27017/');

    try {
        await client.connect();
        console.log("Connected to MongoDB.");

        const db = client.db('Intro');
        const userCollection = db.collection('users');

        // Inserting a single document
        await userCollection.insertOne({ name: 'bharat kadam', age: 22 });
        console.log("Single document inserted.");

        // Inserting multiple documents
        await userCollection.insertMany([
            { name: 'pavan', role: 'user', age: 32 },
            { name: 'suraj', role: 'user', age: 32 },
            { name: 'pavan', role: 'admin', age: 32 },
        ]);
        console.log("Multiple documents inserted.");

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

run();
