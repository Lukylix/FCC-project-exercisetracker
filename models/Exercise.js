const mongoose = require("mongoose");
const { Schema, model } = mongoose;

exports.schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now() },
});

exports.model = model("Exercise", exports.schema);
