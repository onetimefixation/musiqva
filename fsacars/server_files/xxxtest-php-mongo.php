<?php
require 'vendor/autoload.php'; // Ensure the MongoDB PHP driver is included

use MongoDB\Client;

// Initialize MongoDB connection
$mongoClient = new MongoDB\Client('credentials go here');

try {
    // Send a ping to confirm a successful connection
    $mongoClient->selectDatabase('musiqvp-db')->command(['ping' => 1]);
    echo "Pinged your deployment. You successfully connected to MongoDB!\n";
} catch (Exception $e) {
    printf($e->getMessage());
}

// Select the MongoDB database and collection
$database = $mongoClient->selectDatabase("musiqvp-db");
$collection = $database->selectCollection("users"); // MongoDB collection name

// Sample flight data (you can replace these with actual data)
$flightData = [
    'DATE' => "2023-12-01",
    'USER' => "JohnDoe",
    'ORIG' => "ICAO123",
    'DEST' => "ICAO456",
    'EQPT' => "Aircraft123",
    'HOURS' => 2.5,
    'PIREP' => "Flight completed successfully."
];

// Insert flight data into the MongoDB collection
$insertResult = $collection->insertOne($flightData);

if ($insertResult->getInsertedCount() > 0) {
    echo "Flight data inserted successfully.";
} else {
    echo "Failed to insert flight data.";
}
?>
