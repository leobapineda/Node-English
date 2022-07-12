const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
  },
  email: {
    type: String,
    required: [true, "Must provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "must provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide password"],
  },
});

module.exports = mongoose.model("User", userSchema);
