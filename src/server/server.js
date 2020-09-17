const express = require('express')
var cookieSession = require('cookie-session')
const router = require('./routes')
const app = express()
var path = require('path');
const port = 3000

app.set('view engine', 'pug')
app.set('views','./src/views')
app.use('/static', express.static(path.join(__dirname, '//src///assets//icons')))

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