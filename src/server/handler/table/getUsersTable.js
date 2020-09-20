const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUsersTable(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(()=> console.log('im connected'))
  .catch((err) => console.log("error : ", err))

   var res = await User.newUser().find({type: "Croupier"})

   mongoose.disconnect()
   return res
}

module.exports = {"GetUsersTable": GetUsersTable}