const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// use middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsiq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const inventoryItemCollection = client.db('ahammedFurniture').collection('inventoryItem');

        app.get('/inventoryItem', async (req, res) =>{
            const query = {};
            const cursor = inventoryItemCollection.find(query);
            const inventoryItems = await cursor.toArray();
            res.send(inventoryItems);
        });

    }
    finally{

    }

}

run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Running Ahammed Furniture Warehouse');
});

app.listen(port, () =>{
    console.log('Server is running');
})