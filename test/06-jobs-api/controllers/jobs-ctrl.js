const { find } = require("../model/jobSchema");
const userModel = require("../model/jobSchema");
require("express-async-errors");

const createJob = async (req, res) => {
  console.log("i am createJob");
  const { userName, userId } = req.user;
  req.body.postedBy = userId;
  const Job = await userModel.create(req.body);
  res.status(200).json(Job);
};

const getAllJobs = async (req, res) => {
  const { userName, userId } = req.user;
  const Jobs = await userModel.find({ postedBy: userId });
  res.status(200).json({ userName, userId, Jobs });
};

const getSingleJob = async (req, res) => {
  res.status(200).json({ msg: "getSingleJob" });
};

const editJob = async (req, res) => {
  res.status(200).json({ msg: "editJob" });
};

const deleteJob = async (req, res) => {
  res.status(200).json({ msg: "deleteJob" });
};

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
};
