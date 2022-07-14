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
    const Jobs = await jobSchema
      .find({ createdBy: userId })
      .sort({ createdAt: 1 });
    res
      .status(StatusCodes.OK)
      .json({ userName, userId, count: Jobs.length, Jobs });
  } catch (err) {
    console.log(err);
  }
};

const getJob = async (req, res, next) => {
  // try {
    const { userName, userId } = req.user;
    const jobId = req.params.id;
    const Job = await jobSchema.findOne({ _id: jobId, createdBy: userId });
    if (!Job) {
      //  esto me envia el error que ponga en el catch, si quiero enviar este error debo quitar el try-caych bloque
      throw new NotFoundError(`no job with id: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ userName, userId, Job });
};

const updateJob = async (req, res) => {
    const { userName, userId } = req.user;
    const jobId = req.params.id;
    const { company, position } = req.body;
    console.log(req.body)
    // if I want this if statment to work need to remove the try-catch, otherwaise all erros get to catch
    if (company === "" || position === "") {
      throw new UnauthenticatedError("must provide all job info if statement");
    }
    const Job = await jobSchema.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { runValidators: true, new: true }
    );
    if(!Job) {
      throw new NotFoundError(`no job with id: ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "job updated", Job });
  
};

const deleteJob = async (req, res) => {
  // try {
    const { userName, userId } = req.user;
    const jobId = req.params.id;
    const Job = await jobSchema.deleteOne({ _id: jobId, createdBy: userId });
    // he uses 
  if(!Job) {
    throw new NotFoundError(`no job with id: ${jobId}`)
  }

    if (Job.n < 1) {
      throw new NotFoundError(`no job with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ msg: "job deleted" });
  // } catch (err) {
  //   console.log(err);
  //   res.status(401).json(err);
  // }
};

const deleteAllJobs = async (req, res) => {
  try {
    const Job = await jobSchema.deleteMany();
    console.log(Job);

    res.status(StatusCodes.OK).json({ msg: "ALL DELETED" });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

module.exports = {
  deleteAllJobs,
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
