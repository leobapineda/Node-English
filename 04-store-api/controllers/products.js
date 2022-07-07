const Product = require("../models/products");

const getAllProductsStatic = async (req, res, next) => {
  // testing
  const searchText = "k";
  const products = await Product.find({
    name: {
      $regex: searchText /*the value we search in company name*/,
      $options: "i" /*flag, in this case, means not sensitive*/,
    },
  });
  // const products = await Product.find({ });
  res.status(200).json({ hits: products.length, products });
};

// ------------>>>>>>>>>>>> getAllProducts
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, field, maxPrice, minPrice } =
    req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // filter: between min and max values
  if (maxPrice && minPrice) {
    queryObject.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  } else if (maxPrice) {
    queryObject.price = { $lte: Number(maxPrice) };
  } else if (minPrice) {
    queryObject.price = { $gte: Number(minPrice) };
  }

  let sortValue;
  if (sort) {
    sortValue = sort.split(",").join(" ");
  } else {
    sortValue = "price";
  }
  let fieldValue;
  if (field) {
    fieldValue = field.split(",").join(" ");
  }

  let limit = Number(req.query.limit) || 7;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject)
    .sort(sortValue)
    .select(fieldValue);
  // .limit(limit)
  // .skip(skip);

  console.log(queryObject);
  res.status(200).json({ hits: products.length, products });
};

module.exports = { getAllProductsStatic, getAllProducts };
