/**
 * Modelo de Producto
 * Define la estructura de la tabla 'productos' en la base de datos
 */
const { DataTypes, Model } = require('sequelize');

class Producto extends Model {
  static initModel(sequelize) {
    Producto.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        numero_lote: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        precio: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        cantidad_disponible: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        fecha_ingreso: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Producto',
        tableName: 'productos',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

module.exports = Producto;