const { DataTypes, Model } = require('sequelize');

class DetalleCompra extends Model {
  static initModel(sequelize) {
    DetalleCompra.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        compra_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'compras',
            key: 'id',
          },
        },
        producto_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'productos',
            key: 'id',
          },
        },
        cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        precio_unitario: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        subtotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'DetalleCompra',
        tableName: 'detalles_compras',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

module.exports = DetalleCompra;