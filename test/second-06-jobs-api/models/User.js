const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required"],
    lowercase: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      `Please fill valid email address`,
    ],
  },
});

module.exports = mongoose.model("JOBS", jobSchema);