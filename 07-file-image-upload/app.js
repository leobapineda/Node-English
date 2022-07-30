const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./db/connect")
const NotFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json())


app.get("/", (req, res) => {
  res.send("<h1>home route</h1>");
});

// MIDDLEWARE
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
