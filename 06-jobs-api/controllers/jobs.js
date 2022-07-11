//
const createJob = async (req, res) => {
  res.send(" createJobjob");
};
const getAllJobs = async (req, res) => {
  res.send(" getAllJobsjob");
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
