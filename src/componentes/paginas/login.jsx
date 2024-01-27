import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
  <div className="App">
    <div className="login-box">
    <img className="logito" src="https://llantasymecanica.com/wp-content/uploads/2023/04/servicio.png" alt="Logo" />
    <h2>¡Bienvenido!</h2>
    <p>Identificate con tu usuario y contraseña para acceder</p>
    <form>
      <div className="user-box">
        <input type="text" name="" required />
        <label>Username</label>
      </div>
      <div className="user-box">
        <input type="password" name="" required />
        <label>Password</label>
      </div>
      <a href="#">
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
