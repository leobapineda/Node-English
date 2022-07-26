require("dotenv").config();
require('express-async-errors');
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
app.use(express.json())
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobsRoutes");
const connectDB = require("./db/connect")

const authenticationMiddleware = require("./middleware/authentication")

app.use("/auth", authRouter);
app.use("/jobs", authenticationMiddleware, jobsRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

async function start() {
  try{
    await connectDB(process.env.MONGO_URI);
    console.log("connected to MONBODB");
    app.listen(port, console.log("listening on port " + port));
  }
  catch(err) {
    console.log(err);
  }
}

start();
