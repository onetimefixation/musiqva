
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

app.use(session({
  secret: 'yRscrtKee6am', // Change this to a secret key
  resave: false,
  saveUninitialized: true,
}));

const fs = require('fs');
const ejs = require('ejs');

require('dotenv').config();


// Add the express.static() middleware to serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(__dirname));
//app.use('./assets', express.static('./assets', { 'extensions': ['css'] }));

const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const uri = process.env.URI_ENV;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Serve static assets (CSS files, images, etc.)
app.use('/fltdata/assets', express.static(__dirname + '/assets'));

// Add the body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));

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
