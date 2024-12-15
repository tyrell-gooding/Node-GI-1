const request = require("postman-request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    encodeURIComponent(address) +
    "&access_token=pk.eyJ1IjoidHlyZWxsZ29vZGluZyIsImEiOiJjbTRvZG5lNjUwNnJlMmlwenk4Yjhxbjk0In0.9b-vLgjOkYPc66jKGKG4QA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].properties.coordinates.latitude,
        longitude: body.features[0].properties.coordinates.longitude,
        location: body.features[0].properties.full_address,
      });
    }
  });
};
module.exports = geocode;
