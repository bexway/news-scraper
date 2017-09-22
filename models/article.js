// https://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
    trim: true,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;