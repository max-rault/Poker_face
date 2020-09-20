const mongoose = require('mongoose');
const Table = require('../../../model/table')

async function ListTables(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
   .then(() => console.log("im connected"))
   .catch((err) => console.log("err : ",err))

   var res = await Table.newTable().find({})

   mongoose.disconnect()
   return res
}

module.exports = {"ListTables": ListTables}
