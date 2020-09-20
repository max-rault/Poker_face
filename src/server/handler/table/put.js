const mongoose = require('mongoose');
const Table = require('../../../model/table');
const User = require('../../../model/user')
const Tornament = require('../../../model/tornament')

async function PutTable(data){
  mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
  .then(() => console.log("i'm connected"))
  .catch((err) => console.error("db connection  err: ", err))

  let resTournament;
	resTournament = await Tornament.newTornament().findOne({_id: data.idTournament})

	let resUser;
	resUser = await User.newUser().findOne({_id: data.idUser})

  var table = Table.newTable()

  var newTable = new table({
    name: data.name,
    Tournament: resTournament,
    User: resUser,
  })
  const res = await newTable.save();
  mongoose.disconnect()
}

module.exports = {"PutTable": PutTable}