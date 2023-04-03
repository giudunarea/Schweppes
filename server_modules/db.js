var Mongoose = require('mongoose')
var Schema = Mongoose.Schema

async function connect_db() {
  await Mongoose.connect(process.env.pass);
}
connect_db().then(function() { console.log("Connected to db") }).catch(function(err) { warn(err) })

const user_schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  
  privilege: {type: String , default: "User"},
  created: { type: Date, default: Date.now }
});

const city_schema = new Schema({
  name: String,
  banner : String,
  interests:[
    
  ]
});

const news_schema = new Schema({
  title: String,
  html : String
});

const news = Mongoose.model('news' , news_schema);
const user = Mongoose.model('user', user_schema);

module.exports = { user , news}