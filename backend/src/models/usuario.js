const { DataTypes, Model } = require('sequelize');

class Usuario extends Model {
  static initModel(sequelize) {
    Usuario.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING(80),
          allowNull: true,
        },
        telefono: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        documento_identidad: { //Lo ideal seria tener tipo de documento, se deja en string por las cedulas de extranjeria
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(80),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rol_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'roles', // tabla roles
            key: 'id',
          },
        },
      },
      {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,   // created_at y updated_at
        underscored: true,  // snake_case en columnas
      }
    );
  }
}

module.exports = Usuario;