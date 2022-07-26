const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  postJob,
  getSingleJobs,
  editJob,
  removeJob,
  removeAllJob,
} = require("../controllers/jobsController");
router.get("/", getAllJobs);
router.post("/", postJob);
router.delete("/", removeAllJob);
router.get("/:id", getSingleJobs);
router.patch("/:id", editJob);
router.delete("/:id", removeJob);

module.exports = router;
