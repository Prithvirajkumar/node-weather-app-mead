const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicHJpdGh2aXJhamt1bWFyIiwiYSI6ImNrZjMzYnhoczFtdzcyc21idjFiZmQ2bzEifQ.NgPCBuK3J1RXTD7eNZ3lSg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Please enter a valid location", undefined);
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        location,
        latitude,
        longitude,
      });
    }
  });
};

module.exports = geocode;
