const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function GetPlayer(id){
   await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
    .then(() => console.log("im connected"))
    .catch((err) => console.log("err: ", err))
    let res;
    res = await Player.newPlayer().findOne({_id: id})
    await mongoose.disconnect()
    .then(()=>{"im disconnected"})
    .catch((err) => console.log("err : ", err))
    return res
}

module.exports = {"GetPlayer": GetPlayer}