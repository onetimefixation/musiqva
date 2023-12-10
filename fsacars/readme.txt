fsACARS Configuration Guide (turn word-wrap on)

This is the only fsacars fully supported by its developer - me. If you have any questions about this Windows software please contact me garen.evans@gmail.com - I hope you enjoy using fsACARS!

LIST OF UPDATES
==================================================================
An annotated list of changes starts below the disclaimer, below. (about line 70). 


INTRODUCTION
==================================================================
Most users will have no reason to read through this guide, as fsACARS is simple, intuitive, and has only a few buttons. Stll, all users should be aware that there are some basic requirements and limitations.



REQUIREMENTS
==================================================================
1. Microsoft Windows 7 or higher.

2. Microsoft .NET Framework 4.5 or higher
http://www.microsoft.com/en-us/download/details.aspx?id=30653

3. Flight Simulators: X-Plane, P3D, P3Dv4, FSX, FS9

4. FSUIPC - http://www.schiratti.com/dowson.html

5. X-Plane users - XPUIPC http://www.tosi-online.de/XPUIPC/XPUIPC.html



INSTALLATION
==================================================================
No installer is required: simply unzip the files into any folder on your hard drive.  The download does not contain any virus, spyware, adware or malware.


TROUBLESHOOTING NOTES
==================================================================
1. Some users report the need to Run as Administrator.
2. Antivirus softare may need to be temporarily disabled and/or set to ignore fsacars.exe
3. Web blocking software (eg., Trend Micro) users must add the name of the server to the exception list.
4. Use the same callsign and password as the website
5. Do not change the server authentication password (line 5 in serverconfig.txt)


EXAMPLE USAGE
==================================================================
1. Start your flightsim, then situate aircraft on the ground and parked.
2. Open fsACARS and verify it is connected to FSUIPC (indicated in the lower status bar: green = connected).
3. Click on the START button (it will change to a STOP button).
4. Fly, then land.
5. After completing the flight, press the STOP button.
6. Enter any comments about your flight, then press the PIREP button.


CONFIGURATION
==================================================================

Detailed instructions for configuring fsACARS for your server are located in the readme.txt file in the server_files folder.


USAGE
==================================================================

This software has successfully logged more than 50000+ flights by numerous VAs.


DISCLAIMER
==================================================================
This software, and scripting was tested to a reasonable degree on numerous systems and should not harm any computer. No resonsibility will be accepted in the unlikely event that any system damage is caused due to the failure or improper use of this software. There is no expressed or implied warranty on this program and the author(s) will not be liable for any configuration problems or otherwise that this software may cause.


CHANGES
==================================================================
June 10, 2020 Version 2.996 fsacars.exe (MD5: dfaa96bbf5cf15db812e4914da2ca4c8)

1. Moved posrep connection error messages from msgbox window to acars listbox and sessionlog.
2. Set position reporting interval to every 20 seconds.


June 8, 2020 Version 2.995 fsacars.exe (MD5: 699273b25e9703803adb27c2da24d5a2)

1. Fixed a bug in 2.992+ that was incorrectly reporting the vertical landing rate.
2. Added new variable: landingG = gravitational force at landing (1 = 9.8m/s^2)
3. Deprecated variable: landingFPS -> landingFPM (see notes v2.9)


June 6, 2020 Version 2.994 fsacars.exe (MD5: cbf8bb7e6a8d19a7aad60102b178c124)
Bugfix: updated SSL/TLS secure channel protocol


June 5, 2020 Version 2.993 fsacars.exe (MD5: c425df6187ebe814b64055bbcaa767cb)
Bugfix: general


June 5, 2020 Version 2.992 fsacars.exe (MD5: 5391470068567a90007c7e885c6bb0da)

1. Updated network interaction (replaced webbrowser with webclient class)
2. Modified reporting of vertical landing speed. Now set to maximum when aircraft bounces on touchdown. (also see multifpm from v2.98)
3. URL encoding of password for initial user query, interim position reports, and final flight report (Thanks D. Langweden)



May 19, 2020 Version 2.991 fsacars.exe (MD5: 632b02b73ed027412eac4adc78d2567e)

