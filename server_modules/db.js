var Mongoose = require('mongoose')
var Schema = Mongoose.Schema

async function connect_db() {
  await Mongoose.connect('mongodb+srv://admin:HlIHVb6bwOj0PTaB@sveps.mmbevcb.mongodb.net/?retryWrites=true&w=majority');
}
connect_db().then(function() { console.log("Connected to db") }).catch(function(err) { warn(err) })

const user_schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  created: { type: Date, default: Date.now },

  auth: String
});

const user = Mongoose.model('user', user_schema);

module.exports = { user }