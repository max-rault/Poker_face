const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function ListPlayer(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
   .then(() => console.log("im connected"))
   .catch((err) => console.log("err : ",err))

   var res = await Player.newPlayer().find({})

   mongoose.disconnect()
   return res
}

module.exports = {"ListPlayer": ListPlayer}
