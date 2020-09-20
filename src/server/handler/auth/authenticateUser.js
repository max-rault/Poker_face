const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUserData(userName, pwd){

    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
    .then(() => console.log("i'm connected"))
    .catch((err) => console.error("db connection  err: ", err))

    var res = await User.newUser().findOne({userName: userName, pwd: pwd})
    mongoose.disconnect()
    return res
}

module.exports = {"GetUserData": GetUserData}