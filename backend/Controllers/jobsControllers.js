const { json } = require("express");
const connection = require("../database");

function verJobs(request, response) {
  const { titulo } = request.query;

  // Usar una consulta SQL condicional para incluir la búsqueda por título
  let query = 'SELECT * FROM trabajos';

  if (titulo) {
    query += ` WHERE titulo LIKE '%${titulo}%'`;
  }

  connection.query(query, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Error al obtener trabajos" });
    } else {
      response.status(200).json(results);
    }
  });
}

function crearTrabajo(request, response) {
  const { titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal } = request.body;

  connection.query(
    'INSERT INTO trabajos (titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal) VALUES (?, ?, ?, ?, ?, ?, ?)',
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

  connection.query(
    'UPDATE trabajos SET titulo=?, descripcion=?, tipo=?, estatus=?, horas=?, precioMateriales=?, precioTotal=? WHERE id_trabajo=?',
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

const obtenerTrabajoPorId = async (req, res) => {
  try {
    const { id_trabajo } = req.params;

    // Lógica para obtener el trabajo por ID desde la base de datos
    // Por ejemplo, asumiendo que trabajos es una matriz de trabajos
    const trabajo = trabajos.find((t) => t.id_trabajo === parseInt(id_trabajo));

    if (!trabajo) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }

    res.json(trabajo);
  } catch (error) {
    console.error('Error al obtener trabajo por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { obtenerTrabajoPorId };

module.exports = {
  verJobs,
  crearTrabajo,
  editarTrabajo,
  eliminarTrabajo,
  obtenerTrabajoPorId,
};
