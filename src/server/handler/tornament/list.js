const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true});

async function ListTornament(){
   var res = await Tornament.newTornament().find({})
   console.log("list: ", res)
   return res
}

module.exports = {"ListTornament": ListTornament}
