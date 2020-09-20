const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')
mongoose.connect('mongodb://localhost:27017/mortal_kombat_tornament', {useNewUrlParser: true});

async function GetTornament(id){
    let res;
    res = await Tornament.newTornament().findOne({_id: id})
    return res
}

module.exports = {"GetTornament": GetTornament}