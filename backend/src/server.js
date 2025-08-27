// Encargado de levantar el servidor
require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/sequelize');

//Dejo las variables del servidor expuestas para facilitar pruebas al examinador sin dotenv 
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('La conexión de la base de datos es correcta.');

    app.listen(PORT, () => {
      console.log(`El servidor está corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}

start();