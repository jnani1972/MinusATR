const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AccessTokens = sequelize.define('AccessTokens', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  access_token: {
    type: DataTypes.STRING(1000), // Increased length to 1000 characters
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = AccessTokens;