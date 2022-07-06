const Product = require("../models/products");

const getAllProductsStatic = async (req, res, next) => {
  // testing
  const products = await Product.find({company: "caressa"});
  res.status(200).json({ hits:products.length , products});
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "getAllProducts" });
};

module.exports = { getAllProductsStatic, getAllProducts };
