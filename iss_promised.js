const request = require('request-promise-native');

const fetchMyIP = function(callback) {
 return request('https://api.ipify.org?format=json')
};
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchISSFlyOverTimes = function(body) {
  const data = JSON.parse(body);
  const url = `http://api.open-notify.org/iss/v1/?lat=${data.latitude}&lon=${data.longitude}&alt=1650`;
  return request(url);
};
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
}
module.exports = { nextISSTimesForMyLocation };