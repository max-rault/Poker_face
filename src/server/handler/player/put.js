const mongoose = require('mongoose');
const Player = require('../../../model/player') 
const Table = require('../../../model/table');
const Tornament = require('../../../model/tornament')

async function PutPlayer(data){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

  let resTournament;
	resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

	let resTable;
	resTable = await Table.newTable().findOne({_id: data.idTable})

  var player = Player.newPlayer()

  var newPlayer = new player({
    firstname: data.firstname,
    lastname: data.lastname,
    gender: data.gender,
    mail: data.mail,
    numberPokerChipsRemaining: data.numberPokerChipsRemaining,
    Table: resTable,
    Tournament: resTournament,
  })
  const res = await newPlayer.save();
  mongoose.disconnect()
}

module.exports = {"PutPlayer": PutPlayer}