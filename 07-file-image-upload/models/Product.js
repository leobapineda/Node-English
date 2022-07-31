const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProducSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Must provide a Name"],
    maxlength: 30,
  },
  price: {
    type: Number,
    required: [true, "Must provide a Price"],
    min: [1, "Price can not be 0 or negative"],
  },
  image: {
    // data: Buffer, 
    // contentType: String,
    type: String,
    required: [true, "Must provide an image"],
  },
});

module.exports = mongoose.model("Product", ProducSchema)