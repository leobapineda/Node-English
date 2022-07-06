const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors")
const port = process.env.PORT || 5000;

const productsRouter = require("./routes/products");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMidleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products" >product route</a>');
});

// products route
app.use("/api/v1/products", productsRouter);
app.use(notFoundMiddleware);
app.use(errorMidleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("server listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};
start();
