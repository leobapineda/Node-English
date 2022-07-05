require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
// middleware

app.use(express.json()); //to be able to get the req,body
// app.use(express.static("./public2"))
app.use(express.static("./public"))
// routes
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED TO MONGODB");
    app.listen(port, console.log("server listening on port " + port));
  } catch (error) {
    console.log("listening for errors");
    console.log(error);
  }
};
start();
