const nodemailer = require('nodemailer');

enviarMail = async() => {

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
        to: 'misha.raym@gmail.com',
        subject: 'Correo pa isha desde la api',
        text: 'Envio de correo desde node js utilizando nodemailer para poder probar que la api funciona'
    }
    const transport = nodemailer.createTransport(config);

    const info =  await transport.sendMail(mensaje);
    console.log(info);
}

enviarMail();



function confirmarCodigo(request, response) {
    const id = request.body.id_usuario;
    const code = request.body.codigo;
  
    connection.query(
      `SELECT * FROM usuarios WHERE id_usuario = ? AND codigo = ?`,
      [id, code],
      (error, result) => {
        if (result.length === 0) {
          response.status(200).json({
            respuesta: "El codigo es incorrecto",
            status: false,
          });
        } else {
          const userId = result[0].id_usuario;
          email_user = result[0].correo;
          response.status(200).json({
            respuesta: userId,
            status: true,
          });
        }
      }
    );
  }