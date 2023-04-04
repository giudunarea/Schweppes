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

server.listen(3000, function(){
  console.log("Started")
});

new db.city({
  name:"constanta",
  banner_image:"https://upload.wikimedia.org/wikipedia/commons/2/22/Cazino_CT-II-m-A-02801_%287%29.jpg",
  interests:{
    parks:[
      {name:"Tabacarie Park",image:"https://www.turistulliber.ro/wp-content/uploads/2021/03/pescarusi-in-tabacarie-1024x683.jpg", description:"A beautiful park located in the heart of Constanta."}
    ],
    forests:[
      {name:"Comorova Forest",image:"https://www.turistulliber.ro/wp-content/uploads/2022/03/padurea-comorova-olimp-1024x768.jpg", description:"A large forest with many trails for hiking and biking."},
      {name:"Eforie Sud Forest",image:"https://www.cazaretransilvania.ro/Harta-map/litoral/Litoral-Marea_Neagra-plaja-Eforie_Sud-4.jpg", description:"A smaller forest with a peaceful atmosphere."}
    ],
    shopping_centers:[
      {name:"City Park Mall",image:"https://static4.libertatea.ro/wp-content/uploads/2022/08/city-park-mall.jpg", description:" A large mall with many stores and restaurants."}
    ],
    monuments:[
      {name:"The Genoese Lighthouse",image:"http://www.informatii-romania.ro/wp-content/uploads/2016/03/Imaghje00002-23.jpg", description:"A historic lighthouse that offers great views of the sea."}
    ],
    buildings:[
      {name:"The Casino",image:"https://www.romaniaexperience.com/wp-content/uploads/2021/03/top-things-to-do-in-constanta.jpg", description:"An iconic building that used to be a popular casino in the early 1900s."},
      {name:"The National History and Archeology Museum",image:"https://static.iabilet.ro/img/auto_resized/db/event/01/2d/75/00000190853-c0df-1200x1200-n-422030c3.jpg", description:"A museum with exhibits on the history and archeology of Constanta."}
    ],
  }
}).save()