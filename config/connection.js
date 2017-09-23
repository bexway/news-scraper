var mongoose = require('mongoose');

try {
  var connection = mongoose.connect(MONGODB_URI, {
    useMongoClient: true,
    /* other options */
  })
}
catch (e) {
  var connection = mongoose.connect('mongodb://localhost/newsscraper', {
    useMongoClient: true,
    /* other options */
  })
}

module.exports = connection;