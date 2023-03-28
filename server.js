const express = require('express');
const app = express();

const http = require('http')
const server = http.createServer(app)

const cookie_parser = require('cookie-parser')
app.use(cookie_parser())

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('view engine', 'ejs')
app.use('/dist', express.static('dist'));

const db = require('./server_modules/db.js')

let sv_wsocket = require('./server_modules/sv_wsocket.js')
sv_wsocket.init()
sv_wsocket = sv_wsocket.get()

const auth_router = require('./routes/auth.js')
app.use('/', auth_router)

app.get('/', function(req, res) {
  res.render('index.ejs');
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
