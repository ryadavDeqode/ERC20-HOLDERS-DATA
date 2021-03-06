const mongoose = require("mongoose");

const holderSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true, dropDups: true },
  value: String,
});

const Holder = mongoose.model("HOLDER", holderSchema);

module.exports = Holder;
