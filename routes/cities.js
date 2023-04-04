const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const sessions = require('../server_modules/sessions.js')

router.get('/:id', async function(req, res) {
    let session_id = req.cookies.auth
    let user = null;
    if (sessions.Data[session_id]) {
        user = await db.user.findOne({
            username: sessions.Data[session_id].username
        })
    }
    if (req.params.id == "all"){
      res.render('./cities/allcities.ejs', {
        user: user,
        title: "Cities",
        cities: await db.city.find({})
      });
    }else{
      let city = await db.city.findOne({name:req.params.id})
      if(city){
          res.render('./cities/profile.ejs', {
          title: city.name ,
          user: user,
          city: city
        });
      }else res.status(404).send("404 | City not found");
    }
});

module.exports = router