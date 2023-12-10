<?php

// Include the MongoDB library for PHP (you need to install it via Composer or include the autoloader).
require 'vendor/autoload.php';

$SERVERLOGBOOK = "serverlogbook.csv";

// Generic pilot flight report receiver

$user = $_GET['user']; //username
$pass =  $_GET['pass']; //user password
$auth =  $_GET['auth']; //server authentication code
$version =  $_GET['version']; //acars software version

$aircraft =  $_GET['aircraft']; //aircraft titleline
$atcmodel  = $_GET['atcModel'];  //aircraft model (typically an ICAO identifier)
$atcdata  =  $_GET['atcData']; //delimited atc data: "/Identifier/Flight Number/Airline/Type/"

//Parse the atcdata string:
$sar = explode("/",$atcdata);
$atcIdentifer    = $sar[0];
$atcFlightNumber = $sar[1];
$atcAirline      = $sar[2];
$atcType         = $sar[3];


$lat1 =  $_GET['lat1']; //origin latitude, decimal degrees
$lon1 =  $_GET['lon1']; //origin longitude, decimal degrees
$lat2 =  $_GET['lat2']; //destination latitude, decimal degrees
$lon2 =  $_GET['lon2']; //destination longitude, decimal degrees
$latland =  $_GET['latland']; //landing latitude, decimal degrees
$lonland =  $_GET['lonland']; //landing longitude, decimal degrees

//Replace commas, if they exist, with dots.
$lat1 = 1 * str_replace(',', '.', $lat1);
$lon1 = 1 * str_replace(',', '.', $lon1);
$lat2 = 1 * str_replace(',', '.', $lat2);
$lon2 = 1 * str_replace(',', '.', $lon2);
$latland = 1 * str_replace(',', '.', $latland);
$lonland = 1 * str_replace(',', '.', $lonland);


$directNM =  $_GET['directNM']; //great circle distance, NM
$actualNM =  $_GET['actualNM']; //flight path distance, NM

$dateshort = $_GET['dateshort']; //Date in the following format: MM/DD/YY
$datestamp = $_GET['datestamp']; //Unix epoch UTC

$timeout = $_GET['timeout']; //HH:MM:SS (UTC)
$timeoff = $_GET['timeoff']; //HH:MM:SS (UTC)
$timeon = $_GET['timeon']; //HH:MM:SS (UTC)
$timein = $_GET['timein']; //HH:MM:SS (UTC)

$fstimeout = $_GET['fstimeout']; //HHMM (UTC)
$fstimeoff = $_GET['fstimeoff']; //HHMM (UTC)
$fstimeon = $_GET['fstimeon']; //HHMM (UTC)
$fstimein = $_GET['fstimein']; //HHMM (UTC)

$blocktime =  $_GET['blocktime']; //block time, decimal hours

$fuelstart =  $_GET['fuelstart']; //starting fuel weight, pounds
$fuelstop =  $_GET['fuelstop']; //ending fuel weight, pounds
$fueldiff =  $_GET['fueldiff']; //fuel used, pounds

$timoday =  $_GET['timoday']; //time of day: Day, Night
$landingFR =  $_GET['landingFR']; // flight rule: VFR, MVFR, IFR, or LIFR
$landingKTS =  $_GET['landingKTS']; //landing speed, knots
$landingFPM =  $_GET['landingFPM']; //landing vertical speed, feet per minute
$takeoffLBS =  $_GET['takeoffLBS']; //takeoff weight, pounds
$landingLBS =  $_GET['landingLBS']; //landing weight, pounds

$pirep =  $_GET['pirep']; //flight comments, string

$pause =  $_GET['pause']; // pause tally, seconds
$slew =  $_GET['slew']; //slew tally, seconds
$stall =  $_GET['stall']; //stall tally, seconds
$overspeed = $_GET['overspeed']; //aircraft overspeed tally, seconds
$speed10K = $_GET['speed10K']; //speed greater than 250 KTS below 10000 FT tally, seconds
$simrate = $_GET['simrate']; //simrate not equal to 1 tally, seconds
$refuel = $_GET['refuel']; //refuel detection, 1=refueled.
$crashed = $_GET['crashed']; //crash detection, 1=crashed.
$nofuel = $_GET['nofuel']; //nofuel detection,1=out of fuel
$warpNM = $_GET['warpNM']; //unusual movement detection, NM

