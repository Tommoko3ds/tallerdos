const express = require("express");
const jobsControllers = require("../Controllers/jobsControllers");
const router = express.Router();

router.get("/jobs", jobsControllers.verJobs);
router.post("/jobs", jobsControllers.crearTrabajo);

module.exports = router