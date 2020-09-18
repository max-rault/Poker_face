const express = require('express')
const router = require('./routes')
const app = express()
var session = require('express-session');
const port = 3000

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('view engine', 'pug')
app.set('views','./src/views')
var publicDir = require('path').join(__dirname,'../assets/icons'); 
app.use(express.static(publicDir)); 

app.set('trust proxy', 1) // trust first proxy

//Authentificate user



/*app.use(cookieSession({
  name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  60 * 1000
}))*/

app.use('/', router)

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)
})