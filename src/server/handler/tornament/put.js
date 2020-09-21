const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');
require('../../../model/tornament')


async function PutTornament(data){

  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))
  
  var tournament = tornament.newTornament()

  var newTournament = new tournament({
    name: data.name,
    description: data.description,
    startdate: data.startdate,
    enddate: data.enddate,
    maxParticipant: data.maxParticipant,
    priceToWin: data.priceToWin,
    organizer: data.organizer,
    cave: data.cave,
    buyIn: data.buyIn,
    level: data.level,
    type: data.type,
    gameVariant: data.gameVariant,
    status: "none"
  })
  await newTournament.save();
  mongoose.disconnect()
  .then(()=>{"im disconnected"})
  .catch((err) => console.log("err : ", err))
}

module.exports = {"PutTornament": PutTornament}