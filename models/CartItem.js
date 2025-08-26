// models/CartItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Cart = require("./Cart");
const ProductVariant = require("./ProductVariant");

const CartItem = sequelize.define(
  "CartItem",
  {
    cart_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
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
    tableName: "cart_items",
    timestamps: false,
  }
);

// ================== Quan hệ ==================
// Một Cart có nhiều CartItem
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// Một CartItem thuộc về một ProductVariant (1-1)
ProductVariant.hasOne(CartItem, { foreignKey: "variant_id" });
CartItem.belongsTo(ProductVariant, { foreignKey: "variant_id" });

module.exports = CartItem;
