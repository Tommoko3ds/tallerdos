import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };
  const Login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login/", {
        correo: email,
        contrasena: password,
      });

      if (response.data.status) {
        const idUsuario = response.data.respuesta;
        console.log(idUsuario); 
        window.location.href = (`/Home/${idUsuario}`);
      } else {
        alert('Prueba con otro correo o contraseña');
      }
    } catch (error) {
      console.error("Error al autenticar el usuario:", error);
    }
  };

  return (
  <div className="App">
    <div className="login-box">
    <img className="logito" src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png" alt="Logo" />
    <h2>¡Bienvenido!</h2>
    <p>Identificate con tu usuario y contraseña para acceder</p>
    <form>
      <div className="user-box">
        <input 
        type="email" 
        placeholder="" 
        onChange={(e) =>{
          setEmail(e.target.value);
        }}
        required />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input type="password"
        placeholder=''
        onChange={(e)=>{
          setPassword(e.target.value);
        }} required />
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
