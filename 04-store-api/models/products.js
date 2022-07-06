const moongose = require("mongoose");
const { Schema } = moongose;

const productSchema = new Schema({
  name: {
    type: String,
    require: [true, "must provide name"],
  },
  price: {
    type: Number,
    require: [true, "must provide price"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  cretedAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    // enum:["ikea", "liddy", "caressa", "marcos"]
    values: ["ikea", "liddy", "caressa", "marcos"],
    message: " {VALUE} is not a valid option",
  },
});

const productModel = moongose.model("Product", productSchema);

module.exports = productModel;