// Use this variable to detect the amount of weight jettisoned
$jettison = $_GET['MILdiffLBS']; //takeoff weight - landing weight - fuel used

// Landing analysis vis-a-vis selected Landing Signal Officer (LSO) grades.
// Note the grades are based primarily on  AICarrier and TacPack glide slope
// angles (4.12 degrees). Server variable 'lso' contains grade(s) delimited
// with semicolon(s).
$lsotxt = $_GET['lsotxt']; //Qual grades are (highest to lowest): _OK_, OK, (OK), -, C.
$lsonum = $_GET['lsonum']; //Numeric grades are (highest to lowest): 5,    4,  3,    2, 1

$takeoffFR   =  $_GET['takeoffFR'];  // flight rule: VFR, MVFR, IFR, or LIFR
$takeoffWind = $_GET['windstart']; // wind direction (DDD) and speed (S) token in metar format (DDDSS)
$landingWind = $_GET['windstop'];  //wind direction (DDD) and speed (S) token in metar format (DDDSS)

$payload   = $_GET['payload'];  //difference landing weight and fuel remaining
$fsVersion =  $_GET['fsVersion'];  //flight sim version as reported by fsacars (note that fsuipc sends x-plane version as FSX)

$oew     =  $_GET['oew'];  //operating empty weight, pounds
$zfw     =  $_GET['zfw'];  //zero fuel weight, pounds
$rollout =  $_GET['rollout'];  //rollout from wheels down to 30 knots ground speed.

$blockfuel    = $_GET['blockfuel'];      // total fuel used, lbs
$enroutefuel  = $_GET['enroutefuel'];    // from takeoff to landing, lbs
$taxifuel     = $_GET['taxifuel'];       // blockfuel minus enroutefuel
$gmax         = $_GET['gmax'];           // maximum g-force
$gmin         = $_GET['gmin'];           // minimum g-force

$takeoffHWC = $_GET['takeoffHWC']; // takeoff headwind component
$takeoffXWC = $_GET['takeoffXWC']; // takeoff crosswind component
$landingHWC = $_GET['landingHWC']; // landing headwind component
$landingXWC = $_GET['landingXWC']; // landing crosswind component
$hwavg      = $_GET['hwavg'];      // average enroute wind (+headwind, -tailwind)

// Flap settings are specific to each aircraft.
// For example, 737-800 with flaps set to  5 degrees: flaps 3
// For example, 737-800 with flaps set to 40 degrees: flaps 8
$takeoffflaps = $_GET['takeoffflaps']; // takeoff flap setting (0=no flaps)
$landingflaps = $_GET['landingflaps']; // landing flap setting (0=no flaps)

$omaxtaxi = $_GET['omaxtaxi']; // maximum taki speed prior to takeoff
$dmaxtaxi = $_GET['dmaxtaxi']; // maximum taxi speed after landing

$takeoffKTS = $_GET['takeoffKTS']; // takeoff airspeed, knots


$trueheading = $_GET['land_truehdg']; //true heading on landing

$multifpm = $_GET['multifpm'];

$fpm_array = explode(";",$multifpm);

foreach($fpm_array as $fpm){
	$fpm_string .= "$fpm ";
}



//Uncomment the following line to use the economics module
include 'economics_module.php';

//Provided is an airport database and a function that returns the ICAO code based
//on proximity of aircraft to nearest airport
$orig = getICAO($lat1,$lon1);
$dest = getICAO($lat2,$lon2);

