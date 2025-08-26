const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");

const Cart = sequelize.define(
  "Cart",
  {
    cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
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
    tableName: "cart",
    timestamps: false,
  }
);

// Quan hệ 1-1 với Account
Account.hasOne(Cart, { foreignKey: "account_id" });
Cart.belongsTo(Account, { foreignKey: "account_id" });

module.exports = Cart;
