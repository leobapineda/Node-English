const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "JOBS",
    required: [true, "Author is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
  },
  currentStatus: {
    type: String,
    required: [true, "Position is required"],
    enum: ["pendgins", "in proccess", "over"],
    default: "pendgins",
  },
});

module.exports = mongoose.model("JOBS", blogSchema);
