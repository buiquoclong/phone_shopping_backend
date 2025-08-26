const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const ProductVariant = require("./ProductVariant");

const ProductVariantImage = sequelize.define(
  "ProductVariantImage",
  {
    variant_image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    tableName: "product_variant_images",
    timestamps: false,
  }
);

// Quan hệ: Một ProductVariant có nhiều hình ảnh
ProductVariant.hasMany(ProductVariantImage, { foreignKey: "variant_id" });
ProductVariantImage.belongsTo(ProductVariant, { foreignKey: "variant_id" });

module.exports = ProductVariantImage;
