const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'mysql-keniaescamilla.alwaysdata.net',
    user: '345342_yo',
    password: 'P.HVM4n24rLGH65',
    database: 'keniaescamilla_tallerapp',
});

connection.connect(function (error) {
  if (error) {
    console.log("Error al conectar la bd");
  } else {
    console.log("conexion realizada exitosamente a la BD");
  }
});

module.exports = connection;
