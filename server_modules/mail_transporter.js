const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "giusvepsgiu@outlook.com",
        pass: "svepsgiu123"
    },
})

module.exports = transporter