const request = require("postman-request");

const forecast = (latitude, longitude, callback, units) => {
  const url =
    "https://api.weatherstack.com/current?access_key=68722b2319c74160da967fa880b4e0d7&query=" +
    latitude +
    "," +
    longitude +
    "&units=" +
    units;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to service");
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_description[0],
        ` its currently` +
          body.current.temperature[0] +
          `degrees out, it feels like` +
          body.current.feelslike +
          `degrees currently.`
      );
    }
  });
};

module.exports = forecast;
