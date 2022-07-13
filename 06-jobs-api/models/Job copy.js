const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "must provide company"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "must provide position"],
      maxLength: 50,
    },
    status: {
      type: String,
      required: [true, "must provide position"],
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "must provide user"],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
