/*
* Configuración de Sequelize para la conexión a la base de datos MySQL
* Usa variables de entorno para la configuración, pero tiene valores por defecto
* para facilitar el desarrollo local sin necesidad de un archivo .env
*/
const { Sequelize } = require('sequelize');

//Conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME || 'inventario_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    //port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    define: {
      underscored: true,     // columnas con snake_case por defecto para creación de las tablas
      freezeTableName: false // pluralizar nombres por defecto usuario => usuarios 
    },
    timezone: '-05:00'       // Zona horaria de Bogotá, normalmente toma la del server node, es buena practica por si se guardan logs en la base de datos
  }
);

module.exports = sequelize;