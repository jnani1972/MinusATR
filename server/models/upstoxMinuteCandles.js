const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UpstoxMinuteCandles = sequelize.define('UpstoxMinuteCandles', {}, {
  timestamps: false,
});

module.exports = UpstoxMinuteCandles;