const Product = require("../models/products");

const getAllProductsStatic = async (req, res, next) => {
  // testing
  const searchText = "k"
  const products = await Product.find({ name: { $regex: searchText /*the value we search in company name*/, $options: 'i' /*flag, in this case, means not sensitive*/} });
  // const products = await Product.find({ });
  res.status(200).json({ hits: products.length, products });




};

const getAllProducts = async (req, res) => {
  const { featured, company, name, order } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ hits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
