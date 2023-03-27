const express = require('express')
const app = express()

const cookie_parser = require('cookie-parser')
app.use(cookie_parser())

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.use('/dist', express.static('dist'));

const db = require('./server_modules/db.js')

const auth_router = require('./routes/auth.js')
app.use('/', auth_router)

app.get('/home', function(req, res) {
  res.render('index')
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

