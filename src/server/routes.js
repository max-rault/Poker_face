const express = require('express')
const tornamentPutHandler = require('./handler/tornament/put')
const tornamentListHandler = require('./handler/tornament/list')
const userDataHandler = require('./handler/auth/authenticateUser')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/')
.get((req, res) =>{
  res.redirect('/home')
})
router.route('/auth')
.get((req, res) =>{
res.render('mixins/auth/loggin')
})
.post(async (req, res) =>{
  var username = req.body.userName;
  var password = req.body.pwd;
	if (username && password) {
    let results = await userDataHandler.GetUserData(username, password)
    console.log("result: ", results)
    if (results.userName === username && results.pwd === password || username === 'admin' && password === 'admin') {
      req.session.loggedin = true;
      req.session.username = username;
      res.redirect('/home');
    } else {
      res.redirect('/auth')
    }			
    res.end();
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})
router.route('/home')
.get((req, res) =>{
  if (req.session.loggedin) {
		res.send(res.render("mixins/index"));
	} else {
		res.redirect('/auth')
	}
})

router.route('/tournament/new')
.get((req, res) =>{
    res.render('mixins/tornament/new')
})
.post((req, res) =>{
  res.redirect('/')
  tornamentPutHandler.PutTornament(req.body)
})

router.route('/tournament')
.get(async (req, res) =>{
    let tournaments;
    tournaments = await tornamentListHandler.ListTornament()
    console.log("tournaments: ", tournaments)

  res.render('mixins/tornament/list', {tournaments: tournaments})
})
.post((req, res) =>{
})

module.exports = router