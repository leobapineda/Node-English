const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema({
  company: {
    type:String,
    require: [true, "must provide company"],
    maxLength: 50
  }, 
  position: {
    type:String,
    require: [true, "must provide position"],
    maxLength: 50
  }, 
  status: {
    type:String,
    require: [true, "must provide position"],
    enum:["interview", "declined", "pending"]
  }
});

module.exports = mongoose.model("Job", jobSchema);
