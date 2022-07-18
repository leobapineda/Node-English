const { StatusCodes } = require("http-status-codes");
require("express-async-errors");
const userModel = require("../model/jobSchema");
const { BadRequest} = require("../errors/index");
const createJob = async (req, res) => {
  const { userId } = req.user;
  req.body.postedBy = userId;
  const Job = await userModel.create(req.body);
  res.status(StatusCodes.CREATED).json(Job);
};

const getAllJobs = async (req, res) => {
  const { userName, userId } = req.user;
  const Jobs = await userModel.find({ postedBy: userId });
  if (Jobs.length < 1) {
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ userName, msg: "There are no jobs" });
  }
  res.status(StatusCodes.OK).json({ userName, amount: Jobs.length, Jobs });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findById(id);
  if (!Job) {
    throw new BadRequest(`Could not find job with id: ${id}`);
  }
  res.status(StatusCodes.OK).json(Job);
};

const editJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!Job) {
    throw new BadRequest(`Could not find job with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Job updated", Job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const Job = await userModel.findOneAndDelete({ _id: id });
  if (!Job) {
    throw new BadRequest(`Could not find job with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "Job deleted", Job });
};

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
};
