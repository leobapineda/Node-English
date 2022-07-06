import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  price: Number,
  company: String,
});

const Blog = mongoose.model('Products', productSchema);