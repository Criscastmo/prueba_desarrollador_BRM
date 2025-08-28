/**
 * Script para sincronizar los modelos con la base de datos
 */
const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Crea las tablas si no existen (no borra datos)
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas con la base de datos.');

    process.exit(0);
  } catch (error) {
    console.error('Error al sincronizar con la base de datos:', error);
    process.exit(1);
  }
})();