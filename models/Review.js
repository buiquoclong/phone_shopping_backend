const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");
// const ProductVariant = require('./ProductVariant'); // bạn cần tạo model này trước

const Review = sequelize.define(
  "Review",
  {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    variant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
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
    tableName: "reviews",
    timestamps: false,
  }
);

// Quan hệ
Review.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Review, { foreignKey: "account_id" });

Review.belongsTo(ProductVariant, { foreignKey: "variant_id" });
ProductVariant.hasMany(Review, { foreignKey: "variant_id" });

module.exports = Review;
