const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  //   _id: { type: String },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = model("User", schema);
