const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Must provide name"],
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Must provide name"],
    maxLength: 30,
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
