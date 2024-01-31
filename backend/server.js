const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'mysql-keniaescamilla.alwaysdata.net',
  user: '345342_yo',
  password: 'P.HVM4n24rLGH65',
  database: 'keniaescamilla_tallerapp',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

app.use(cors());
app.use(express.json());

app.get('/api/jobs', (req, res) => {
  const sql = 'SELECT * FROM trabajos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener trabajos desde la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(result);
    }
  });
});

app.post('/api/jobs', (req, res) => {
  const { titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal } = req.body;

  const sql = 'INSERT INTO trabajos (titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [titulo, descripcion, tipo, estatus, horas, precioMateriales, precioTotal], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Trabajo insertado correctamente en la base de datos');
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
