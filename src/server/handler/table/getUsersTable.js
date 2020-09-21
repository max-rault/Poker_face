const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUsersTable(){
  await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})

   var res = await User.newUser().find({type: "Croupier"})

   await mongoose.disconnect()
   return res
}

module.exports = {"GetUsersTable": GetUsersTable}