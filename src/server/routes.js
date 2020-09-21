const express = require('express')
const convert = require('../lib/convertDate')
const bodyParser = require('body-parser')
const router = express.Router()

const tornamentPutHandler = require('./handler/tornament/put')
const tornamentListHandler = require('./handler/tornament/list')
const tornamentGetHandler = require('./handler/tornament/get')
const tornamentUpdateHandler = require('./handler/tornament/update')
const tornamentDeleteHandler = require('./handler/tornament/delete')
const tornamentStatusHandler = require('./handler/tornament/setStatus')
const tornamentRankListHandler = require('./handler/tornament/listTournamentRank')

const usersListHandler = require('./handler/users/list')
const usersPutHandler = require('./handler/users/put')
const userDataHandler = require('./handler/auth/authenticateUser')
const GetUserHandler = require('./handler/users/get')
const UpdateUserHandler = require('./handler/users/update')
const deleteUserHandler = require('./handler/users/delete')

const getUsersTableHandler = require('./handler/table/getUsersTable')
const PutTableHandler = require('./handler/table/put')
const ListTableHandler = require('./handler/table/list')
const GetTableHandler = require('./handler/table/get')
const UpdateTableHandler = require('./handler/table/update')
const DeleteTableHandler = require('./handler/table/delete')

const PutPlayerHandler = require('./handler/player/put')
const ListPlayerHandler = require('./handler/player/list')
const GetPlayerHandler = require('./handler/player/get')
const UpdatePlayerHandler = require('./handler/player/update')
const DeletePlayerHandler = require('./handler/player/delete')

const GetRankHandler = require('./handler/ranking/get')


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
.get(async(req, res) =>{
  if (req.session.loggedin) {
    let tournaments;
    tournaments = await tornamentListHandler.ListTornament()
		res.send(res.render("mixins/index", {tournaments: tournaments}));
	} else {
		res.redirect('/auth')
	}
})

router.route('/home/begin/:id')
.get(async(req, res) =>{
  await tornamentStatusHandler.UpdateTournamentStatus('En cours', req.params.id)
  res.redirect('/home')
})

router.route('/home/begin/:id')
.get(async(req, res) =>{
  await tornamentStatusHandler.UpdateTournamentStatus('Terminée', req.params.id)
  res.redirect('/home')
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
    tournament = await tornamentGetHandler.GetTornament(id)

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
.get((req, res) =>{
    tornamentDeleteHandler.DeleteTournament(req.params.id)
    res.redirect('/tournament')
})

//User routes

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

router.route('/users/show/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    let user;
    user = await GetUserHandler.GetUser(id)

  res.render('mixins/user/show', {
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      mail: user.mail,
      userName: user.userName,
      type: user.type,
  })
})

router.route('/users/edit/:id')
.get(async (req, res) =>{
    let user;
    let id;
    id = req.params.id
    user = await GetUserHandler.GetUser(id)
   
  res.render('mixins/user/edit', {
    url: `/users/edit/${req.params.id}`,
    firstname: user.firstname,
    lastname: user.lastname,
    gender: user.gender,
    mail: user.mail,
    userName: user.userName,
    type: user.type,
  })
})
.post((req, res) =>{
  UpdateUserHandler.UpdateUser(req.body, req.params.id)
  res.redirect('/users')
})

router.route('/users/delete/:id')
.get((req, res) =>{
  deleteUserHandler.DeleteUser(req.params.id)
    res.redirect('/users')
})

// Player routes

router.route('/players/new')
.get(async (req, res) =>{
  let tournaments;
  let tables;

  tournaments = await tornamentListHandler.ListTornament()
  tables = await ListTableHandler.ListTables()
    res.render('mixins/player/new', {
      tournaments: tournaments,
      tables: tables
    })
})
.post(async (req, res) =>{
  await PutPlayerHandler.PutPlayer(req.body)
  res.redirect('/players')
})

router.route('/players')
.get(async (req, res) =>{
    let players;
    players = await ListPlayerHandler.ListPlayer()
    console.log(players)

  res.render('mixins/player/list', {players: players})
})
.post((req, res) =>{
})

router.route('/players/show/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    let player;
    player = await GetPlayerHandler.GetPlayer(id)

  res.render('mixins/player/show', {
    player: player
  })
})

