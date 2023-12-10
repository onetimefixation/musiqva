<?php

// fsACARS.com
// Generic flight tracking script.  fsACARS periodically sends information
// about the flight to the server.  This script will parse that information
// so can track your pilots in real time.
//
//

//probably want more validation than this...

	$user      =  $_GET['user'];      //username
	$pass      =  $_GET['pass'];      //user password
	$auth      =  $_GET['auth'];      //auth code
	$lat1      =  $_GET['lat1'];      //starting latitude
	$lon1      =  $_GET['lon1'];      //starting longitude
	$lat2      =  $_GET['lat2'];      //current latitude
	$lon2      =  $_GET['lon2'];      //current longitude
	$msl       =  $_GET['msl'];       //current altitude , MSL, feet
	$gskts     =  $_GET['gskts'];     //current ground speed, knots
	$hdgtrue   =  $_GET['hdgtrue'];   //true heading, degrees
	$etime     =  $_GET['etime'];     //elapsed time, decimal hours
	$titleline =  $_GET['titleline']; //aircraft model from title in aircraft.cfg
	$onground  =  $_GET['onground'];  //1=on ground


	//Replaces commas with periods for numerics
	$lat1 = 1 * str_replace(',', '.', $lat1);
	$lon1 = 1 * str_replace(',', '.', $lon1);
	$lat2 = 1 * str_replace(',', '.', $lat2);
	$lon2 = 1 * str_replace(',', '.', $lon2);


if($user != ""){

	$fp = fopen("posreps.csv","a");
	fprintf($fp,"%d||%s||%s||%s||%d||%d\n",time(),$user,$lat2,$lon2,$msl,$gskts,$etime,$titleline);
	fclose($fp);

	exit;
}


// If this script is called from outside fsACARS, it will display a simple flight tracking table.


printf("<html><head><title>fsACARS Position Reporting System</title><meta http-equiv='refresh' content='180'><link rel='stylesheet' href='https://unpkg.com/leaflet@1.3.4/dist/leaflet.css' integrity='sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==' crossorigin=''/>
<script src='https://unpkg.com/leaflet@1.3.4/dist/leaflet.js' integrity='sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==' crossorigin=''></script>
</head><body>\n");
printf("<center>");
printf("<h4>fsACARS Generic Position Reporting</h4>\n");

$tmnow = time();

$fdata = file("posreps.csv");
$n = count($fdata);
for($i = 0; $i < $n; $i++){
	$sar = explode("||",$fdata[$i]);
	$tdiff = $tmnow - $sar[0];
	if($tdiff < 1200){ //20 minutes
		$flightarr[$sar[1]]["LAT"] = $sar[2];
		$flightarr[$sar[1]]["LON"] = $sar[3];
		$flightarr[$sar[1]]["MSL"] = $sar[4];
		$flightarr[$sar[1]]["KTS"] = $sar[5];
	}
}

if(count($flightarr) <= 0){
	printf("<hr />\n");
	printf("Currently there are no flights underway.\n");
	exit;
}

printf("<table border=1 >\n");
printf("<tr><th>USER</th> <th>LAT</th> <th>LON</th> <th>MSL</th><th>GSKTS</th></tr>\n");

$ark = array_keys($flightarr);
$n = count($ark);
$maxlat = -90; $minlat = 90; $maxlon = -180; $minlon = 180;
for($i = 0; $i < $n; $i++){
	$k = $ark[$i];
	printf("<tr><td align=center>%s</td> <td align=center>%s</td> <td align=center>%s</td> <td align=center>%s</td> <td align=center>%s</td> </tr>\n",$k,$flightarr[$k]["LAT"],$flightarr[$k]["LON"],$flightarr[$k]["MSL"], $flightarr[$k]["KTS"]);

	$marker[$i] = sprintf("marker = L.marker ([%s, %s]).addTo(map).bindPopup('%s').openPopup();",$flightarr[$k]['LAT'],$flightarr[$k]['LON'],substr($k,0,7));

	if ($flightarr[$k]["LAT"] > $maxlat) $maxlat = $flightarr[$k]["LAT"];
	if ($flightarr[$k]["LAT"] < $minlat) $minlat = $flightarr[$k]["LAT"];
	if ($flightarr[$k]["LON"] > $maxlon) $maxlon = $flightarr[$k]["LON"];
	if ($flightarr[$k]["LON"] < $minlon) $minlon = $flightarr[$k]["LON"];
}
$maxdistlat = 2*($maxlat - $minlat);
$maxdistlon = $maxlon - $minlon;
$zoom = min(13.5-log($maxdistlat)*2.3, 13.5-log($maxdistlon)*2.3);
$avglat = ($maxlat + $minlat) / 2;
$avglon = ($maxlon + $minlon) / 2;

printf("<tr> <td colspan=5>");
printf("<div id='mapDiv' style='width: 900px; height: 600px'></div>");
printf("<script type='text/javascript'>");

printf("var avglat = %s;",$avglat);
printf("var avglon = %s;",$avglon);

printf("map = new L.map('mapDiv').setView([avglat, avglon], %s);",$zoom);
printf("osm = new L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {attribution: 'Map data &copy; OpenStreetMap', minZoom: 2, maxZoom: 12 }).addTo(map);");
printf("map.addLayer(osm);");

for($i = 0; $i < count($marker); $i++) printf($marker[$i]);

printf("</script>");
printf("</td></tr>");
printf("</table>");

printf("<br /><i>This map was created with <a alt='Leaflet - an open-source JavaScript library for mobile-friendly interactive maps' href='https://leafletjs.com/'>Leaflet</a></i>");


// Convert lat and lon from decimal degree (dd) format to degree decimal minute (ddm) with lat/lon letters
//
// usage example:
// $str = latlon_dd2ddm(37.3906,-118.007233);
// echo $str; // prints the string, 'N37 23.4360 W118 0.4340'

function latlon_dd2ddm($lat, $lon){

	$lat_dir = "N";
	if($lat < 0) $lat_dir = "S";
	$lat = abs($lat);
	$lat_deg = 1 * sprintf("%d",$lat);
	$lat_min = 60 * ($lat - $lat_deg);


	$lon_dir = "E";
	if($lon < 0) $lon_dir = "W";
	$lon = abs($lon);
	$lon_deg = 1 * sprintf("%d",$lon);
	$lon_min = 60 * ($lon - $lon_deg);

	$latlon = sprintf("%s%d %.4f %s%d %.4f",$lat_dir, $lat_deg, $lat_min, $lon_dir, $lon_deg, $lon_min);
	return $latlon;
}

?>
