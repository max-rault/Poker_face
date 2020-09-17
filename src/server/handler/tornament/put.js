const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');
require('../../../model/tornament')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
.then(() => console.log("i'm connected"))
.catch((err) => console.error("db connection  err: ", err))

async function PutTornament(data){
  console.log("data : ", data.name)
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
  })
  const res = await newTournament.save();
  console.log("res : ", res)
  mongoose.disconnect()
}

module.exports = {"PutTornament": PutTornament}