router.route('/players/edit/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    player = await GetPlayerHandler.GetPlayer(id)

    let tournaments;
    let tables;

    tournaments = await tornamentListHandler.ListTornament()
    tables = await ListTableHandler.ListTables()
   
  res.render('mixins/player/edit', {
    url: `/players/edit/${req.params.id}`,
    tables: tables,
    tournaments: tournaments,
    player: player
  })
})
.post(async(req, res) =>{
  await UpdatePlayerHandler.UpdatePlayer(req.body, req.params.id)
  res.redirect('/players')
})

router.route('/players/delete/:id')
.get((req, res) =>{
  DeletePlayerHandler.DeletePlayer(req.params.id)
    res.redirect('/players')
})

//Tables routes
router.route('/tables/new')
.get(async (req, res) =>{
    let tournaments;
    let users;

    tournaments = await tornamentListHandler.ListTornament()
    users = await getUsersTableHandler.GetUsersTable()
    res.render('mixins/table/new', {
      tournaments: tournaments,
      users: users
    })
})
.post((req, res) =>{
  res.redirect('/tables')
  PutTableHandler.PutTable(req.body)
})

router.route('/tables')
.get(async (req, res) =>{
    let tables;
    tables = await ListTableHandler.ListTables()
    console.log(tables)
  res.render('mixins/table/list', {tables: tables})
})
.post((req, res) =>{
})

router.route('/tables/show/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    let user;
    user = await GetUserHandler.GetUser(id)

  res.render('mixins/table/show', {
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      mail: user.mail,
      userName: user.userName,
      type: user.type,
  })
})

router.route('/tables/edit/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    table = await GetTableHandler.GetTable(id)

    let tournaments;
    let users;

    tournaments = await tornamentListHandler.ListTornament()
    users = await getUsersTableHandler.GetUsersTable()
   
  res.render('mixins/table/edit', {
    url: `/tables/edit/${req.params.id}`,
    tournaments: tournaments,
    users: users,
    table: table
  })
})
.post((req, res) =>{
  UpdateTableHandler.UpdateTable(req.body, req.params.id)
  res.redirect('/tables')
})

router.route('/tables/delete/:id')
.get((req, res) =>{
  DeleteTableHandler.DeleteTable(req.params.id)
    res.redirect('/tables')
})

//rank

router.route('/ranks/new')
.get(async (req, res) =>{
    let tournaments;
    let users;

    tournaments = await tornamentListHandler.ListTornament()
    users = await getUsersTableHandler.GetUsersTable()
    res.render('mixins/rank/new', {
      tournaments: tournaments,
      users: users
    })
})
.post((req, res) =>{
  res.redirect('/ranks')
  PutTableHandler.PutTable(req.body)
})

router.route('/ranks')
.get(async (req, res) =>{
    let ranks;
    ranks = await tornamentRankListHandler.ListTornamentRank()
    res.render('mixins/rank/list', {ranks: ranks})
})
.post((req, res) =>{
})

router.route('/ranks/show/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    let ranks;
    ranks = await GetRankHandler.GetRank(id)
    console.log(ranks)
  res.render('mixins/rank/show', {
     ranks: ranks
  })
})

router.route('/ranks/edit/:id')
.get(async (req, res) =>{
    let id;
    id = req.params.id
    player = await GetTableHandler.GetTable(id)

  res.render('mixins/rank/edit', {
    url: `/ranks/edit/${req.params.id}`,
    players: players
  })
})
.post((req, res) =>{
  UpdateTableHandler.UpdateTable(req.body, req.params.id)
  res.redirect('/ranks')
})

router.route('/ranks/delete/:id')
.get((req, res) =>{
  DeleteTableHandler.DeleteTable(req.params.id)
    res.redirect('/ranks')
})
module.exports = router