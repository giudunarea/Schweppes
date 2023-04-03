const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const sessions = require('../server_modules/sessions.js')

router.get('/:name', function(req, res) {
  res.render('index.ejs');
});

module.exports = router