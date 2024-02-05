const express = require("express");
const jobsControllers = require("../Controllers/jobsControllers");
const router = express.Router();

router.get("/jobs", jobsControllers.verJobs);
router.post("/jobs", jobsControllers.crearTrabajo);
router.get("/jobs/:id_trabajo", jobsControllers.obtenerTrabajoPorId);
router.put("/jobs/:id_trabajo", jobsControllers.editarTrabajo);
router.delete("/jobs/:id_trabajo", jobsControllers.eliminarTrabajo);

module.exports = router;
