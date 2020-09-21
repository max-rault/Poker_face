const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function ListPlayer(){
   await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
   .then(() => console.log("im connected"))
   .catch((err) => console.log("err : ",err))

   var res = await Player.newPlayer().find({})

   await mongoose.disconnect()
   .then(()=>{"im disconnected"})
   .catch((err) => console.log("err : ", err))
   return res
}

module.exports = {"ListPlayer": ListPlayer}
