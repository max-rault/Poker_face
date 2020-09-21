const mongoose = require('mongoose');
const Table = require('../../../model/table')

async function GetTable(id){
    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useUnifiedTopology: true, poolSize: 20 ,useNewUrlParser: true})
    .then(() => console.log("im connected"))
    .catch((err) => console.log("err: ", err))
    let res;
    res = await Table.newTable().findOne({_id: id})
    mongoose.disconnect()
    .then(()=>{"im disconnected"})
    .catch((err) => console.log("err : ", err))
    return res
}

module.exports = {"GetTable": GetTable}