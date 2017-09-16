var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  comment_ids: [Schema.Types.ObjectId]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;