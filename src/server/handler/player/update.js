const mongoose = require('mongoose');
const Table = require('../../../model/table');
const Player = require('../../../model/player')
const Tornament = require('../../../model/tornament')

async function UpdateTable(data, id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))
	console.log("data : ", data)
	let doc;

	let resTournament;
	resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

	let resTable;
	resTable = await Table.newTable().findOne({_id: data.idTable})
  
  doc = await Player.newPlayer().findOneAndUpdate({_id: id},{$set:{
    firstname: data.firstname,
    lastname: data.lastname,
    gender: data.gender,
    mail: data.mail,
    numberPokerChipsRemaining: data.numberPokerChipsRemaining,
    Tournament: resTournament,
    Table: resTable,
  }}, {new: true}, (err, doc) =>{
    if(err){
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  })
  doc.save()

  mongoose.disconnect()
}

module.exports = {"UpdateTable": UpdateTable}