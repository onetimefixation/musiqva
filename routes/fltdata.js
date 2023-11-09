const express = require('express');
//const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
const fs = require('fs');
const ejs = require('ejs');

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

router.post('/add-flt-data', async (req, res) => {
  

    try {
      // Connect to the database
       await client.connect();
  
    // Connect to the database
  
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('musiqvp-coll-flt-data'); 
  
  // ***************** Logic to add a user record goes here *************// 
    
   const { userId, firstname, lastname, callsign, origin, destination, date_, time_, tbd3, tbd4, tbd5, pirep } = req.body;

//console.log( "User ID = ", userId)

  // destructure the req.body //
  const flightData = {
   userId,
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
  
router.post('/updte-flt-data', async (req, res) => {


const {
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
} = req.body;


    try {
      // Connect to the database
       await client.connect();
  
    // Connect to the database
  
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('musiqvp-coll-flt-data'); 

    try {
      
await collection.updateOne(
            { _id: new ObjectId(req.body._id) },
            {$set: {
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
            }
          }
            );
  
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
    }
  });
  
  // GET endpoint to retrieve pilot flight records
  router.get('/get-pilot-flight-records', async (req, res) => {
    try {
        // Connect to the database
        await client.connect();
        const database = client.db('musiqvp-db');
        const collection = database.collection('musiqvp-coll-flt-data');
        
        // Retrieve the userId parameter from the query string
        const userId = req.query.userId; // Assuming the userId is passed as a query parameter
        
        // Retrieve records that match the userId
        const records = await collection.find({ userId }).toArray();


  // Generate HTML for the record list
  const recordListHTML = records.map(record => {
    return `<tr>
        <td><a href="/fltdata/edit-record/${record._id}">Edit</a></td>
        <td>${record.lastname}</td>
        <td>${record.callsign}</td>
        <td>${record.origin}</td>
        <td>${record.destination}</td>
        <td>${record.date_}</td>
        <td>${record.time_}</td>
        <td>${record.tbd3}</td>
        <td>${record.tbd4}</td>
        <td>${record.tbd5}</td>
        <td>${record.pirep}</td>
  
    </tr>`;
  }).join('');
  
  // Send the HTML response
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Record List</title>
        <link rel="stylesheet" href="../assets/css/main.css" type="text/css" />
        <style>
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }

            /* Define a container with specific dimensions and center it */
            .container {
              width: 900px; /* Adjust the width as needed */
              margin: 0 auto; /* Center the container horizontally */
              padding: 20px; /* Add padding to create white space around the content */
              background-color: rgb(247 8 8 / 8%); /* Set the background color with opacity */
              border: 1px solid #ccc; /* Add a border for a box effect */
              border-radius: 5px; /* Add rounded corners */
              background-color: #000000;
            }
            .container {
              margin-top: 100px; /* Adjust the margin-top value to control the spacing */
            }
        
            /* Style the header and forms */
            .container h1 {
              text-align: center;
            }
        
            .container form {
              text-align: center;
            }
        </style>
    </head>
    <body style="background-color: red;">
    <header id="header" class="alt">
    <div class="header-content">
      
      <h1><a href="../index.html">Musiq <span>Virtual Airlines</span></a></h1>
    </div>
    <!-- Add the image logo here -->
    <div class="logo-container">
  
  <img src=".././images/qfLogo1nobkg.png" alt="Musiq Virtual Airlines">
  
    </div>
          <nav id="nav">
            <ul>
              <li><a href="../index.html">Home</a></li>
            
              <li><a href="../logout.html">Log Out</a></li>
            </ul>
          </nav>
  </header>
    <div class="container">

        <table>
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>Last Name</th>
                    <th>Call Sign</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>TBD3</th>
                    <th>TBD4</th>
                    <th>TBD5</th>
                    <th>PIREP</th>
  
                </tr>
            </thead>
            <tbody>${recordListHTML}</tbody>
        </table>

      <center><button id="previousPage" onclick="goBack()">Return to Previous Page</button></center>

      <script>
          function goBack() {
              window.history.back(); // This will navigate back to the previous page
          }
      </script>



    </body>
    </html>
  `;
  
        res.send(html);
        
        /* client.close(); */
    } catch (error) {
        console.error('Error reading data from MongoDB:', error);
        res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    }
  });
  //         **************************  End of End Point  ******************     //
  // 
  // GET endpoint to display detailed record view and allow editing


  router.get('/edit-record/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('musiqvp-db');
        const collection = database.collection('musiqvp-coll-flt-data');

        const id = new ObjectId(req.params.id);
        const record = await collection.findOne({ _id: id });

        const templatePath = './edit-flt-detail.ejs';
        ejs.renderFile(templatePath, { record }, (err, html) => {
            if (err) {
                console.error('Error rendering EJS template:', err);
                res.status(500).json({ success: false, message: 'Error rendering EJS template' });
            } else {
                res.send(html);
            }
        });
    } catch (error) {
        console.error('Error reading data from MongoDB:', error);
        res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    }
});

  module.exports = router;