const mongoose = require('mongoose');
const Tornament = require('../../../model/tornament')
mongoose.connect('mongodb://localhost/mortal_kombat_tornament', {useNewUrlParser: true});

function GetTornament(id){
    const db = mongoose.connection;
    let res;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        Tornament.newTornament().find({_id: id},(err, tornament) =>{
            if(err) return console.error("list tornament err : ", err)
            res = tornament
            return res;
        })
    });
}

module.exports = {"GetTornament": GetTornament}