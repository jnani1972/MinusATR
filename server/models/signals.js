const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Signals = sequelize.define('Signals', {}, {
  timestamps: false,
});

module.exports = Signals;