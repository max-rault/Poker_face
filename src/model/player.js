const mongoose = require('mongoose');

function newPlayer(){
    delete mongoose.connection.models['Player'];
    const playerScheme = mongoose.Schema({
        firstname: String,
        lastname: String,
        gender: String,
        mail: String,
        numberPokerChipsRemaining: Number,
        status: String,
        Table: Object,
        Tournament: Object,
    })

    const player = mongoose.model('Player', playerScheme)
    return player
}

module.exports = {"newPlayer" : newPlayer}