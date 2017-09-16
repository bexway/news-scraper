// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var connection = require("./config/connection.js");
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", function(req, res) {
  res.send("Hello world");
});

app.get("/write", function(req, res) {
    res.send("write comment");
});

app.get("/comments", function(req, res) {
    // If I want to limit by user, this might help later on: https://stackoverflow.com/questions/15102532/mongo-find-through-list-of-ids
    res.send("see comments");
});

// Set the app to listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running!");
});
