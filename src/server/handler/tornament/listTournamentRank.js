const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')

async function ListTornamentRank(){
	try {
		await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
			useUnifiedTopology: true, 
			poolSize: 20 ,
			useNewUrlParser: true
		})

		var res = await Tornament.newTornament().find({$or: [{status: 'En cours'}, {status: 'Terminée'}]})
		await mongoose.disconnect()
		return res
	} catch (error) {
		console.log(error)
	}
}

module.exports = {"ListTornamentRank": ListTornamentRank}
