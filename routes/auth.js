const express = require('express');
const router = express.Router();

const email_validator = require('email-validator');
const bcrypt = require('bcrypt');

const db = require('../server_modules/db.js')
const mail_transporter = require('../server_modules/mail_transporter.js')
  
const randomstring = require('../dist/scripts/utility/randomstring.js')
const strlen = require('../dist/scripts/utility/strlen.js')

router.post('/register', async function(req, res) {
  
  if (!email_validator.validate(req.body.email)) return res.status(401).end(JSON.stringify({message:"Bad email"}))
  if (await db.user.findOne({ username: req.body.username })) { return res.status(401).end(JSON.stringify({message:"Username already in use"})) }
  if (strlen(req.body.password) > 30 || strlen(req.body.password) < 8) { return res.status(401).end(JSON.stringify({message:"Bad password"}))}

  let new_user = new db.user({ username: req.body.username, email: req.body.email })
  new_user.password = await bcrypt.hash(req.body.password, 10);

  let authtoken_ = randomstring.generate(50)
  async function checkauth_recursive() {
    if (await db.user.findOne({ auth: authtoken_ })) {
      authtoken_ = randomstring.generate(50);
      checkauth_recursive();
    }
  }
  checkauth_recursive();

  new_user.auth = authtoken_
  new_user.save();

  await mail_transporter.sendMail({
  from: mail_transporter.options.auth.user,
  to: new_user.email,
  subject: "Da banii",
  text: "Da banii ca te tai"
  })
  
  res.cookie('auth', new_user.auth, { maxAge: 90000 }).end(JSON.stringify({message:"Authorized"}));
})

router.post("/login", async function(req, res) {
  let foundUser = await db.user.findOne({ username: req.body.username })
  if (foundUser) {
    if (await bcrypt.compare(req.body.password, foundUser.password)) {
      res.cookie('auth', foundUser.auth, { maxAge: 90000 }).send("Authenticated");
    } else {
      return res.end("Incorrect password");
    }
  } else {
    return res.end("User not found");
  }
})

router.post("/logout", async function(req, res) {
  let foundUser = await db.user.findOne({ auth: req.cookies.auth });
  if (foundUser) {
    console.log("found user!")
    res.clearCookie("auth");

    let authtoken_ = randomstring.generate(50)
    async function checkauth_recursive() {
      if (await db.user.findOne({ auth: authtoken_ })) {
        authtoken_ = randomstring.generate(50);
        checkauth_recursive();
      }
    }
    checkauth_recursive();

    foundUser.auth = authtoken_
    foundUser.save();

    res.send("Logged out");
  } else { res.status(404).end() }
})

router.get('/register', (req, res) => {
  res.render('register.ejs', { title: "plm" });
});

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

module.exports = router;