var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
  //For now, I'm using a simple string until I have time to code a user authentication
  user: {
    type: String,
    trim: true,
    required:true
  }
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required:true
  // }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;