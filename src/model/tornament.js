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
        level: String,
        type: String,
        gameVariant: String,
        ParticipantsId: String,
    })

    const Tournament = mongoose.model('Tournament', tornamentScheme)
    return Tournament
}

module.exports = {"newTornament" : newTornament}