1. Added new variable: refuel_total = total amount of additional fuel detected (pounds)
2. Added new variable: verf = MD5 hash of pirep string up to but not including "&verf=..."
3. Modified treatment of aircraft change prior to takeoff (previously a terminal error)
4. Added ability to clean up multiple instances.
5. New updater.  update.exe (MD5: a5077238a5f044e54fa7d0ba6bd842ee)


July 14, 2019 Version 2.98

1. Added support for optional background image (background.jpg)
2. Added support for special characters in passwords. Use PHP's urldecode() to parse these.
3. Flightsim version identification updated (fsVersion)
4. Fixed vertical landing speed = 0
5. Added new variable: multifpm = a semi-colon separated list of vertical landing speed(s).
6. Added new variable: land_truehdg = true heading on landing


December 14, 2018 Version 2.97

1. On Top window behavior disabled.
2. Start button tab stop set to 1.



August 31, 2018 Version 2.96

1. Removed extraneous FSUIPC polling (XP11 - fixes flashing at top of screen)
2. Dynamic refueling detection (flag set if enroute fuel increase >1% FOB)
3. Added diagnostics to sessionlog.txt after detection of enroute refueling.


June 1, 2018 Version 2.95

1. Updated cloud base detection (fixes report of VFR when cloud base is IFR)


May 21, 2018 Version 2.94

1. Log coordinates of crash (in sessionlog.txt only)

2. New pirep variables:
	takeoffflaps: takeoff flap setting (0=no flaps)
	landingflaps: landing flap setting (0=no flaps)
	omaxtaxi: maximum taki speed prior to takeoff
	dmaxtaxi: maximum taxi speed after landing
	takeoffKTS: airspeed at takeoff
	
3. Refined day/night algorithm (now calculates sun altitude based on flightsim time)

MAY 1, 2018 (Version 2.93):

1. Acars reminder - displays message if acars is open but not started; activated when user is on the ground, and ground speed is more than 30 knots.
2. New pirep variable: hwavg = average enroute headwind (-tailwind).

MARCH 30, 2018 (Version 2.92):

1. Multiple instance detection and prompting.

MARCH 26, 2018 (Version 2.91):

1. Fixed bug in landing performance algorithm.  


MARCH 15, 2018 (Version 2.9):

1. New pirep variables:
	wdavg = wind direction average for flight
	wsavg = wind speed average for flight

2. Improved accuracy of landing performance algorithm.
	a. sensing starts at RA100
	b. absolute vsi in feet per minute
	c. rollout distance is to 80 knots.

3. Added VFR weather audit (in sessionlog.txt)

4. Enabled multiple instancing.

5. Variable name change:
	landingFPS is replaced by landingFPM - vertical landing speed in absolute feet per minute


MARCH 2, 2018 (Version 2.8):

1. Modified interface - moved pirep comment field, and pirep button to a separate Send Flight Report panel that is visible at end of flight ; set background to grayscale Perlin cloud.

2. Added diagnostics for refuel detection (sessionlog.txt only)


JANUARY 26, 2018 (Version 2.7):

1. Button background color changes.

2. New Pirep variables (case-sensitive):

	takeoffHWC = takeoff headwind (-tailwind) component, knots
	takeoffXWC = takeoff crosswind component, knots

	landingHWC = takeoff headwind (-tailwind) component, knots
	landingXWC = takeoff crosswind component, knots
	
	Landing Signal Officer for Naval Air Carrier Traps are generated for any landing with a VSI < -1000 FPM
	-------------------------------------------------------------------------------------------------------
	lsotxt = text scores delimited with semicolon(s). Grades are (highest to lowest): _OK_; OK; (OK); -; C.  
	lsonum = numerical scores corresponding (5 to 1) to lsotxt grades, delimited with semi-colon(s).
	

3. Improved detection of X-plane vs other sims (see pirep.php: fsVersion=XP)

4. New startup variable (eqpt):

	Updated userquery.php to read the following startup variables

	user = username field entered by user in fsACARS
	pass = username entered by user in fsACARS
	auth = password on line 5 of serverconfig.txt
	ver = internally reported version of fsACARS
	lat = latitude, decimal degrees
	lon = longitude, decimal degrees
	eqpt = aircraft titleline <-- NEW AS OF VERSION 2.7 !!!


