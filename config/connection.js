var mongoose = require('mongoose');

try {
  var connection = mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true,
    /* other options */
  })
}
catch (e) {
  // connect locally if heroku doesn't work
  var connection = mongoose.connect('mongodb://localhost/newsscraper', {
    useMongoClient: true,
    /* other options */
  })
}

module.exports = connection;