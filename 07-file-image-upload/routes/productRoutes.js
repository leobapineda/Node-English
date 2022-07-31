const {
  createProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");
const express = require("express")
const router = express.Router()

router
  .route("/")
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteAllProducts);
router.route("/uploads").post(uploadProductImage);

module.exports = router;