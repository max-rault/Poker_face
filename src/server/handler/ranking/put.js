const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function UpdatePlayerRank(data){

  let doc;
  try {
    await  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
      useUnifiedTopology: true, 
      poolSize: 20 ,
      useNewUrlParser: true
    })  
    doc = await Player.newPlayer().findOneAndUpdate({_id: data.idPlayer},{$set:{
        status: data.status,
        Range: data.Range,
        Score: data.Score,
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

module.exports = {"UpdatePlayerRank": UpdatePlayerRank}