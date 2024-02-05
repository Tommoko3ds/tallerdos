import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { cambiarStatusLogin } from "../../ProtectedRoute";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };
  const Login = async () => {
    const escapedEmail = escape(email);
    const escapedPassword = escape(password);
    

    try {
      const response = await axios.post("http://localhost:5000/login/", {
      correo: escapedEmail,
      contrasena: escapedPassword,
      
    });

      if (response.data.status) {
        const idUsuario = response.data.respuesta.userId;
        const acceso = response.data.respuesta.acceso;
        console.log(idUsuario);
        cambiarStatusLogin(acceso);
        console.log("Acceso ----> " + acceso);
        window.location.href = `/Home/${idUsuario}`;
      } else {
        alert("Prueba con otro correo o contraseña");
      }
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
    }
  };

  const ConfirmLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/confirm-login/", {
        userId: userId,
        codigoSeguridad: securityCode,
      });

      if (response.data.status) {
        // Autenticación exitosa, redirigir a la página de inicio
        window.location.href = '/Home/${userId}';
      } else {
        alert('Código de seguridad incorrecto. Intenta de nuevo.');
      }
    } catch (error) {
      console.error("Error al confirmar el login:", error);
    }
  };

  return (
    <div className="App">
      <div className="login-box">
        <img
          className="logito"
          src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png"
          alt="Logo"
        />
        <h2>¡Bienvenido!</h2>
        <p>Identificate con tu usuario y contraseña para acceder</p>
        <form>
          <div className="user-box">
            <input
              type="email"
              placeholder=""
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              placeholder=""
              minLength="8"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label>Password</label>
          </div>
          <a onClick={Login}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Inicia Sesion
          </a>
        </form>
      </div>
    </div>
  );
};
export default Login;