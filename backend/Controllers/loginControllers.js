const { json } = require("express");
const connection = require("../database");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 

let codigo;


enviarMail = async(dirreccion, coding) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'rafaelmonje1331@gmail.com',
      pass: 'sljy ihgq hknf tdyc',
    }
  }
  const mensaje = {
    from: 'rafaelmonje1331@gmail.com',
    to: `${dirreccion}`,
    subject: 'MecanicApp validacion',
    text: `Detectamos que estas intentando iniciar sesion en MecanicApp; para confirmar que eres tu, ingresa el siguiente codigo --> "${coding}" <-- esta accion se realiza por seguridad`
  }
  const transport = nodemailer.createTransport(config);

  const info = await transport.sendMail(mensaje);
  console.log(info);
  console.log("---------------");
}


function generarCodigoAleatorio() {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  codigo = "";

  for (let i = 0; i < 6; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    codigo += caracterAleatorio;
  }

  return codigo;
}


function Login(request, response) {
  const email = request.body.correo;
  const password = request.body.contrasena;

  connection.query(
    `SELECT usuarios.id_usuario, usuarios.rol, usuarios.contrasena FROM usuarios WHERE correo =? AND contrasena=?`,
    [email,password],
    async (error, result) => {
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "No se encontró un usuario con esos datos",
          status: false,
        });
      } else {
        const userId = result[0].id_usuario;
        response.status(200).json({
          respuesta: result[0],
          status: true,
        });

        generarCodigoAleatorio();


        const hash = await hashContraseña(password);

        connection.query(
          "UPDATE usuarios SET codigo = ?, contrasena = ? WHERE id_usuario = ?;",
          [codigo, hash, userId],
          (errors, results) => {
            if (errors) {
              console.error(
                "Error al insertar el código de verificación en la base de datos:",
                errors
              );
              response
                .status(500)
                .json({ error: "Error interno del servidor con el código de validación" });
            } else {
              console.log(
                "Código de validación insertado correctamente en la base de datos"
              );

              enviarMail(email, codigo);

            }
          }
        );
      }
    }
  );
}


function confirmarLogin(request, response) {
  const { id, codigo } = request.body;
  console.log("----> id: " + id + " codigo: " + codigo)

  connection.query(
    'UPDATE usuarios SET acceso = 1 WHERE id_usuario = ? AND codigo = ?',
    [id, codigo],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar el acceso del usuario: ", error);
        response.status(500).json({ error: "Error interno del servidor al confirmar el login", status: false });
      } else {
        if (results.affectedRows > 0) {
          console.log('Código del usuario es correcto');
          response.status(200).json({ status: true, acceso: true });
        } else {
          console.log('Código del usuario es incorrecto');
          response.status(200).json({ status: false });
        }
      }
    }
  );
}

module.exports = {
  Login,
  confirmarLogin,
};
