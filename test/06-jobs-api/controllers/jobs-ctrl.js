// obtner todos los trabajos
// crear un trabajo
// obtener un solo trabajo
// editar un trabajo
// borar un trabajo

const getAllJobs = (req, res) => {
  res.status(200).json({ msg: "getAllJobs" });
};

const createJob = (req, res) => {
  res.status(200).json({ msg: "createJob" });
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
