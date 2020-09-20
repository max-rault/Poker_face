const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');

async function DeleteTournament(id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

	let doc;
  
  doc = await tornament.newTornament().findOneAndDelete({_id: id}, (err, doc) =>{
    if(err){
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  })
  doc.save()

  mongoose.disconnect()
}

module.exports = {"DeleteTournament": DeleteTournament}