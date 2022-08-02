const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Must provide product Name"],
    maxLength: 30,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Must provide product price"],
    min: [1, "Price must be greater than 1"],
  },
  image: {
    type: String,
    required: [true, "Must provide product image"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
