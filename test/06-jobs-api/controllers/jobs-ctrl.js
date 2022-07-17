const { find } = require("../model/jobSchema");
const userModel = require("../model/jobSchema");
require("express-async-errors");
const {
  BadRequest,
  CustomError,
  Unauthorized,
  notFound,
} = require("../errors/index");
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
  if (Jobs.length < 1) {
    return res.status(200).json({ userName, msg:"no jobs created yet" });
  }
  res.status(200).json({ userName, amount: Jobs.length, userId, Jobs });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findById(id);
  if (!Job) {
    throw new BadRequest(`no job with id: ${id} found`);
  }
  res.status(200).json(Job);
};

const editJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!Job) {
    throw new BadRequest(`can not get job with id: ${id}`);
  }
  res.status(200).json({ edit: true, Job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findOneAndDelete({ _id: id });
  if (!Job) {
    throw new BadRequest(`job with id: ${id} not found`);
  }
  res.status(200).json({ msg: "Job deleted", Job });
};

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
};
