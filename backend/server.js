const express = require('express');
const cors = require('cors');

const Trabajos = require('./Routers/jobsRouters');
const Admin = require('./Routers/usersRouters');
const login = require('./Routers/loginRouters');

const app = express();
const port = 5000;




app.use(cors());
app.use(express.json());

app.use("/api", Trabajos);
app.use("/login", login);
app.use("/users", Admin);


app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});

