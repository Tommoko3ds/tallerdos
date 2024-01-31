const { json } = require("express");
const connection = require("../database");

function Login(request, response) {
  const email = request.body.correo;
  const password = request.body.contrasena;

  connection.query(
    `SELECT id_usuario FROM usuarios WHERE correo = ? AND contrasena = ?`,
    [email, password],
    (error, result) => {
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "No se encontró un usuario con esos datos",
          status: false,
        });
      } else {
        const userId = result[0].id_usuario;
        response.status(200).json({
          respuesta: userId,
          status: true,
        });
      }
    }
  );
}

module.exports = {
  Login,
};
