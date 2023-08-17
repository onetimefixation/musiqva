const express = require('express');
const router = express.Router();
const fs = require('fs');

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

// GET endpoint to read data from "users" collection
router.get('/users', async (req, res) => {
    try {
      // Connect to the database
      await client.connect();
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('users'); 

 // ***************** Logic to retrieve display the data goes here *************// 
      // Query the database to get all documents from "users" collection
      const users = await collection.find({}).toArray();
      res.json(users); // Send the data as a JSON response

// ******************************************************************//

    } catch (error) {
      console.error('Error reading data from MongoDB:', error);
      res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    } finally {
      // Close the client connection
      // await client.close();
    }
  });

  // GET endpoint to read data from "users" collection
router.post('/adduser', async (req, res) => {
  
  
    try {
      // Connect to the database
       await client.connect();

    // Connect to the database

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

    // Use await and wrap the insertOne operation in a try-catch block
    try {
      await collection.insertOne(registrationData);

      const successHTML = fs.readFileSync('./success.html', 'utf8');  //// *******************************
      res.send(successHTML);

    } catch (err) {
      console.error('Error inserting data into MongoDB:', err);
      res.status(500).json({ success: false });
    }

    } catch (error) {
      console.error('Error reading data from MongoDB:', error);
      res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    } finally {

    }
  });


module.exports = router;

