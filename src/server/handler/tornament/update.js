const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');

async function UpdateTournament(data, id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

	let doc;
  
  doc = await tornament.newTornament().findOneAndUpdate({_id: id},{$set:{
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
  }}, {new: true}, (err, doc) =>{
    if(err){
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  })
  doc.save()

  mongoose.disconnect()
  .then(()=>{"im disconnected"})
  .catch((err) => console.log("err : ", err))
}

module.exports = {"UpdateTournament": UpdateTournament}