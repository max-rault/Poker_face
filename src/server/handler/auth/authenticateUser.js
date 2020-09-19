const mongoose = require('mongoose');
const User = require('../../../model/user')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
.then(() => console.log("i'm connected"))
.catch((err) => console.error("db connection  err: ", err))

async function GetUserData(userName, pwd){
    var res = await User.newUser().findOne({userName: userName, pwd: pwd})
    return res
}

module.exports = {"GetUserData": GetUserData}