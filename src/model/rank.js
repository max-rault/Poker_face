const mongoose = require('mongoose');

function newRank(){
    delete mongoose.connection.models['Rank'];
    const rankScheme = mongoose.Schema({
        score: Number,
        Tournament: Array,
        idPlayer: Array,
    })

    const player = mongoose.model('Rank', rankScheme)
    return player
}

module.exports = {"newRank" : newRank}