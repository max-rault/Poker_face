const express = require('express')
const bodyParser = require('body-parser')
var fs = require('fs');
const router = express.Router()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.route('/users')
.get((req, res) =>{
    console.log("hello world")
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