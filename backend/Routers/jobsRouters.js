const express = require("express");
const jobsControllers = require("../Controllers/jobsControllers");
const router = express.Router();

router.get("/jobs", jobsControllers.verJobs);
router.post("/jobs", jobsControllers.crearTrabajo);
router.put("/jobs/:id_trabajo", jobsControllers.editarTrabajo); // Agregamos :id_trabajo para indicar que es un parámetro
router.delete("/jobs/:id_trabajo", jobsControllers.eliminarTrabajo); // Agregamos :id_trabajo para indicar que es un parámetro

module.exports = router;