// Example of how to log your flight into a simple delimited database.
// An example of how to enter the data into a mySQL database is available in the server package.
$logmain = sprintf("%s||%s||%s||%s||%s||%s||%s||%s||%s||%s||%s||%s",
	$datestamp,$user,$version,$aircraft,$orig,
	$dest,$blocktime,$fueldiff,$timoday,$landingFR,
	$landingKTS,$landingFPM);

//Append the string to the logbook
$fname = $SERVERLOGBOOK;
$fptr = fopen($fname,"a");
fprintf($fptr,"%s\n",$logmain);
fclose($fptr);

//  ------------------------Add the flight data to the MongoDB -----------------------

// Initialize MongoDB connection

// ORIGINAL - $mongoClient = new MongoDB\Client("mongodb://localhost:27017"); // Replace with your MongoDB connection details
// ORIGINAl - $db = $client-><databaseName>;
// - FROM MONGO DOCS -     mongodb+srv://MrBeckHam187:<password>@musiqvp.q02lkpj.mongodb.net/?retryWrites=true&w=majority

$mongoClient = new MongoDB\Client('mongodb+srv://MrBeckHam187:squ1rrelsClimbandH1dePecans)>@musiqvp.q02lkpj.mongodb.net/?retryWrites=true&w=majority');

     try {
          // Send a ping to confirm a successful connection
          $client->selectDatabase('musiqvp-db')->command(['ping' => 1]);
          echo "Pinged your deployment. You successfully connected to MongoDB!\n";
      } catch (Exception $e) {
          printf($e->getMessage());
      }


// Select the MongoDB database
$database = $mongoClient->selectDatabase("musiqvp-db");

// Collect data from fsACARS (Assuming you have received data via GET request)
$mflightdate = $_GET['dateshort']; // The format is: MM/DD/YY
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

// Add flight data to the MongoDB collection
$collection = $database->selectCollection("users"); // MongoDB collection name

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

// ----------------------------------------------------------------------------------


$html=<<<_HTML

<html>
<head>
<title>Your Flight Report </title>
</head>
<body>
<pre>
fsACARS FLIGHT REPORT
==========================================================================

NOTE: ONLY SELECTED VARIABLES ARE DISPLAYED HERE - WEBMASTER PLEASE REVIEW
THE LIST OF VARIABLES IN pirep.php

IDENTIFICATION
--------------------------------------------------------------------------
     Username......: $user
     Password......: (suppressed)
     Authentication: $auth
     fsACARS Ver...: $version
     FS Version....: $fsversion


PILOT REPORT (PIREP)
--------------------------------------------------------------------------
     $pirep

FLIGHT
--------------------------------------------------------------------------
     Date..........: $dateshort
     Origin........: $orig
     Destination...: $dest
     Distance......: $directNM
     Equipment.....: $aircraft
     Model.........: $atcmodel
     Aircraft Type.: $atcdata
     Maximum G.....: $gmax
     Minimum G.....: $gmin

TIME, DISTANCE AND FUEL
--------------------------------------------------------------------------
     TIME-OUT......: $timeout (FS: $fstimeout)
     TIME-OFF......: $timeoff (FS: $fstimeoff)
     TIME-ON.......: $timeon (FS: $fstimeon)
     TIME-IN.......: $timein (FS: $fstimein)
     BLOCK TIME....: $blocktime
     BLOCK NM......: $actualNM

     TAXI FUEL.....: $taxifuel
     ENROUTE FUEL..: $enroutefuel
     BLOCK FUEL....: $blockfuel


DEPARTURE CONDITIONS
--------------------------------------------------------------------------
     EMPTY WEIGHT..: $oew
     TAKEOFF WEIGHT: $takeoffLBS
     CONDITIONS....: $takeoffFR
     WIND..........: $takeoffWind


APPROACH AND LANDING PERFORMANCE
--------------------------------------------------------------------------
     TIME OF DAY...: $timoday
     CONDITIONS....: $landingFR
     WIND..........: $landingWind
     LANDING KTS...: $landingKTS
     LANDING FPM...: $landingFPM  ($fpm_string)
     LANDING HDG...: $trueheading
     LANDING WEIGHT: $landingLBS
     ROLLOUT LENGTH: $rollout


