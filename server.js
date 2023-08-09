const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add the express.static() middleware to serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/', express.static(__dirname));

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
      // await client.close();
    }
  });

  // GET endpoint to read data from "users" collection
app.post('/adduser', async (req, res) => {
  
  
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

      res.send(`
      <!DOCTYPE html>
        <html>
          <head>
            <title>Success</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <link rel="stylesheet" href="./assets/css/main.css" type="text/css" />
            <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
          </head>
          <body>  
          
          <!-- Header -->

          <header id="header1" class="alt">
            <div class="header-content1">
              
              <h1><a href="/index.html">Musiq <span>Virtual Airlines</span></a></h1>
            </div>
            <!-- Add the image logo here -->
            <div class="logo-container">
          
          <img src="/images/qfLogo1nobkg.png" alt="Musiq Virtual Airlines">
          
            </div>
                  <nav id="nav">
                    <ul>
                      <li><a href="index.html">Home</a></li>
                    
                      <li><a href="logout.html">Log Out</a></li>
                    </ul>
                  </nav>
          </header>
            <h1>Data received successfully!</h1>
          </body>
        </html>
      `);


    } catch (err) {
      console.error('Error inserting data into MongoDB:', err);
      res.status(500).json({ success: false });
    }

    } catch (error) {
      console.error('Error reading data from MongoDB:', error);
      res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    } finally {
      // Close the client connection
      // await client.close();
    }
  });

    // GET endpoint to read data from "users" collection
app.post('/add-flt-data', async (req, res) => {
  
  
  try {
    // Connect to the database
     await client.connect();

  // Connect to the database

    const database = client.db('musiqvp-db'); 
    const collection = database.collection('users'); 

// ***************** Logic to add a user record goes here *************// 
  
const { firstname, lastname, callsign, origin, destination, date_, time_, tbd3, tbd4, tbd5, pirep } = req.body;

// destructure the req.body //
const flightData = {
 firstname,
 lastname,
 callsign,
 origin,
 destination,
 date_,
 time_,
 tbd3,
 tbd4,
 tbd5,
 pirep
};

  // Use await and wrap the insertOne operation in a try-catch block
  try {
    await collection.insertOne(flightData);

    res.send(`
    <!DOCTYPE html>
      <html>
        <head>
          <title>Success</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="./assets/css/main.css" type="text/css" />
          <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
        </head>
        <body>  
        
        <!-- Header -->

        <header id="header1" class="alt">
          <div class="header-content1">
            
            <h1><a href="/index.html">Musiq <span>Virtual Airlines</span></a></h1>
          </div>
          <!-- Add the image logo here -->
          <div class="logo-container">
        
        <img src="/images/qfLogo1nobkg.png" alt="Musiq Virtual Airlines">
        
          </div>
                <nav id="nav">
                  <ul>
                    <li><a href="index.html">Home</a></li>
                  
                    <li><a href="logout.html">Log Out</a></li>
                  </ul>
                </nav>
        </header>
          <h1>Data received successfully!</h1>
        </body>
      </html>
    `);

  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
    res.status(500).json({ success: false });
  }

  } catch (error) {
    console.error('Error reading data from MongoDB:', error);
    res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
  } finally {
    // Close the client connection
    // await client.close();
  }
});

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// Connect to the database

run().catch(console.dir);
