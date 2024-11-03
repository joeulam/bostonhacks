const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb+srv://joeulam:0707@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const fs = require("fs");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Retrieve all documents from the dinner collection
        const marci = await client.db('marciano').collection('dinner').find().toArray();
        const warren = await client.db('warren').collection('dinner').find().toArray();
        const west = await client.db('west').collection('dinner').find().toArray();
        const fenway = await client.db('fenway').collection('dinner').find().toArray();
        const granby = await client.db('granby').collection('dinner').find().toArray();

        fs.writeFileSync('../bostonhacks/app/functions/json/food_items_marci.json', JSON.stringify(marci, null, 2), 'utf-8');
        fs.writeFileSync('../bostonhacks/app/functions/json/food_items_warren.json', JSON.stringify(warren, null, 2), 'utf-8');
        fs.writeFileSync('../bostonhacks/app/functions/json/food_items_west.json', JSON.stringify(west, null, 2), 'utf-8');
        fs.writeFileSync('../bostonhacks/app/functions/json/food_items_fenway.json', JSON.stringify(fenway, null, 2), 'utf-8');
        fs.writeFileSync('../bostonhacks/app/functions/json/food_items_granby.json', JSON.stringify(granby, null, 2), 'utf-8');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);