const mongoose = require('mongoose');
const User = require('../../../model/user')

async function GetUser(id){
	let res;
	try {
		await	mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {
			useUnifiedTopology: true, 
			poolSize: 20 ,
			useNewUrlParser: true
		})
		res = await User.newUser().findOne({_id: id})
		await mongoose.disconnect()
	} catch (error) {
		console.log(error)
	}
    return res
}

module.exports = {"GetUser": GetUser}