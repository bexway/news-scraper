var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  textContent: {
    type: String,
    trim: true,
    required: true
  },
  article_id: {
    type: Schema.Types.ObjectId,
    required:true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required:true
  }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;