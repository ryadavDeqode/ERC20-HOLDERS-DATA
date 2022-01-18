const mongoose = require('mongoose');

const holderSchema = new mongoose.Schema({
    address:String,
    value:String
})

const Holder = mongoose.model('HOLDER',holderSchema);

module.exports = Holder;