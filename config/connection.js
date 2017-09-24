var mongoose = require('mongoose');


var connection = mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
})
  // connect locally if heroku doesn't work
// var connection = mongoose.connect('mongodb://localhost/newsscraper', {
//   useMongoClient: true,
// })


module.exports = connection;