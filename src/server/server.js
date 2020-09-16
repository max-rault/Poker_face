const express = require('express')
const router = require('./routes')
const app = express()
var path = require('path');
const port = 3000

app.set('view engine', 'pug')
app.set('views', __dirname + '/src/views')
app.use('/static', express.static(path.join(__dirname, '/src/assets/icons')))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})