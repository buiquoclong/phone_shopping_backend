const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");
const ProductVariant = require("./ProductVariant");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    wishlist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    variant_id: {
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
    tableName: "wishlists",
    timestamps: false,
  }
);

// Quan hệ
Wishlist.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Wishlist, { foreignKey: "account_id" });

Wishlist.belongsTo(ProductVariant, { foreignKey: "variant_id" });
ProductVariant.hasMany(Wishlist, { foreignKey: "variant_id" });

module.exports = Wishlist;
