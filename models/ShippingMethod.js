const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ShippingMethod = sequelize.define(
  "ShippingMethod",
  {
    shipping_method_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "shipping_methods",
    timestamps: false, // mình tắt để dùng created_at, updated_at custom
  }
);

module.exports = ShippingMethod;
