const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const sessions = require('../server_modules/sessions.js')
const mail_transporter = require('../server_modules/mail_transporter.js')

router.post('/add', async function(req, res) {

  let session_id = req.cookies.auth

  if (sessions.Data[session_id]) {

  let admin = await db.user.findOne({ privilege: "Admin", username: sessions.Data[session_id].username })
    
  if (admin) {
    let new_page = new db.news;
    new_page.html = req.body.html,
    new_page.title = req.body.title
    new_page.save()
    res.send(JSON.stringify({ message: "Page added successfuly!" }))
  }
  else res.status(401).send("Unauthorized");
  } else res.status(401).send("Unauthorized");
});


let index = 0;

async function broadcast(arg) {
  try {
    let documents = await db.news.find({})
    if (!documents[0]) return;

    let users = await db.user.find({})

    let email_addresses = '';

    for (let index = 0; index < users.length; index++) {
      if (index == users.length - 1) {
        email_addresses += users[index].email
      } else {
        email_addresses += users[index].email + ", "
      }
    };

    console.log(email_addresses)

    await mail_transporter.sendMail({
      from: mail_transporter.options.auth.user,
      to: email_addresses,
      subject: documents[0].title,
      html: documents[0].html
    })

    await db.news.deleteMany({ html: documents[0].html })
  } catch (err) {
    console.log(err)
  }
}

broadcast();
setInterval(broadcast, 3600/2 * 1000);

module.exports = router