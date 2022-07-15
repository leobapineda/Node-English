const express = require("express");
const app = express();
const port = 3000;
const authRouter = require("./routes/authentication-route");
const jobRouter = require("./routes/jobs-route");
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "home" });
});

app.use("/v1/auth/", authRouter);
app.use("/v1/job/", jobRouter);

const start = () => {
  app.listen(port, () => {
    console.log("app listening on port " + port);
  });
};
start();
