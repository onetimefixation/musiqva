<?php

// Include the MongoDB library for PHP (you need to install it via Composer or include the autoloader).
require 'vendor/autoload.php';

// Initialize MongoDB connection
$mongoClient = new MongoDB\Client("mongodb://localhost:27017"); // Replace with your MongoDB connection details


// Select the MongoDB database
$database = $mongoClient->selectDatabase("users"); // Replace with your MongoDB database name

// Collect data from fsACARS (Assuming you have received data via GET request)
$flightdate = $_GET['dateshort']; // The format is: MM/DD/YY
$user = $_GET['user']; // Username
$aircraft = $_GET['aircraft']; // Aircraft titleline
$blocktime = $_GET['blocktime']; // Block time, decimal hours
$pirep = $_GET['pirep']; // Flight comments, string
$lat1 = $_GET['lat1']; // Origin latitude, decimal degrees
$lon1 = $_GET['lon1']; // Origin longitude, decimal degrees
$lat2 = $_GET['lat2']; // Destination latitude, decimal degrees
$lon2 = $_GET['lon2']; // Destination longitude, decimal degrees

// Compute origin and destination airport ICAO codes
$origin_airport_icao = getICAO($lat1, $lon1);
$destination_airport_icao = getICAO($lat2, $lon2);

// Add flight data to the MongoDB collection (assuming you have a "logbook" collection)
$collection = $database->selectCollection("logbook"); // Replace with your MongoDB collection name

$insertResult = $collection->insertOne([
    'DATE' => $flightdate,
    'USER' => $user,
    'ORIG' => $origin_airport_icao,
    'DEST' => $destination_airport_icao,
    'EQPT' => $aircraft,
    'HOURS' => $blocktime,
    'PIREP' => $pirep,
]);

if ($insertResult->getInsertedCount() > 0) {
    echo "Flight data inserted successfully.";
} else {
    echo "Failed to insert flight data.";
}

// Exit the script
exit;

//Functions ===========================================================
//=====================================================================

//This function will return the closest ICAO code, and append the distance
// in nautical miles from the closest ICAO code if greater than 10 NM.
//-----------------------------------------------------------------------
function getICAO($lat, $lon)
{

	$lat = 1 * str_replace(',', '.', $lat); //replace comma(s)
	$lon = 1 * str_replace(',', '.', $lon); //replace comma(s)

	$fdat = file("airports.csv");
	$n = count($fdat);

	$mindist = 999;
	$minicao = "0000";

	for($i = 0; $i < $n; $i++){
		$sar = explode(",",$fdat[$i]);

		$d = GetDistance($lat,$lon,$sar[2],$sar[3]);

		if($d < $mindist){
			$mindist = $d;
			$minicao = $sar[0];
		}

	}

	if($mindist > 10) $minicao = sprintf("CVN/%s%d",$minicao,$mindist);

	return $minicao;
}

function GetDistance($lat1,$lon1,$lat2,$lon2)
{
  $lat1 = $lat1 / 180 * pi();
  $lon1 = $lon1 / 180 * pi();
  $lat2 = $lat2 / 180 * pi();
  $lon2 = $lon2 / 180 * pi();
  $dlon = $lon2 - $lon1;
  $dlat = $lat2 - $lat1;
  $a = sin($dlat/2) * sin($dlat/2) + cos($lat1) * cos($lat2) * sin($dlon/2) * sin($dlon/2);
  $b = 2 * atan2(sqrt($a), sqrt(1-$a));
  $nm = 0.54 * 6366.707 * $b;
  return $nm;
}
