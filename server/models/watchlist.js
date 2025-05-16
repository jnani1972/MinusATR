const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MyWatchlist = sequelize.define('MyWatchlist', {}, {
  timestamps: false,
});

module.exports = MyWatchlist;