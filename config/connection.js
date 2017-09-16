var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/newsscraper', {
    useMongoClient: true,
    /* other options */
  })
// change when deploying
// mongoose.connect(MONGODB_URI)

module.exports = connection;