const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add the express.static() middleware to serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(__dirname));

const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://MrBeckHam187:squ1rrelsClimbandH1dePecans)@musiqvp.q02lkpj.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const userRouter = require('./routes/users')
const fltdataRouter = require('./routes/fltdata')

app.use('/users', userRouter);
app.use('/fltdata', fltdataRouter);


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// Connect to the database

run().catch(console.dir);
