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

// Models
var article = require("./models/article.js");
var user = require("./models/user.js");
var comment = require("./models/comment.js");

// Routes
app.get("/", function(req, res) {
  res.send("Hello world");
  //scrape news articles into db and display
  //TODO: request info, convert info into objects, push objects into db
  //TODO: if pushing the object into the db returns a uniqueness error, retrieve that article from the db and display it
  //https://stackoverflow.com/questions/21638982/mongoose-detect-if-document-inserted-is-a-duplicate-and-if-so-return-the-exist
});

app.get("/write", function(req, res) {
    res.send("write comment");
    // use $push to push a comment to an article. use new:true to make sure the article with comment added gets returned
    //As part of adding the comment, update the article
    //.populate(comments) (and you can chain .populate)
    //then use .exec(callback) to run whatever
});

app.get("/comments", function(req, res) {
    // If I want to limit by user, this might help later on: https://stackoverflow.com/questions/15102532/mongo-find-through-list-of-ids
    res.send("see comments");
});

// Set the app to listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running!");
});
