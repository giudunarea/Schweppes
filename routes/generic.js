const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/about', function(req, res) {
  res.render('about.ejs');
});

router.get('/settings', async function(req, res) {
  let user = await db.user.findOne({ auth: req.cookies.auth })
  if (user) {
    if (user.privilege == "User") return res.render('settings.ejs', { user: user , newsletters:[]});
    if (user.privilege == "Admin") return res.render('settings.ejs', { user: user , newsletters: await db.news.find({}) });
  } else res.redirect('/')
});

module.exports = router