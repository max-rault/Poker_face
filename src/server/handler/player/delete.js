const mongoose = require('mongoose');
const player = require('../../../model/player');

async function DeletePlayer(id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

	let doc;
  
  doc = await player.newPlayer().findOneAndDelete({_id: id}, (err, doc) =>{
    if(err){
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  })
  doc.save()

  mongoose.disconnect()
}

module.exports = {"DeletePlayer": DeletePlayer}