require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const ProducSchema = require("../models/Product");

const createProduct = async (req, res) => {
  const Product = await ProducSchema.create({...req.body});
  res.status(StatusCodes.CREATED).json(Product);
};

const getAllProducts = async (req, res) => {
  const Product = await ProducSchema.find({});
  res.status(StatusCodes.OK).json({ Products: Product.length, Product });
};

const deleteAllProducts = async (req, res) => {
  await ProducSchema.deleteMany()
  res.status(StatusCodes.OK).json({ msg: "ALL PRODUCTS DELETED"});
};

module.exports = { createProduct, getAllProducts, deleteAllProducts };
