const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user: String, // String is shorthand for {type: String}
  pass: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", userSchema);
