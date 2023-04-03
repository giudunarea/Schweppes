const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const sessions = require('../server_modules/sessions.js')

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/about', function(req, res) {
  res.render('about.ejs');
});

router.get('/cities', function(req, res) {
  res.render('cities.ejs');
});


router.get('/settings', async function(req, res) {
  let session_id = req.cookies.auth

  if (sessions.Data[session_id]) {
    
    let user = await db.user.findOne({username:sessions.Data[session_id].username})
    
    if (user.privilege == "User") return res.render('settings.ejs', { user: user , newsletters:[]});
    if (user.privilege == "Admin") return res.render('settings.ejs', { user: user , newsletters: await db.news.find({}) });
  } else res.redirect('/')
});

module.exports = router