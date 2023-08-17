const express = require('express');
const router = express.Router();
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

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

router.post('/add-flt-data', async (req, res) => {
  
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
  
  router.put('/updte-flt-data', async (req, res) => {
    console.log("Here I am")
    try {
      // Connect to the database
       await client.connect();
  
    // Connect to the database
  
      const database = client.db('musiqvp-db'); 
      const collection = database.collection('users'); 
  
  // ***************** Logic to update a user record goes here *************// 
    
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
      await collection.updateOne(flightData);
  
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
        const collection = database.collection('users');
  
        // Retrieve records
        const records = await collection.find({}).toArray();
        

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
        </style>
    </head>
    <body>
        <h1>Pilot Flight Records</h1>
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
        const collection = database.collection('users');

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

  /* router.get('/edit-record/:id', async (req, res) => {
    try {
  
        await client.connect();
        const database = client.db('musiqvp-db');
        const collection = database.collection('users');
  
    // Convert the id parameter to ObjectId 
  
        const id = new ObjectId(req.params.id);

        const record = await collection.findOne({ _id: id });
     




    const htmlContent = fs.readFileSync('./flt-detail-record.html', 'utf8');

    // Replace placeholders in the HTML content with actual data
    const editedHtmlContent =  htmlContent.replace('${record._id}', record._id)
                                          .replace('${record.firstname}', record.firstname)
                                          .replace('${record.lastname}', record.lastname)
                                          .replace('${record.callsign}', record.callsign)
                                          .replace('${record.origin}', record.origin)
                                          .replace('${record.destination}', record.destination)
                                          .replace('${record.date_}', record.date_)
                                          .replace('${record.time_}', record.time_)
                                          .replace('${record.tbd3}', record.tbd3)
                                          .replace('${record.tbd4}', record.tbd4)                                          
                                          .replace('${record.tbd5}', record.tbd5)   
                                          .replace('${record.pirep}', record.pirep)   
                                          
        res.send(editedHtmlContent);        

    } catch (error) {
        console.error('Error reading data from MongoDB:', error);
        res.status(500).json({ success: false, message: 'Error reading data from MongoDB' });
    }
  });
 */
  module.exports = router;