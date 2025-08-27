const { DataTypes, Model } = require('sequelize');

class Compra extends Model {
  static initModel(sequelize) {
    Compra.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        usuario_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        fecha_compra: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
        },
      },
      {
        sequelize,
        modelName: 'Compra',
        tableName: 'compras',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

module.exports = Compra;