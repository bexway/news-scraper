var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  textContent: {
    type: String,
    trim: true,
    required: true
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required:true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;