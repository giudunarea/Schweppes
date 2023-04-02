const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')

router.post('/add',function(req,res){
  if (db.user.findOne({privilege:"Admin" , auth:req.cookies.auth})){
    let new_page = new db.news;
    new_page.permanent = req.body.permanent,
    new_page.html = req.body.html,
    new_page.title = req.body.title

    new_page.save()
    res.send(JSON.stringify({message:"Page added successfuly!"}))
  }
});

module.exports = router