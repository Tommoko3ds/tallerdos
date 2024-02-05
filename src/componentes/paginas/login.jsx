import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { cambiarStatusLogin } from "../../App";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondStep, setSecondStep] = useState(false);
  const [userId, setUserId] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  // const handleSubmit = (e) => { 
  //   e.preventDefault();
  //   console.log(`Email: ${email}, Password: ${password}`);
  // };
  const Login = async () => {
    const escapedEmail = escape(email);
    const escapedPassword = escape(password);
    

    try {
      const response = await axios.post("http://localhost:5000/login/", {
      correo: escapedEmail,
      contrasena: escapedPassword,
      
    });

      if (response.data.status) {
        setUserId (response.data.respuesta.userId);
        
      setSecondStep (true);
        
      } else {
        alert("Prueba con otro correo o contraseña");
      }
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
    }
  };

  const ConfirmLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login/confirmar", {
        id: userId,
        codigo: securityCode,
      });

      if (response.data.status) {
        // Autenticación exitosa, redirigir a la página de inicio
        cambiarStatusLogin(1);
        window.location.href = `/Home/${userId}`;
      } else {
        alert('Código de seguridad incorrecto. Intenta de nuevo.');
      }
    } catch (error) {
      console.error("Error al confirmar el login:", error);
    }
  };

  return (
    <div className="App">
    <div className="login-box mt-8 mb-8">
      <img className="logito" src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png" alt="Logo" />
      <h2>¡Bienvenido!</h2>
      { !secondStep && <p className='font-bold'>Identifícate con tu correo y contraseña</p> }
      <form>
        {!secondStep && (
          <>
            <div className="user-box mt-2">
              <input 
                type="email" 
                placeholder="" 
                onChange={(e) =>{
                  setEmail(e.target.value);
                }}
                required />
              <label>Correo</label>
            </div>
            <div className="user-box">
              <input 
                type="password"
                placeholder=''
                onChange={(e)=>{
                  setPassword(e.target.value);
                }} 
                required />
              <label>Contraseña</label>
            </div>
          </>
        )}
        {secondStep && (
          <div className="user-box">
            <input 
              type="text"
              placeholder='Código de seguridad'
              onChange={(e) => {
                setSecurityCode(e.target.value);
              }} 
              required />
            <label>Ingrese el código que ha sido enviado a su correo.</label>
          </div>
        )}
        <a onClick={secondStep ? ConfirmLogin : Login}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {secondStep ? 'Confirmar' : 'Inicia Sesion'}
        </a>
      </form>
    </div>
  </div>
  );
};
export default Login;