/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const { nextISSTimesForMyLocation } = require('./iss');
// fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes,

const Callback = function(error, ip) {
  if (error) {
    console.log('there is an error', error);
    return;
  }
  // fetchCoordsByIP(coordCallback);
  console.log(ip, fetchCoordsByIP(ip, coordCallback));
};
const coordCallback = function(error,data) {
  if (error) {
    console.log('there is an error with the coordnates', error);
    return;
  }
  let info = {};
  info.longitude = data.longitude;
  info.latitude = data.latitude;
  console.log(info);
};
const ISSCallback = function(error,data) {
  if (error) {
    console.log('there is an error with the url', error);
    return;
  }
  console.log('it worked',data)
};
const passingtmes = function(passTimes){
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passingtmes(passTimes);
   
});
// fetchISSFlyOverTimes({ longitude: -114.2017, latitude: 51.0927 }, ISSCallback);
// fetchCoordsByIP('70.72.210.36',coordCallback);
// fetchMyIP(Callback);
// nextISSTimesForMyLocation(Callback);



