const { json } = require("express");
const connection = require("../database");
const bcrypt = require('bcryptjs'); // Importa bcryptjs para hashear contraseñas

// Define la función para hashear la contraseña
async function hashContraseña(contraseña) {
  const salt = await bcrypt.genSalt(10); // Genera un salt aleatorio
  const hash = await bcrypt.hash(contraseña, salt); // Hashea la contraseña con el salt
  return hash; // Devuelve la contraseña hasheada
}

// Ahora puedes utilizar la función hashContraseña en tu código


function verUsuarios(request, response) {
  connection.query(`SELECT * FROM usuarios`, (error, results) => {
    if (error) {
      response.status(500).json({ error: "Error al obtener usuarios" });
    } else {
      response.status(200).json(results);
    }
  });
}
async function crearUsuario(request, response) {
  const { usuario, contrasena, correo } = request.body;

  // Hasheamos la contraseña antes de insertarla en la base de datos
  const hash = await hashContraseña(contrasena);

  // Verificamos si el hash coincide con la contraseña original
  const contraseñaCoincide = await bcrypt.compare(contrasena, hash);

  if (!contraseñaCoincide) {
    console.error("Error: La contraseña no se ha guardado correctamente en la base de datos.");
    response.status(500).json({ error: "Error interno del servidor" });
    return;
  } else {
    console.log("Contraseña siusi");
  }

  connection.query(
    'INSERT INTO usuarios (usuario, contrasena, correo) VALUES (?, ?, ?)',
    [usuario, hash, correo], // Insertamos el hash de la contraseña en lugar de la contraseña original
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
