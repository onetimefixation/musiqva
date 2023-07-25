const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'your_database';

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle form submission
app.post('/register', (req, res) => {
  const { firstname, lastname, country, age, email, location } = req.body;

  // Insert the registration data into the database
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ success: false });
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('registrations');

    const registrationData = {
      firstname,
      lastname,
      pilotID,
      country,
      age,
      email,
      location,
      status: 'pending', // Set the initial status as 'pending'
    };

    collection.insertOne(registrationData, (err, result) => {
      client.close();

      if (err) {
        console.error('Error inserting data into MongoDB:', err);
        res.status(500).json({ success: false });
        return;
      }

      res.json({ success: true });
    });
  });
});

// Function to fetch applications for the admin
app.get('/applications', (req, res) => {
  // Retrieve application data from the database
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ success: false });
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('registrations');

    collection.find().toArray((err, results) => {
      client.close();

      if (err) {
        console.error('Error fetching applications from MongoDB:', err);
        res.status(500).json({ success: false });
        return;
      }

      res.json({ success: true, applications: results });
    });
  });
});

// Function to approve or reject an application based on age
app.post('/applications/:id', (req, res) => {
  const applicationId = req.params.id;
  const action = req.body.action;

  if (!ObjectID.isValid(applicationId)) {
    res.status(400).json({ success: false, message: 'Invalid application ID' });
    return;
  }

  // Update the application status in the database
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ success: false });
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('registrations');

    // Fetch the application data to check the age
    collection.findOne({ _id: new ObjectID(applicationId) }, (err, application) => {
      if (err) {
        client.close();
        console.error('Error fetching application from MongoDB:', err);
        res.status(500).json({ success: false });
        return;
      }

      if (!application) {
        client.close();
        res.status(404).json({ success: false, message: 'Application not found' });
        return;
      }

      const age = application.age;

      if (age >= 18) {
        // Application meets the age criteria
        const updateStatus = action === 'approve' ? 'approved' : 'rejected';

        collection.updateOne(
          { _id: new ObjectID(applicationId) },
          { $set: { status: updateStatus } },
          (err, result) => {
            client.close();

            if (err) {
              console.error('Error updating application status in MongoDB:', err);
              res.status(500).json({ success: false });
              return;
            }

            res.json({ success: true });
          }
        );
      } else {
        // Application does not meet the age criteria
        client.close();
        res.status(400).json({ success: false, message: 'Application does not meet the age criteria' });
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});