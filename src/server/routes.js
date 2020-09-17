const express = require('express')
const tornamentPutHandler = require('./handler/tornament/put')
const tornamentListHandler = require('./handler/tornament/list')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

router.route('/')
.get((req, res) =>{
  /*if(req.session.name){
    res.send(res.render("mixins/index"));
}
else{
    req.session.name = 'Webtutorials.ME';
    res.send();
}*/
res.send(res.render("mixins/index"));
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