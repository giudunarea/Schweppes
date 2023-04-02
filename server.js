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

const auth_router = require('./routes/auth.js')
app.use('/', auth_router)
const newsletter_router = require('./routes/newsletter.js');
app.use('/newsletter' , newsletter_router)

app.get('/', function(req, res) {
  res.render('index.ejs');
});

server.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
