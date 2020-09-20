const mongoose = require('mongoose');
const User = require('../../../model/user');
require('../../../model/tornament')


async function PutUser(data){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))
  var user = User.newUser()

  var newUser = new user({
    firstname: data.firstname,
    lastname: data.lastname,
    gender: data.gender,
    mail: data.mail,
    userName: data.userName,
    pwd: data.pwd,
    type: data.type,
  })
  const res = await newUser.save();
  mongoose.disconnect()
}

module.exports = {"PutUser": PutUser}