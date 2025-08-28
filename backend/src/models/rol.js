/**
 * Modelo de rol
 * Define la estructura de la tabla 'rol' en la base de datos
 * Se crea la tabla para facilitar el crecimiento futuro de roles y mantener buenas prácticas
 */
const { DataTypes, Model } = require('sequelize');

class Rol extends Model {
  static initModel(sequelize) {
    Rol.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true, // admin, cliente no deben repetirse
        },
      },
      {
        sequelize,
        modelName: 'Rol',
        tableName: 'roles',
        timestamps: true, // crea created_at y updated_at
        underscored: true,
      }
    );
  }
}

module.exports = Rol;