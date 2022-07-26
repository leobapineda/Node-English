require("dotenv").config();
require("express-async-errors");
const jwt = require("jsonwebtoken");
const jobSchema = require("../models/JobModel");

const postJob = async (req, res, next) => {
      const { userId } = req.user;
      const Job = await jobSchema.create({ ...req.body, author: userId });
      res.status(200).json({Job});
};

const getAllJobs = (req, res) => {


  // get all jobs with id



  res.send("getAllJobs");
};

const getSingleJobs = (req, res) => {
  res.send("getSingleJobs");
};

const editJob = (req, res) => {
  res.send("editJob");
};

const removeJob = (req, res) => {
  res.send("removeJobs");
};


const removeAllJob = async (req, res) => {
  
  await jobSchema.deleteMany()

  res.send("all items removed")
};


module.exports = {
  getAllJobs,
  postJob,
  getSingleJobs,
  editJob,
  removeJob,
  removeAllJob,
};
