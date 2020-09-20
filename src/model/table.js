const mongoose = require('mongoose');

function newTable(){
    delete mongoose.connection.models['Table'];
    const tableScheme = mongoose.Schema({
        name: String,
        Tournament: Object,
        User: Object,
        Player: Array,
    })

    const Table = mongoose.model('Table', tableScheme)
    return Table
}

module.exports = {"newTable" : newTable}