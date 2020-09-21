const mongoose = require('mongoose');
const Table = require('../../../model/table');
const User = require('../../../model/user')
const Tornament = require('../../../model/tornament')

async function UpdateTable(data, id){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))
	console.log("data : ", data)
	let doc;

	let resTournament;
	resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

	let resUser;
	resUser = await User.newUser().findOne({_id: data.idUser})
  
  doc = await Table.newTable().findOneAndUpdate({_id: id},{$set:{
    name: data.name,
    Tournament: resTournament,
    User: resUser,
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

module.exports = {"UpdateTable": UpdateTable}