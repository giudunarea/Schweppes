const express = require('express');
const router = express.Router();

const db = require('../server_modules/db.js')
const mail_transporter = require('../server_modules/mail_transporter.js')

router.post('/add', async function(req, res) {
  console.log()
  let admin = await db.user.findOne({ privilege: "Admin", auth: req.cookies.auth })
  if (admin) {
    let new_page = new db.news;
    new_page.html = req.body.html,
      new_page.save()
    res.send(JSON.stringify({ message: "Page added successfuly!" }))
  }
  else res.status(401).send("Unauthorized");
});

router.get('/get', async function(req, res) {
  let admin = await db.user.findOne({ privilege: "Admin", auth: req.cookies.auth })
  if (admin) {
    res.send(JSON.stringify({ data: await db.news.find({}) }))
  }
  else res.status(401).send("Unauthorized");
})

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
setInterval(broadcast, 3600000);

module.exports = router