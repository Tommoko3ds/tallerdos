const { json } = require("express");
const connection = require("../database");
const nodemailer = require('nodemailer');

let codigo;

enviarMail = async(dirreccion,coding) => {

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

  const info =  await transport.sendMail(mensaje);
  console.log(info);
  console.log("---------------");
}

function generarCodigoAleatorio() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
    `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`,
    [email, password],
    (error, result) => {
      if (result.length === 0) {
        response.status(200).json({
          respuesta: "No se encontró un usuario con esos datos",
          status: false,
        });
      } else {
        const userId = result[0].id_usuario;
        const acceso = result[0].acceso;
        response.status(200).json({
          respuesta: (userId,acceso),
          status: true,
        });

        generarCodigoAleatorio();

        connection.query(
          "UPDATE usuarios SET codigo = ? WHERE id_usuario = ?;",
          [codigo, userId],
          (errors, results) => {
            if (error) {
              console.error(
                "Error al insertar el codigo de verificacion en la base de datos:",
                errors
              );
              response
                .status(500)
                .json({ error: "Error interno del servidor con el codigo de validacion" });
            } else {
              console.log(
                "codigo de validacion insertado correctamente en la base de datos"
              );

              enviarMail(email,codigo);
              
            }
          }
        );
      }
    }
  );

  
}

module.exports = {
  Login,
};
