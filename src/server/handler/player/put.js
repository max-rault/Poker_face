const mongoose = require('mongoose');
const Player = require('../../../model/player') 
const Table = require('../../../model/table');
const Tornament = require('../../../model/tornament')

async function PutPlayer(data){
  let resTournament;
  let resTable;
  let docTournament;

  try {
    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  
    resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

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
      newPlayer.save();
    
    	docTournament = await Tornament.newTornament().findOneAndUpdate({_id: data.idTournament},{$set:{
        Player: newPlayer
      }}, {new: true}, (err, doc) =>{
        if(err){
          console.log("Something wrong when updating data!");
        }
        return doc
      })
     await	docTournament.save()
    
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {"PutPlayer": PutPlayer}