const mongoose = require('mongoose');

function newUser(){
    delete mongoose.connection.models['Users'];
    const userScheme = mongoose.Schema({
      firstname: String,
      lastname: String,
      gender: String,
      mail: String,
      userName: String,
      pwd: String,
      type: String,
    })

    const User = mongoose.model('Users', userScheme)
    return User
}

module.exports = {"newUser" : newUser}