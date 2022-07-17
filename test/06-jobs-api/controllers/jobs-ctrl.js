const userModel = require("../model/jobSchema");
require("express-async-errors");

const createJob = async (req, res) => {
  const Job = await userModel.create(req.body);
  res.status(200).json(Job);
};

const getAllJobs = (req, res) => {
  res.status(200).json({ msg: "getAllJobs" });
};

const getSingleJob = (req, res) => {
  res.status(200).json({ msg: "getSingleJob" });
};

const editJob = (req, res) => {
  res.status(200).json({ msg: "editJob" });
};

const deleteJob = (req, res) => {
  res.status(200).json({ msg: "deleteJob" });
};

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
};
