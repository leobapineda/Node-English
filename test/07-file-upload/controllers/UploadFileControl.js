require("express-async-errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const uploadImage = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
    const sampleFile = req.files.image;
  if (!sampleFile.mimetype.startsWith("image")) {
    return res.status(400).send("The file is not an img.");
  }

  const uploadPath = sampleFile.tempFilePath;
  const cloudImage = await cloudinary.uploader.upload(uploadPath, {
    folder: "07-test",
    use_filename: true,
  });
  fs.unlinkSync(uploadPath);
  return res.status(201).json({ image: cloudImage.secure_url });
};

module.exports = uploadImage;

// poner custom errors