const mongoose = require('mongoose');

function userModel(){
    delete mongoose.connection.models['Users'];
    const userScheme = mongoose.Schema({
      firstname: String,
      lastname: String,
      gender: String,
      mail: String,
      userName: String,
      pwd: String
    })

    const Users = mongoose.model('Users', userScheme)
    return Users
}

module.exports = {"userModel" : userModel}