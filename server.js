const express = require('express')
const mongoose = require('mongoose')


const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.use('/dist', express.static('dist'));

async function connect_db() {
  await mongoose.connect('mongodb+srv://admin:HlIHVb6bwOj0PTaB@sveps.mmbevcb.mongodb.net/?retryWrites=true&w=majority');
}
connect_db().catch(function(err) { warn(err) })

var Schema = mongoose.Schema

const user_schema = new Schema({
  username: String, 
  password: String,
  email: String,
  created: { type: Date, default: Date.now }
});
const user = mongoose.model('user', user_schema);

app.post('/signup',function(req,res){
  const new_user = new user({ username: req.body.username , password: req.body.password });
  new_user.save();
  res.send("Account Created");
})

 app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
