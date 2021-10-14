const express = require("express");
const app = express();
//const path = require("path");
const db = require("./db");
const bodyParser = require("body-parser");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

// API
//app.use("/api/heroes", require("./api/heroes"));
app.get("/", function (req, res) {
  res.send("GET request completed to the homepage");
});
app.use("/api/posts", require("./api/posts"));
// Server
var port = 3000;
app.listen(port, function () {
  console.log("listening on port:" + port);
});
