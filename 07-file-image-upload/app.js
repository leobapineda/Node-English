require("dotenv").config();
require("express-async-errors");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000 || 5000
const connectDB = require("./db/connect")
const NotFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const ProductRoute = require("./routes/productRoutes")
app.use(express.json())

// IMAGE
app.use(fileUpload());
// IMAGE


app.use(express.static("public"));
const url = "/api/v1/products";

app.use("/api/v1/products", ProductRoute);
app.use(errorHandlerMiddleware);
app.use(NotFound);

async function start() {
  try {
    console.log("connecting ");
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED");
    app.listen(PORT, () => console.log("listening on port " + 3000));
  } catch (err) {
    console.log(err);
  }
}
start();


// vincit qui se vincit
// guinket kui se guinket

// Per Angusta Ad Augusta
// Definition - "through difficulties to honors";
// dont let it go that deep, just breath
// \\wsl$\Ubuntu-20.04\home\leo\free-code-camp\node\node-english\07-file-image-upload