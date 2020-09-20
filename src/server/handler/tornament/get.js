const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')

async function GetTornament(id){
    mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true})
    .then(() => console.log("im connected"))
    .catch((err) => console.log("err: ", err))
    let res;
    res = await Tornament.newTornament().findOne({_id: id})
    mongoose.disconnect()
    return res
}

module.exports = {"GetTornament": GetTornament}