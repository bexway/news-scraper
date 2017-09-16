var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  summary: String,
  article_id: Schema.Types.ObjectId,
  user_id: Schema.Types.ObjectId
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;