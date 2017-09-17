// Dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// Database configuration
// Save the URL of our database as well as the name of our collection
var connection = require("./config/connection.js");
app.use(bodyParser.urlencoded({ extended: false }));

// Models
var Article = require("./models/article.js");
var User = require("./models/user.js");
var Comment = require("./models/comment.js");

// Routes
app.get("/scrape", function(req, res) {
  // res.send("Hello world");
  //scrape news articles into db and display
  //TODO: request info, convert info into objects, push objects into db
  //TODO: if pushing the object into the db returns a uniqueness error, retrieve that article from the db and display it
  //https://stackoverflow.com/questions/21638982/mongoose-detect-if-document-inserted-is-a-duplicate-and-if-so-return-the-exist

  //TODO: remove this line before production; needed to prevent duplicates while I haven't written handling for them
  connection.db.dropCollection('articles', function(err, result) { });

  request("http://www.echojs.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    var entriesList = [];
    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.headline = $(this).children("a").text();
      result.summary = "placeholder"
      result.url = $(this).children("a").attr("href");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          // console.log(err);
        }
        // Or log the doc
        else {
          // console.log(doc);
        }
      });

      // TODO: add if clause to err to account for duplicates (set the correct one to entry if err)

      entriesList.push(entry);

    });
    // send back scraped data
    res.send(entriesList);
  });
  
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