OCTOBER 13, 2017: (Version 2.6)

1. Start Reminder - prevent users from departing without pressing the Start button. If acars is open, and user has not pressed the Start button, and user is on the ground, and ground speed is more than ~30 knots, then a message is briefly displayed and ground z-axis is set to zero (i.e., aircraft is stopped). May not work as intended for X-Plane.

2. New variables:
     a. enroutefuel = pounds of fuel from time off to time on.
     b. taxifuel = pounds of fuel from time out to time off plus time on to time in
     c. blockfuel = enroutefuel + taxifuel
     d. gmax = maximum G Force
     e. gmin = minimum G Force
     f. rollout = distance (feet) from touchdown to ground speed less than 30 knots

JUNE 17, 2017: (Version 2.5A)

1. Increased precision of lat1, lon1, lat2, lon2 (i.e., float 6)
2. New variables:
     a. latland and lonland = coordinates at wheel touchdown
     b. rollout = feet from touchdown to 30 knots ground speed
     c. zfw = zero fuel weight (complements oew from v2.3C)

APRIL 17, 2017: (Version 2.4B)

1. Revised updater to automatically check for new version at startup.
2. Moved files in serverfiles.zip to server_files folder
3. acars now sends latitude and longitude at start of flight (see userquery.php in server_files folder)
4. Position reports (posrep.php) now include true heading, elapsed time, aircraft titleline, and on-ground flag.
5. Pireps (pirep.php) now include flight sim version and operating empty weight.
6. Updated userquery.php (see 3); posrep.php; pirep.php, mysql_php_demo.php in server_files folder.


## END OF 2016 ###

NOV 6: (2.3G)

1. Enabled reset of [NO FUEL] flag following normal refuel action.


APR 03: (2.3F)

1. Block time is net pause time if pause time is greater than 15 minutes.


FEB 25: (2.3D)

1. Increased KML log limit from 3600 to 37000.
2. Shortened KML coordinates to reduce file storage.
3. Periodic display and logging of selected enroute telemetry (MSL, GSKTS, KIAS)
4. userquery.php returning USEROK allows continuation on Start (no change)
5. userquery.php returning NOUSR now triggers an alert to the user.
6. userquery.php returning anything else alerts user with message returned.



FEB 18: (2.3C)

1. Added new pirep field: oew= operating empty weight

2. Revised criteria for refuel flag.  Note that some models incorrectly move fuel about the plane to balance fuel stores, especially after takeoff and during the final approach phase.  The flag is now set only if an individual positive fuel differential exceeds 67 lbs.


FEB 17: (2.3B) - added exit verification dialog.

FEB 15: (2.3)

Added new Pirep field: 

fsVersion   = the user's version of flight sim.

Added four new fields to the position reporter: hdgtrue, hours, titleline, onground. The following list describes all 12 of the currently available telemetry datum sent by fsACARS:

  user      = username entered by user
  password  = password entered user
  lat1      = starting latitude, decimal degrees
  lon1      = starting longitude, decimal degrees
  lat2      = current latitude, decimal degrees
  lon2      = current longitude, decimal degrees
  msl       = altitude, feet above mean sea level
  gskts     = ground speed, knots
  hdgtrue   = true heading of aircraft
  etime     = current block time in decimal hours
  titleline = aircraft descriptor per aircraft.cfg title
  onground  = 0 if airborne, 1 if on ground

Password masking is default, but user can optionally double-click on password field to reveal password in plain text.


Feb 14: (2.2) Improvements to updater. 


Feb 4: (2.1) - updater bugfix


January 31 (Version 2.0)

Added automatic version checking and automatic updating. This includes a complementary software updater (fsacarsUpdater.exe) that autonomously manages the update process.  The updater is automatically downloaded if not found in the installation folder.

Password masking off.

Username and password fields enabled/disabled appropriately.



January 25, 2016 (1.9)

Fixed erroneous payload value (FSX only). Streamlined pilot reporting process by removing superfluous message boxes.



