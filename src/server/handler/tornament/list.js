const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')

async function ListTornament(){
  await mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
   
   var res = await Tornament.newTornament().find({})

  await mongoose.disconnect()
   return res
}

module.exports = {"ListTornament": ListTornament}
