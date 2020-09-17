const mongoose = require('mongoose');

function newTornament(){
    delete mongoose.connection.models['Tournament'];
    const tornamentScheme = mongoose.Schema({
        name: String,
        description: String,
        startdate: Date,
        enddate: Date,
        maxParticipant: Number,
        priceToWin: String,
        organizer: String,
        cave: Number,
        buyIn: Number,
    })

    const Tornament = mongoose.model('Tournament', tornamentScheme)
    return Tornament
}

module.exports = {"newTornament" : newTornament}