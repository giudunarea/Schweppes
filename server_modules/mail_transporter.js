const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service:"hotmail",
  auth:{
    user:"svepsgiu@outlook.com",
    pass:"giusveps123"
  }
})

module.exports = transporter