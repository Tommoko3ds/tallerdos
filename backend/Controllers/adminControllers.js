const { json } = require("express");
const connection = require("../database");

function verUsuarios(request, response) {
  connection.query(`SELECT * FROM usuarios`, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Error al obtener usuarios" });
    } else {
      response.status(200).json(results);
    }
  });
}

function crearUsuario(request, response) {
  const { usuario, contrasena, correo } = request.body;

  connection.query(
    'INSERT INTO usuarios (usuario, contrasena, correo) VALUES (?, ?, ?)',
    [usuario, contrasena, correo],
    (error, results) => {
      if (error) {
        console.error("Error al insertar en la base de datos:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log('Usuario insertado correctamente en la base de datos');
        response.json({ success: true });
      }
    }
  );
}

function editarUsuario(request, response) {
  const { id_usuario } = request.params;
  const { usuario, contrasena, correo } = request.body;

  connection.query(
    'UPDATE usuarios SET usuario=?, contrasena=?, correo=? WHERE id_usuario=?',
    [usuario, contrasena, correo, id_usuario],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar en la base de datos:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log('Usuario actualizado correctamente en la base de datos');
        response.json({ success: true });
      }
    }
  );
}

function eliminarUsuario(request, response) {
    const { id_usuario } = request.params;
  
    connection.query('DELETE FROM usuarios WHERE id_usuario=?', [id_usuario], (error, results) => {
      if (error) {
        console.error("Error al eliminar en la base de datos:", error);
        response.status(500).json({ error: "Error interno del servidor" });
      } else {
        console.log('Usuario eliminado correctamente de la base de datos');
        response.json({ success: true });
      }
    });
  }

module.exports = {
  verUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
};
