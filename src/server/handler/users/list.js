const mongoose = require('mongoose');
const User = require('../../../model/user')

async function ListUsers(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
   .then(() => console.log("im connected"))
   .catch((err) => console.log("err : ",err))

   var res = await User.newUser().find({})

   mongoose.disconnect()
   return res
}

module.exports = {"ListUsers": ListUsers}
