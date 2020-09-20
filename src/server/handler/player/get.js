const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function GetPlayer(id){
    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
    .then(() => console.log("im connected"))
    .catch((err) => console.log("err: ", err))
    let res;
    res = await Player.newPlayer().findOne({_id: id})
    mongoose.disconnect()
    return res
}

module.exports = {"GetPlayer": GetPlayer}