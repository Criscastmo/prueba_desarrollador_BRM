/**
 * Archivo de configuración de los modelos
 * Inicializa Sequelize, importa todos los modelos y define las asociaciones entre ellos
 */
const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

// Importamos los modelos
const Rol = require('./rol');
const Usuario = require('./usuario');
const Producto = require('./producto');
const Compra = require('./compra');
const DetalleCompra = require('./detalleCompra');

// Inicializar modelos
Rol.initModel(sequelize);
Usuario.initModel(sequelize);
Producto.initModel(sequelize);
Compra.initModel(sequelize);
DetalleCompra.initModel(sequelize);

// Definir asociaciones
// Usuario - Rol
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });

// Usuario - Compra
Usuario.hasMany(Compra, { foreignKey: 'usuario_id', as: 'compras' });
Compra.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Compra - DetalleCompra
Compra.hasMany(DetalleCompra, { foreignKey: 'compra_id', as: 'detalles' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'compra_id', as: 'compra' });

// Producto - DetalleCompra
Producto.hasMany(DetalleCompra, { foreignKey: 'producto_id', as: 'detalles' });
DetalleCompra.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });

module.exports = {
  sequelize,
  Sequelize,
  Rol,
  Usuario,
  Producto,
  Compra,
  DetalleCompra,
};