<?php

//userquery.php: updated on 13 July 2015


$username = $_GET['user']; //entered by user in fsACARS
$userpass = $_GET['pass']; //entered by user in fsACARS
$auth     = $_GET['auth']; //this is the password on line 5 of serverconfig.txt
$version  = $_GET['ver'];  //version of fsACARS
$planelat = $_GET['lat'];  //latitude, decimal degrees
$planelon = $_GET['lon'];  //longitude, decimal degrees
$aircraft = $_GET['eqpt']; //aircraft per titleline


//Note that any response by this script other than NOUSR or USEROK
//will result in FSACARS reporting a server error



//Line 5 of serverconfig.txt contains a password you can validate here
//As a demo we allow anything except for an empty field.
if($auth == ""){
	echo "NOUSR";
	exit;
}


//User and password validation (you probably want to use hashed passwords)
//As a demo we allow anything except for empty name and password fields.
if(($username == "") || ($userpass == "")){
	echo "NOUSR";
	exit;
}


//fsACARS must receive the following response or it will not allow the user to
//use the program.
echo "USEROK";



exit;

?>

