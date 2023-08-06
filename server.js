const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://MrBeckHam187:squ1rrelsClimbandH1dePecans)@musiqvp.q02lkpj.mongodb.net/?retryWrites=true&w=majority';

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

// GET endpoint to read data from "users" collection
app.get('/users', async (req, res) => {
    try {
      // Connect to the database
      await client.connect();
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('users'); 

 // ***************** Logic to retrieve display the data goes here *************// 
      // Query the database to get all documents from "users" collection
      const users = await collection.find({}).toArray();
      res.json(users); // Send the data as a JSON response

console.log("Here is the data")
console.log (users)
// ******************************************************************//

    } catch (error) {
      console.error('Error reading data from MongoDB:', error);
      res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    } finally {
      // Close the client connection
      await client.close();
    }
  });

  // GET endpoint to read data from "users" collection
app.post('/adduser', async (req, res) => {
    try {
      // Connect to the database
      await client.connect();
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('users'); 

 // ***************** Logic to add a user record goes here *************// 
    
 const { firstname, lastname, country, age, email, location, additionalinfo } = req.body;

 // destructure the req.body //
 const registrationData = {
   firstname,
   lastname,
   country,
   age,
   email,
   location,
   additionalinfo,
   status: 'pending'
 };
  
      
      collection.insertOne(registrationData, (err, result) => {

        client.close();
  
        if (err) {
          console.error('Error inserting data into MongoDB:', err);
          res.status(500).json({ success: false });
          return;
        }

      });
 
 // For testing purposes, write the data back out //

      const users = await collection.find({}).toArray();
      res.json(users); // Send the data as a JSON response
      /*         res.json({ success: true });
        res.send('Data received successfully!');  */

  // Send an HTML response with the success message

/* res.send(`
  <html>
    <head>
      <title>Success</title>
    </head>
    <body>
      <h1>Data received successfully!</h1>
    </body>
  </html>
`);
 */

console.log("Here is the data")
console.log (users)
// ******************************************************************//

    } catch (error) {
      console.error('Error reading data from MongoDB:', error);
      res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    } finally {
      // Close the client connection
      await client.close();
    }
  });


// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// Connect to the database

run().catch(console.dir);
