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
  // Article.remove({}, function(err) { 
  //   console.log('collection removed') 
  // });
  request("https://www.nytimes.com/", function(error, response, html) {
    var $ = cheerio.load(html);
    var entriesList = [];    
    // async each: https://stackoverflow.com/questions/23608325/each-and-callbacks
    // create resolved promise to start chain
    var i = 0;
    var p = Promise.resolve();
    $("article.story").each(function(i, element) {
      // each step of the each loop waits for the next to finish, and returns a new promise to continue the chain
      p = p.then(function(){ 
        var result = {};
        result.headline = $(element).find("h1.story-heading").text().trim() || 
        $(element).find("h2.story-heading").text().trim() || 
        $(element).find("h3.story-heading").text().trim();
        result.summary = $(element).children("p.summary").text().trim() || ""
        result.url = $(element).find("a").attr("href")||$(element).children("a.story-link");
        var entry = new Article(result);
        // save to db
        return new Promise(function(resolve, reject){
          entry.save(function(err, doc) {
            if (err) {
              // if duplicate article error, find the existing entry and add it to display list
              if(err.code===11000){
                Article.findOne({ "headline": result.headline, "summary": result.summary }, function(err, doc){
                  if(err){
                    console.log(err);
                  } else{
                    entriesList.push(doc);
                  }
                  resolve();   
                })
              } 
              else{
                console.log("ERROR SAVING ARTICLE: "+err)
                resolve();
              }
            }
            // If not duplicate, push the entry to the display list
            else {
              entriesList.push(entry);
              resolve();
            }
          });
        });
      });    
    });
    // in the final p, after .each has completed, send back scraped data
    p.then(function(){
      res.send(entriesList);
    }).catch(function(err){
      console.log(err);
    })
  });
  
});

app.get("/write", function(req, res) {
    res.send("write comment");
});

app.post("/write", function(req, res) {
  console.log(req.body.user_name)

  var comment = new Comment(result);
  res.send("Comment saved!");

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