REALISM AUDITING
--------------------------------------------------------------------------
     PAUSE.............: $pause
     SLEW..............: $slew
     STALL.............: $stall
     SIMRATE...........: $simrate
     REFUEL............: $refuel
     CRASHED...........: $crashed
     OUT OF FUEL.......: $nofuel
     UNUSUAL MOVEMENT..: $warpNM
     AIRFRAME OVERSPEED: $overspeed
     AIRSPACE OVERSPEED: $speed10K

OTHER
--------------------------------------------------------------------------
     Payload...............: $payload
     Ordinance LBS.........: $jettison
     LSO GRADES............: $lso_data
     Oper Empty Weight.....: $oew
     Zero Fuel Weight......: $zfw


PASSENGER-LEVEL ECONOMICS
------------------------------------------------------------------------------

  Total Revenue:.........................................         $revenue_total

  Costs
     Fuel..........................: $cost_fuel
     Flight Crew...................: $cost_crew
     Maintenance (parts)...........: $cost_maint_parts
     Maintenance (labor)...........: $cost_maint_labor
     Landing Fees..................: $cost_landingfees
                                     ------------
     Total Direct Costs..............:             $cost_direct

     Traffic Commissions...........: $cost_traffic
     Communications................: $cost_comm
     Gate Agents...................: $cost_gate
     Marketing.....................: $cost_adpro
     Reservations..................: $cost_reservations
     Administration................: $cost_admin
     Amortization..................: $cost_amort
     Passenger Service (food)......: $cost_paxfood
     Passenger Service (incidental): $cost_paxother
     Transport Related (other).....: $cost_transother
                                     ------------
     Total Indirect Costs............:             $cost_indirect
                                                   ------------

     Total Costs:......................................... :      $cost_total
                                                                  ------------
     Profit:...................................................   $profit
                                                                  ============
------------------------------------------------------------------------------



-------------------------------------------------------------------------
AIR CARGO SIMULATION
-------------------------------------------------------------------------

  Total Revenue .........................................: $cargo_revenue

  Direct Costs
     Fuel..........................: $cargo_fuel
     Materials.....................: $cargo_materials
     Landing Fees..................: $cargo_landing
     Salaries......................: $cargo_salaries
     Benefits......................: $cargo_benefits

  Indirect Costs
     Insurance.....................: $cargo_insurance
     Equipment.....................: $cargo_equipment
     Commissions...................: $cargo_commissions
     Communications................: $cargo_comms
     Advertising...................: $cargo_advertising
     Transport Related Services....: $cargo_trans
     Other Services................: $cargo_oservices

   Total Costs ............................................: $cargo_tcost
                                                            -------------
   Net ...................................................: $cargo_profit
                                                            =============
-------------------------------------------------------------------------




---------------------------------------------------
MILITARY COST
---------------------------------------------------
AVIATION FUEL.................    $mil_fuel
CONSUMABLE SUPPLIES*   .......    $mil_consup
DEPOT LEVEL REPAIRS...........    $mil_dlr
SYSTEM MAINTENANCE............    $mil_sm
                                  ------------
TOTAL FLIGHT OPERATIONS.......    $mil_total

*note: does not include ordinance
---------------------------------------------------



</pre>








</body>
</html>

_HTML
;

$fn = "r_".$user."_".hash("crc32",time()).".html";
$fp = fopen("reports/".$fn,"w");
fprintf($fp,"%s\n",$html);
fclose($fp);


//must return #RXOK# for fsacars to acknowledge the report as being received
//by server and use a single pipe to delimit URL of viewable report
$url = "#RXOK#|".$fn."|";

echo $url;

exit;




//Functions ===========================================================
//=====================================================================

//This function will return the closest ICAO code, and append the distance
// in nautical miles from the closest ICAO code if greater than 10 NM.
//-----------------------------------------------------------------------
function getICAO($lat, $lon)
{
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

?>

