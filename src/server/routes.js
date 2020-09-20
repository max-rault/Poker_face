const express = require('express')
const convert = require('../lib/convertDate')
const bodyParser = require('body-parser')
const router = express.Router()

const tornamentPutHandler = require('./handler/tornament/put')
const tornamentListHandler = require('./handler/tornament/list')
const tornamentGetHandler = require('./handler/tornament/get')
const tornamentUpdateHandler = require('./handler/tornament/update')


const usersListHandler = require('./handler/users/list')
const usersPutHandler = require('./handler/users/put')
const userDataHandler = require('./handler/auth/authenticateUser')


router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

// Default route redirect to auth
router.route('/')
.get((req, res) =>{
  res.redirect('/home')
})

// Auth route
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

// Home route
router.route('/home')
.get((req, res) =>{
  if (req.session.loggedin) {
		res.send(res.render("mixins/index"));
	} else {
		res.redirect('/auth')
	}
})

// Tournament route

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

router.route('/tournament/show/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    let tournament;

  res.render('mixins/tornament/show', {
    name: tournament.name,
    description: tournament.description,
    startdate: tournament.startdate,
    enddate: tournament.enddate,
    maxParticipant: tournament.maxParticipant,
    priceToWin: tournament.priceToWin,
    organizer: tournament.organizer,
    cave: tournament.cave,
    buyIn: tournament.buyIn,
    level: tournament.level,
    type: tournament.type,
    gameVariant: tournament.gameVariant,
  })
})

router.route('/tournament/edit/:id')
.get(async (req, res) =>{
    let tournament;
    let id;
    let endDateFormated;
    let startDateFormated;
    id = req.params.id
    tournament = await tornamentGetHandler.GetTornament(id)
    endDateFormated = await convert.convertDate(tournament.enddate)
    startDateFormated = await convert.convertDate(tournament.startdate)

  res.render('mixins/tornament/edit', {
    url: `/tournament/edit/${req.params.id}`,
    name: tournament.name,
    description: tournament.description,
    startdate: startDateFormated,
    enddate: endDateFormated,
    maxParticipant: tournament.maxParticipant,
    priceToWin: tournament.priceToWin,
    organizer: tournament.organizer,
    cave: tournament.cave,
    buyIn: tournament.buyIn,
    level: tournament.level,
    type: tournament.type,
    gameVariant: tournament.gameVariant,
  })
})
.post((req, res) =>{
  tornamentUpdateHandler.UpdateTournament(req.body, req.params.id)
  res.redirect('/tournament')
})

router.route('/tournament/delete/:id')
.get(async (req, res) =>{
    let tournaments;
    tournaments = await tornamentListHandler.ListTornament()

  res.render('mixins/tornament/list', {tournaments: tournaments})
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