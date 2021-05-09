
const request = require('request');
let IPaddress = '';
let coordsByIP = {};
let ISSFlyBy = [];

const fetchMyIP = function(callback) {
  
  request('https://api.ipify.org?format=json',(error,response,body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      console.log(response.statusCode);
      return;
    }
    IPaddress = JSON.parse(body).ip;
    return callback(null,IPaddress);
  }); // returns an object
  // use request to fetch IP address from JSON API
};
const fetchCoordsByIP = function(ip,callback) {
  request(`https://freegeoip.app/json/${ip}`,(error,response,body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    coordsByIP = JSON.parse(body);
    // console.log(coordsByIP.longitude);
    // const coords = coordsByIP.longitude;
    return callback(null,coordsByIP);
  });
  
};
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss/v1/?lat=${coords.latitude}&lon=${coords.longitude}&alt=1650`,(error,response,body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    ISSFlyBy = JSON.parse(body).response;
    return callback(null,ISSFlyBy);
  });
  // ...
};
// ,nextISSTimesForMyLocation
// empty for now
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error,null);
    }
    // console.log(IPaddress);
    fetchCoordsByIP(IPaddress,(error,loc) => {
      if (error) {
        return callback(error,null);
      }
      // console.log(coordsByIP);
      fetchISSFlyOverTimes(coordsByIP,(error,nextPass) => {
        if (error) {
          return callback(error,null);
        }
        // console.log(ISSFlyBy);
        callback(null,nextPass);
      });
    });
  });
  }
  //   fetchMyIP((error,IPaddress));
  //  fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes
module.exports = {nextISSTimesForMyLocation };