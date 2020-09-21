const mongoose = require('mongoose');
const Player = require('../../../model/player')

async function GetRank(id){
	let res;
  try {
		await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
			useUnifiedTopology: true, 
			poolSize: 20 ,
			useNewUrlParser: true
		 })
		res = await Player.newPlayer().find({}).populate({
			path:'Tournament',
			match: {_id: id}
		})
    await mongoose.disconnect()
    return res
	} catch (error) {
		
	}
}

module.exports = {"GetRank": GetRank}