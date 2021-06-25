const mongoose = require("mongoose");
const {Schema, model} = mongoose;

exports.schema = new Schema({
  username: {type: String, required = true, unique = true}
})

exports.model = model("User", exports.schema);