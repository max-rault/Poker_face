const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');
require('../../../model/tornament')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
.then(() => console.log("i'm connected"))
.catch((err) => console.error("db connection  err: ", err))

async function UpdateTournament(data, id){
	let doc;
	doc = await tornament.newTornament().findOne({_id: id})

	doc.overwrite({
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
	})
  doc.save();
  mongoose.disconnect()
}

module.exports = {"UpdateTournament": UpdateTournament}