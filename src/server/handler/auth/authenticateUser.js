const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUserData(userName, pwd){

    await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 , useNewUrlParser: true})
    .then(() => console.log("i'm connected"))
    .catch((err) => console.error("db connection  err: ", err))

    var res = await User.newUser().findOne({userName: userName, pwd: pwd})
    await mongoose.disconnect()
    .then(()=>{"im disconnected"})
    .catch((err) => console.log("err : ", err))
    return res
}

module.exports = {"GetUserData": GetUserData}