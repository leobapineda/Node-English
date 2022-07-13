require("dotenv").config();
var jwt = require("jsonwebtoken");
const jobSchema = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/index");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  try {
    const Job = await jobSchema.create(req.body);
    res.status(StatusCodes.CREATED).json(Job);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

const getAllJobs = async (req, res) => {
  try {
    const { userName, userId } = req.user;
    console.log(userName, userId);
    const Jobs = await jobSchema.find({ createdBy: userId });
    res.status(StatusCodes.OK).json({ userName, userId, Jobs });
  } catch (err) {
    console.log(err);
  }
};

const getJob = async (req, res) => {
  // se obtiene pasando una propiedad
  try {
    const { userName, userId } = req.user;
    const jobId = req.params.id;
    const Job = await jobSchema.findOne({ _id: jobId, createdBy:userId});
    if (!Job) {
      return res
        .status(404)
        .json({ msg: `this job does not exists. ID: ${jobId}` });
    }
    res.status(StatusCodes.OK).json({ userName, userId, Job });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};
const updateJob = async (req, res) => {
  res.send(" updateJobjob");
  
};

const deleteJob = async (req, res) => {
  res.send(" deleteJobjob");
};

module.exports = { createJob, getAllJobs, getJob, updateJob, deleteJob };
