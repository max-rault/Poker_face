const express = require('express')
var cookieSession = require('cookie-session')
const router = require('./routes')
const app = express()
var path = require('path');
const port = 3000

app.set('view engine', 'pug')
app.set('views','./src/views')
var publicDir = require('path').join(__dirname,'../assets/icons'); 
app.use(express.static(publicDir)); 

app.set('trust proxy', 1) // trust first proxy


/*app.use(cookieSession({
  name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  60 * 1000
}))*/

app.use('/', router)

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)
})