September 15  (1.8)

Updated economic module to support cargo operation financials.

Fixed a bug that prevented a flight from being logged if the sim was closed.

Improved accuracy of weight sensing to support 100LL and JetA fuel. 

Added a function in posrep.php to convert decimal degrees to degree decimal minute format.

Added flight reporting variable 'payload'





July 21 

Autonomous FSUIPC detection; removed FSUIPC connect button.

Manual FSUIPC connection enabled via statusbar mouse-click.

Enlarged logo area (300x186).

Crash detection no longer triggers automatic termination, but a 'crashed' flag can be checked by the server.

Added additional landing analysis vis-a-vis selected Landing Signal Officer (LSO) grades.  Note the grades are based primarily on AICarrier and TacPack glide slope angles (4.12 degrees). Server variable 'lso' contains grade(s) delimited with semicolon(s). Grades are (highest to lowest): _OK_; OK; (OK); -; C.  


Added flight reporting variables (collected by pirep.php): 
takeoffFR = flight rule at time of departure
windstart = wind direction and speed at time of departure (in metar format: DDDSS)
windstop = wind direction and speed at time of arrival (in metar format: DDDSS)

Added an example of how to integrate fsACARS with mySQL (in base package; serverfiles.zip)



July 13:

1. Color-coded FSUIPC status (green=connected, red=not connected) in lower left status bar.

2. (server specific) Removed atcData variable.

3. (server specific) Version number is sent during login.  There are now 4 login variables: user, pass, auth, and ver.

4. (server specific) The default version check is once every 7 days.  In this version however, the server has the ability to force a version check during login by returning FORCE_VERSION_CHECK, instead of USEROK or NOUSR.




July 3 Maintenance only


July 2 Fixed NaN bug. Updated version check.


June 24 Added support for premium organizational branding. Fixed international dateline bug.


May 26 Hash tags (#) in pirep strings replaced with underscore (_) to resolve potential cgi errors.


May 16 Additional support for non-US geodetics


May 11 Added support for non-USA environments re: convert geodetic commas to periods


May 4 maintenance


April 25:

Added the following variables to fsacars.exe and pirep.php with examples:

crashed: =1 if a crash was detected, =0 otherwise.

fstimeout = flightsim zulu time OUT (cf., timeout reports actual zulu time)
fstimeoff = flightsim zulu time OFF (cf., timeoff reports actual zulu time)
fstimeon  = flightsim zulu time ON  (cf., timeon reports actual zulu time)
fstimein  = flightsim zulu time IN  (cf., timein reports actual zulu time)

Added kml logging to depict track flown on Google Earth.  After each flight, a Google Earth file is created in the kml directory.  To view this file use Google Earth, or a related online resource (eg., http://display-kml.appspot.com/).  The file depicts the track flown only.


March 26:

Added the following variables to fsacars.exe and updated pirep.php with examples.

atcModel = aircraft model reported in aircraft.cfg
atcData = other aircraft data reported in aircraft.cfg, delimited with forward slashes: 
          /Identifier/Flight Number/Airline/Type/  (NOTE: NO LONGER SUPPORTED - SEE JULY 13 UPDATE)

March 19:

1. Added the following variables to fsacars.exe and updated pirep.php with example:

takeoffLBS = takeoff weight in pounds 

MILdiffLBS = takeoff weight - landing weight - fuel used (can be used to account for depletion of payload, such as ordnance, or paratroopers, or dropped cargo)

2. Increased allowable range of speed for program start to facilitate traps and cats aboard aircraft carriers.

3. Updated fsacars.exe to allow stop-and-go's.


4. Added military economics to the economics_module.php


February 24 fsacars.exe: removed epoch residual from pirep textbox; minor bug fixes (version 1.3.9)


February 16:

1. fsacars.exe: fixed a bug in the user credentialing system.

2. fsacars.exe: added automatic periodic prompting (currently once per week) for software version checks (note this can also be effected by double-clicking on the logo or on the statusbar).

3. userquery.php (in serverfiles.zip): updated to require a definite response (either NOUSR or USEROK).  Webmasters please download the latest script from http://fsacars.com/downloads/serverfiles.txt



