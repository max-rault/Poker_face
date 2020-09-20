const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUser(id){
    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
    .then(() => console.log("im  connected"))
    .catch((err) => console.log("err : ", err))
    let res;
    res = await User.newUser().findOne({_id: id})
    mongoose.disconnect()
    return res
}

module.exports = {"GetUser": GetUser}