require("dotenv").config();
require("express-async-errors");


// upload img
const fileUpload = require("express-fileupload");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connectDB");
// middleware
const NotFound = require("./middleware/not-found");
const handleErrorsMiddleware = require("./middleware/handle-errors-middleware");

// 
app.use(express.static("./public"))
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
// routes
const ProductRoute = require("./routes/ProductsRoute");

// routes
app.use("/v1/products", ProductRoute);

// middleware
app.use(handleErrorsMiddleware);
app.use(NotFound);
async function start() {
  try {
    console.log("connecting");
    await connectDB(process.env.MONGOURI);
    console.log("CONNECTED");
    app.listen(PORT, () => console.log("listening on port " + PORT));
  } catch (err) {
    console.log({ err });
  }
}
start();
