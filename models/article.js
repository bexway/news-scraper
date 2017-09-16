// https://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project

var mongoose = require("mongoose");

// TODO: investigate this to prevent duplicate articles? (maybe create a validation function for it, and find a way to catch that message?: https://stackoverflow.com/questions/23760253/mongoose-custom-validation-using-2-fields
var ArticleSchema = new mongoose.Schema({
  headline: {
    type: String,
    trim: true,
    required: true,
    index: true,
    unique: "Article must be unique"
  },
  summary: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;