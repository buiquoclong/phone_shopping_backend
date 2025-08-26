const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

const Account = sequelize.define('Account', {
  account_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  type: {
    type: DataTypes.STRING(50)
  },
  verify_token: {
    type: DataTypes.STRING(255)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'accounts',
  timestamps: false
});

// Quan hệ: Account thuộc về Role
Account.belongsTo(Role, { foreignKey: 'role_id' });
// Quan hệ: Role có nhiều Account
Role.hasMany(Account, { foreignKey: 'role_id' });

module.exports = Account;
