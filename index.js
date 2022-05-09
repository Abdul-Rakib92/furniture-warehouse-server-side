const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        app.get('/inventoryItem/:id', async(req, res) =>{
            const id = req.params.id;
            const query={_id: ObjectId(id)};
            const inventoryItem = await inventoryItemCollection.findOne(query);
            res.send(inventoryItem);
        });

        //POST
        app.post('/inventoryItem', async(req, res) =>{
            const newInventoryItem = req.body;
            const result = await inventoryItemCollection.insertOne(newInventoryItem);
            res.send(result);
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