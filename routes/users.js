const { notEqual } = require('assert');
const express = require('express');
const router = express.Router();
const fs = require('fs');

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

// GET endpoint to read data from "users" collection
router.get('/users', async (req, res) => {
    try {
      // Connect to the database
      await client.connect();
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('musiqvp-coll-reg'); 

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
// ...

// POST endpoint for user authentication
router.post('/login', async (req, res) => {
  try {
    // Connect to the database
    await client.connect();
    
    const database = client.db('musiqvp-db');
    const collection = database.collection('musiqvp-coll-reg');

    const { username, password } = req.body;

//console.log(username, password)

    // Query the database to find a user with the given username and password
    const user = await collection.findOne({ username, password });

    if (user) {
 
      // Authentication successful, send the user data as JSON response and redirect to logged-in.html

req.session.userId = user._id; 
const userId = req.session.userId;
//console.log("user ID = ", userId)


      res.redirect(`/logged-in.html?userId=${userId}`);

   //   res.redirect('/logged-in.html');
    } else {
      // Authentication failed, send an error response
      // res.status(401).json({ success: false, message: 'Authentication failed' });
      res.redirect('/invalidLogin.html');
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Error authenticating user' });
  } finally {
    // Close the client connection
    // await client.close();
  }
});


router.post('/adduser', async (req, res) => {
  
  
    try {
      // Connect to the database
       await client.connect();

    // Connect to the database

      const database = client.db('musiqvp-db'); 
      const collection = database.collection('musiqvp-coll-reg'); 

 // ***************** Logic to add a user record goes here *************// 
    
 const { firstname, lastname, country, age, location, username, password, password2, additionalinfo } = req.body;

 if (!(password === password2)) {
  // Passwords don't match
  return res.status(400).json({ success: false, message: 'Password Do Not Match.' });
}

        // Check if an entry with the same email address already exists
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            // An entry with this email address already exists
            return res.status(400).json({ success: false, message: 'Email address already registered.' });
        }

 // destructure the req.body //
 const registrationData = {
   firstname,
   lastname,
   country,
   age,
   location,   
   username,
   password,
  
   additionalinfo,
   status: 'pending'
 };

console.log(registrationData)

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

