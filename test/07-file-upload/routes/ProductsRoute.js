// definir mi ruta
const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  deleteAllProducts,
} = require("../controllers/ProductsControl");
const uploadImage = require("../controllers/UploadFileControl")

router
  .route("/")
  .post(createProduct)
  .get(getAllProducts)
  .delete(deleteAllProducts);

router.route("/upload").post(uploadImage);

module.exports = router
