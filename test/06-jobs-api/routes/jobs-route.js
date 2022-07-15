// register
// login
const {
  getAllJobs,
  createJob,
  getSingleJob,
  editJob,
  deleteJob,
} = require("../controllers/jobs-ctrl");
const express = require("express");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(editJob).delete(deleteJob);

module.exports = router;
