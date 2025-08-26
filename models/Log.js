const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Account = require("./Account");

const Log = sequelize.define(
  "Log",
  {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    log_level: {
      type: DataTypes.STRING(50),
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    ip_address: {
      type: DataTypes.STRING(50),
    },
    user_agent: {
      type: DataTypes.STRING(255),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "logs",
    timestamps: false,
  }
);

// Quan hệ
Log.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Log, { foreignKey: "account_id" });

module.exports = Log;
