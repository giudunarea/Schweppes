const express = require('express')
const mongoose = require('mongoose')
const cookie_parser = require('cookie-parser')

const app = express()

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.use('/dist', express.static('dist'));
app.use(cookie_parser())

async function connect_db() {
  await mongoose.connect('mongodb+srv://admin:HlIHVb6bwOj0PTaB@sveps.mmbevcb.mongodb.net/?retryWrites=true&w=majority');
}
connect_db().catch(function(err) { warn(err) })

var Schema = mongoose.Schema

const user_schema = new Schema({
  username: String, 
  password: String,
  email: String,
  auth: String,
  created: { type: Date, default: Date.now }
});
const user = mongoose.model('user', user_schema);

const authtoken = require('./server_modules/authtoken.js')
app.post('/signup',function(req,res){
  
    const new_user = new user({ username: req.body.username , password: req.body.password,email:req.body.email})
  
    let authtoken_ = authtoken.generate(50)
    console.log(authtoken_)
    async function checkauth_recursive(){
      await user.findOne({auth:authtoken_}).exec().then(function(err,obj){
        console.log(obj);
        if(obj){authtoken_ = authtoken.generate(50);checkauth_recursive();}
      })
    }
    checkauth_recursive();
    new_user.auth = authtoken_
    console.log(authtoken_)
  
    new_user.save();
    res.cookie('auth' , new_user.auth , { maxAge : 90000 })
    res.send("Account Created");
})

 app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
