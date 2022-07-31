const { StatusCodes } = require("http-status-codes");
require("express-async-errors");
const path = require("path");
const uploadProductImage = async (req, res) => {
  const producImage = req.files.image
  const imagePath = path.join(__dirname, "../public/uploads/" + producImage.name)
  await producImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${producImage.name}` } });

};

module.exports = { uploadProductImage };
