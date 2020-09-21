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
		 //res = await Player.newPlayer().find({}, (err, doc) =>{
			 //console.log("player=",doc);
			res =  Player.newPlayer().find({"Tournament.id": id}, (err, doc) =>{
			if(err){
				console.log(err)
			}
			console.log('doc : ', doc)
			return doc
		})
    await mongoose.disconnect()
    return res
	} catch (error) {
		
	}
}

module.exports = {"GetRank": GetRank}