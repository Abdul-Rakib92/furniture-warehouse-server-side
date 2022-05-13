const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.et4oz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const inventoryItemCollection = client
//     .db("ahammedFurniture")
//     .collection("inventoryItem");
//   // perform actions on the collection object
//   console.log("is connect db");

//   app.get('/inventoryItem', (req, res) => {
//     const query = {};
//     const cursor = inventoryItemCollection.find(query);
//     const inventoryItems =  cursor.toArray();
//     res.send(inventoryItems);
//   });
// });


async function run(){
  try{

    await client.connect();
    const inventoryItemCollection = client.db('ahammedFurniture').collection('inventoryItem');
    console.log('db is connected');

    app.get('/inventoryItem', async (req, res) =>{
      const query = {};
      const cursor = inventoryItemCollection.find(query);
      const inventoryItems = await cursor.toArray();
      res.send(inventoryItems);
    });

    app.get('/inventoryItem/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id) };
      const inventoryItem = await
      inventoryItemCollection.findOne(query);
      res.send(inventoryItem);
    });

    app.put('/inventoryItem/:id', async (req, res) => {
      const id = req.params.id;
      const updatedInventoryItem = req.body;
      console.log(id, updatedInventoryItem);
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updatedDoc = {
        $set: {
          quantity: updatedInventoryItem.quantity
        }
      };
      const result = await inventoryItemCollection.updateOne(filter, updatedDoc, options);
      res.send(result);

    })

    app.put('/inventoryItem/:id', async (req, res) => {
      const id = req.params.id;
      const deliveryInventoryItem = req.body;
      console.log(id, updatedInventoryItem);
      const filter = {_id: ObjectId(id)};
      const options = {upsert: true};
      const updatedDoc = {
        $set: {
          quantity: deliveryInventoryItem.quantity
        }
      };
      const result = await inventoryItemCollection.updateOne(filter, updatedDoc, options);
      res.send(result);

    })


    //Post (add a new user)
    app.post('/inventoryItem', async (req, res) => {
      const newInventoryItem = req.body;
      const result = await inventoryItemCollection.insertOne(newInventoryItem);
      res.send(result);
    });

    // Delete
    app.delete('/inventoryItem/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await inventoryItemCollection.deleteOne(query);
      res.send(result);

    })


  }

  finally{

  }
}

run().catch(console.dir);



//         // //update user
//         // app.put('/inventoryItem/:id', async(req, res) =>{
//         //     const id = req.params.id;
//         //     const updatedInventoryItem = req.body;
//         //     const filter = {_id: ObjectId(id)};
//         //     const options = {upsert: true};
//         //     const updatadDoc = {
//         //         $set:{
//         //             quantity: updatedInventoryItem.quantity
//         //         }
//         //     }

//         //     const result = await inventoryItemCollection.updateOne(filter, usdatedDoc, options);
//         //     res.send(result);
//         // })

//         //DELETE
//         app.delete('/inventoryItem/:id', async(req, res) =>{
//             const id = req.params.id;
//             const query = {_id: ObjectId(id)};
//             const result = await inventoryItemCollection.deleteOne(query);
//             res.send(result);
//         })

//     }
//     finally{

//     }

// }

// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" Ahammed  Warehouse is start");
});

app.listen(port, () => {
  console.log("Server is running");
});
