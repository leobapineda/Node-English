const moongose = require("mongoose");
const { Schema } = moongose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = moongose.model("tasks", taskSchema);
