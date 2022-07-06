const getAllProductsStatic = async (req, res, next) => {
  // throw new Error
  res.sttus(200).json({ msg: "getAllProductsStatic" });
  throw new Error();
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "getAllProducts" });
};

module.exports = { getAllProductsStatic, getAllProducts };
