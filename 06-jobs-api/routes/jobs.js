const express = require("express");
const router = express.Router();
const {
  deleteAllJobs,
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

router.delete("/", deleteAllJobs);
router.post("/", createJob);
router.get("/", getAllJobs);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);
 
module.exports = router