// https://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project

var mongoose = require("mongoose");

var ArticleSchema = new mongoose.Schema({
  headline: {
    type: String,
    trim: true,
    required: true,
    index: true
  },
  summary: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  comment_ids: [Schema.Types.ObjectId]
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;