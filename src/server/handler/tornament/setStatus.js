const mongoose = require('mongoose');
const tornament = require('../../../model/tornament');
let doc;

async function UpdateTournamentStatus(status, id){
  try {
		await	mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
			useUnifiedTopology: true, 
			poolSize: 20 ,
			useNewUrlParser: true})
		doc = await tornament.newTornament().findOneAndUpdate({_id: id},{$set:{
			status: status
		}}, {new: true}, (err, doc) =>{
			if(err){
				console.log("Something wrong when updating data!");
			}
			return doc
		})
	 await	doc.save()
	
	 await	mongoose.disconnect()
	} catch (error) {
		console.log('err : ', error)
	}
}

module.exports = {"UpdateTournamentStatus": UpdateTournamentStatus}