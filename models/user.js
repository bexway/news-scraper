var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: String,
  comment_ids: [Schema.Types.ObjectId]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;