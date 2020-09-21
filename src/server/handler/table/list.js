const mongoose = require('mongoose');
const Table = require('../../../model/table')

async function ListTables(){
   mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
   .then(() => console.log("im connected"))
   .catch((err) => console.log("err : ",err))

   var res = await Table.newTable().find({})

   mongoose.disconnect()
   .then(()=>{"im disconnected"})
   .catch((err) => console.log("err : ", err))
   return res
}

module.exports = {"ListTables": ListTables}
