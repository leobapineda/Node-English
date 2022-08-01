require("express-async-errors");
require("dotenv").config();
const fs = require("fs");
const { UnauthenticatedError, BadRequestError } = require("../errors/index");
const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const path = require("path");

const uploadProductImageLocal = async (req, res) => {
  // no file
  if (!req.files) {
    throw new BadRequestError("Must provide an image");
  }

  // checking for image format
  const producImage = req.files.image;
  if (!producImage.mimetype.startsWith("image")) {
    throw new BadRequestError("File is not an image");
  }

  // checking for a max size of 100kb
  const maxSize = 100000;
  if (producImage.size > maxSize) {
    throw new BadRequestError("Image must be under 100kb");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + producImage.name
  );
  await producImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${producImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  // no file
  if (!req.files) {
    throw new BadRequestError("Must provide an image");
  }

  // checking for image format
  const producImage = req.files.image;
  if (!producImage.mimetype.startsWith("image")) {
    throw new BadRequestError("File is not an image");
  }

  // checking for a max size of 100kb
  const maxSize = 100000;
  if (producImage.size > maxSize) {
    throw new BadRequestError("Image must be under 100kb");
  }
  console.log(producImage);
  const response = await cloudinary.uploader.upload(producImage.tempFilePath, {
    use_filename: true,
    folder: "07-file-upload",
  });
  // borrar img file after it is sent to cloudinary
  fs.unlinkSync(producImage.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: response.secure_url } });
};

module.exports = { uploadProductImage };
