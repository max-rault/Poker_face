const mongoose = require('mongoose');
const userModel = require('../../../model/user')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true});
async function GetUserData(userName, pwd){
    console.log("userName: ", userName)
    console.log("pwd: ", pwd)
    let res = await userModel.userModel().find({userName: userName, pwd: pwd})

    return res
}

module.exports = {"GetUserData": GetUserData}