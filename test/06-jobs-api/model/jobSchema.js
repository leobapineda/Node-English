const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    postedBy: {
      required: [true, "Must provide author"],
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: String,
      required: [true, "Must provide company"],
    },
    position: {
      type: String,
      required: [true, "Must provide position"],
    },
    interviewStatus: {
      type: String,
      required: [true, "Must provide status"],
      enum: ["Pending", "Declined", "Done"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("Job", jobSchema);
module.exports = userModel;
