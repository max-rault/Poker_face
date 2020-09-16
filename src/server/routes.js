const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs');
const router = express.Router()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.route('/')
.get((req, res) =>{
  // Update views
	req.session.views = (req.session.views || 0) + 1
	
  // Write response
  res.end(req.session.views + ' views')
  res.render("mixins/index")
})

router.route('/users')
.get((req, res) =>{

})
.post((req, res) =>{
    console.log(req)
})

router.route('/users/:id')
.get((req, res) =>{
    
})
.post((req, res) =>{
    
})

module.exports = router