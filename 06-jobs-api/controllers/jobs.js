require("dotenv").config();
var jwt = require("jsonwebtoken");

const createJob = async (req, res) => {
  const { userName, userId } = req.user;
  res.send(`welcome to getAllJobs ${userName}, your ID is ${userId}`);
};

const getAllJobs = async (req, res) => {
  const { userName, userId } = req.user;
  res.send(`welcome to getAllJobs ${userName}, your ID is ${userId}`);
};

const getJob = async (req, res) => {
  res.send(" getJobjob");
};
const updateJob = async (req, res) => {
  res.send(" updateJobjob");
};

const deleteJob = async (req, res) => {
  res.send(" deleteJobjob");
};

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
