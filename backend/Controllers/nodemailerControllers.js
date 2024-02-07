// const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Función para encriptar una contraseña
const encryptPassword = async (password) => {
  try {
    // Generar un hash de la contraseña con una sal (salt) aleatoria
    const salt = await bcrypt.genSalt(10); // El número 10 es el número de rondas de encriptación
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
};

// Ejemplo de uso
const passwordBd = "123456789";
encryptPassword(passwordBd)
  .then((hashedPassword) => {
    console.log('Contraseña encriptada:', hashedPassword);
    comparePasswords(passwordBd, hashedPassword)
  .then((match) => {
    if (match) {
      console.log("pass: "+ passwordBd);
      console.log("passHash: "+ hashedPassword);


      console.log('La contraseña coincide.');
    } else {
      console.log('La contraseña no coincide.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  
// Función para comparar una contraseña con su versión encriptada
const comparePasswords = async (password, hashedPassword) => {
  try {
    // Comparar la contraseña ingresada con la versión encriptada almacenada
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error al comparar contraseñas:', error);
    throw error; // Opcional: lanzar el error para manejarlo en otro lugar
  }
};

// Ejemplo de uso
const password = 'contraseña123';
const hashedPassword = '$2a$10$Tj5R13q0fWOGbZg0AJNTjOqPyfQ4BXEPOO/Ep8V3CCYYlwKOYADPa'; // Este sería el hash almacenado en tu base de datos


// enviarMail = async() => {

//     const config = {
//         host: 'smtp.gmail.com',
//         port: 587,
//         auth: {
//             user: 'rafaelmonje1331@gmail.com',
//             pass: 'sljy ihgq hknf tdyc',
//         }
//     }
//     const mensaje = {
//         from: 'rafaelmonje1331@gmail.com',
//         to: 'misha.raym@gmail.com',
//         subject: 'Correo pa isha desde la api',
//         text: 'Envio de correo desde node js utilizando nodemailer para poder probar que la api funciona'
//     }
//     const transport = nodemailer.createTransport(config);

//     const info =  await transport.sendMail(mensaje);
//     console.log(info);
// }

// enviarMail();



// function confirmarCodigo(request, response) {
//     const id = request.body.id_usuario;
//     const code = request.body.codigo;
  
//     connection.query(
//       `SELECT * FROM usuarios WHERE id_usuario = ? AND codigo = ?`,
//       [id, code],
//       (error, result) => {
//         if (result.length === 0) {
//           response.status(200).json({
//             respuesta: "El codigo es incorrecto",
//             status: false,
//           });
//         } else {
//           const userId = result[0].id_usuario;
//           email_user = result[0].correo;
//           response.status(200).json({
//             respuesta: userId,
//             status: true,
//           });
//         }
//       }
//     );
//   }