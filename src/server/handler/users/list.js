const mongoose = require('mongoose');
const User = require('../../../model/user')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true});

async function ListUsers(){
   var res = await User.newUser().find({})
   return res
}

module.exports = {"ListUsers": ListUsers}
