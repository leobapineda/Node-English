const mongoose = require("mongoose");
const { Schema } = mongoose;
// do stuff
const bcrypt = require("bcryptjs");

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

// Or, assign a function to the "methods" object of our animalSchema
userSchema.methods.findName = function() {
  return this.name;
};

// pre
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.hashPassword = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
