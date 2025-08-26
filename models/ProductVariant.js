const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");

const ProductVariant = sequelize.define(
  "ProductVariant",
  {
    variant_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    storage: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
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
    tableName: "product_variants",
    timestamps: false,
  }
);

// Quan hệ: Một Product có nhiều ProductVariant
Product.hasMany(ProductVariant, { foreignKey: "product_id" });
ProductVariant.belongsTo(Product, { foreignKey: "product_id" });

module.exports = ProductVariant;
