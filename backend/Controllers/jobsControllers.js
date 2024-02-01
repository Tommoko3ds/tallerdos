const { json } = require("express");
const connection = require("../database");

function verJobs(request, response) {
  connection.query(`SELECT * FROM trabajos`, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Error al obtener trabajos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function crearTrabajo(request, response) {
  const { titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal } = request.body;

  connection.query('INSERT INTO trabajos (titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal],
    (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log('Trabajo insertado correctamente en la base de datos');
        response.json({ success: true });
      }
    }
  );
}

function editarTrabajo(request, response) {
  const { id_trabajo } = request.params;
  const { titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal } = request.body;

  connection.query('UPDATE trabajos SET titulo=?, descripcion=?, tipo=?, estatus=?, horas=?, precioMateriales=?, precioTotal=? WHERE id_trabajo=?',
    [titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal, id_trabajo],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar en la base de datos:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log('Trabajo actualizado correctamente en la base de datos');
        response.json({ success: true });
      }
    }
  );
}

function eliminarTrabajo(request, response) {
  const { id_trabajo } = request.params;

  connection.query('DELETE FROM trabajos WHERE id_trabajo=?', [id_trabajo], (error, results) => {
    if (error) {
      console.error("Error al eliminar en la base de datos:", error);
      response.status(500).json({ error: "Error interno del servidor" });
    } else {
      console.log('Trabajo eliminado correctamente de la base de datos');
      response.json({ success: true });
    }
  });
}

module.exports = {
  verJobs,
  crearTrabajo,
  editarTrabajo,
  eliminarTrabajo,
};
