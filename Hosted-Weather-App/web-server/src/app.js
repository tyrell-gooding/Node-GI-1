const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const fs = app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Tyrell Gooding",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "Tyrell Gooding",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    helptext: "hrlpful text",
    name: "Tyrell Gooding",
  });
});

app.get("/weather", (req, res) => {
  const { _, units } = req.query;
  if (!req.query.address) {
    return res.send({
      error: "you need to provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(
        latitude,
        longitude,
        (error, forecastData) => {
          if (error) {
            return res.send(error);
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address,
          });
        },
        units
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error page",
    name: "Tyrell Gooding",
    errorMessage: "page not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error page",
    name: "Tyrell Gooding",
    errorMessage: "page not found.",
  });
});

app.listen(port, () => {
  console.log("server is on");
});
