const express = require('express')
const tornamentPutHandler = require('./handler/tornament/put')
const tornamentListHandler = require('./handler/tornament/list')
const usersListHandler = require('./handler/users/list')
const usersPutHandler = require('./handler/users/put')
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
    let results;
    results = await userDataHandler.GetUserData(username, password)
    if (results.userName === username && results.pwd === password || username === 'admin' && password === 'admin') {
      req.session.loggedin = true;
      req.session.username = username;
      res.status(201)
      res.redirect('/home');
    } else {
      res.status(401)
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
  tornamentPutHandler.PutTornament(req.body)
  res.redirect('/tournament')

})

router.route('/tournament')
.get(async (req, res) =>{
    let tournaments;
    tournaments = await tornamentListHandler.ListTornament()

  res.render('mixins/tornament/list', {tournaments: tournaments})
})
.post((req, res) =>{
})

router.route('/users/new')
.get((req, res) =>{
    res.render('mixins/user/new')
})
.post((req, res) =>{
  res.redirect('/users')
  usersPutHandler.PutUser(req.body)
})

router.route('/users')
.get(async (req, res) =>{
    let users;
    users = await usersListHandler.ListUsers()

  res.render('mixins/user/list', {users: users})
})
.post((req, res) =>{
})

module.exports = router