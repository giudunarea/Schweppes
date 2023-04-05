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
app.set('views','./views')

app.use('/dist', express.static('dist'));

const db = require('./server_modules/db.js')

const auth_router = require('./routes/auth.js')
app.use('/', auth_router)

const generic_router = require('./routes/generic.js');
app.use('/', generic_router)

const cities_router = require('./routes/cities.js');
app.use('/cities', cities_router)

const newsletter_router = require('./routes/newsletter.js');
app.use('/newsletters', newsletter_router)

app.use(function(req, res) {
  res.status(404).render('./generic/404.ejs')
});

server.listen(3000, function(){
  console.log("Started")
});

