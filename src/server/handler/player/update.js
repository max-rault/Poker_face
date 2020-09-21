const mongoose = require('mongoose');
const Table = require('../../../model/table');
const Player = require('../../../model/player')
const Tornament = require('../../../model/tornament')

async function UpdatePlayer(data, id){

  let doc;
  let resTournament;
  let resTable;

  try {
    await  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
      useUnifiedTopology: true, 
      poolSize: 20 ,
      useNewUrlParser: true
    })
    resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

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
      console.log("Something wrong when updating data: ", err);
    }
    return doc;
  })
  console.log("doc : ", doc)
   await doc.save()
   await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {"UpdatePlayer": UpdatePlayer}