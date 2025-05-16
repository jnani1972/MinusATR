const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Configurations = sequelize.define('Configurations', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  total_trading_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
  },
  per_script_trading_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
  },
  total_orders_per_day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  trading_start_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '09:15',
  },
  trading_end_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '15:30',
  },
  buy_start_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '09:15',
  },
  buy_end_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '15:30',
  },
  sell_start_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '09:15',
  },
  sell_end_time: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '15:30',
  },
  re_entry: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'No',
  },
  order_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'LIMIT',
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'D',
  },
  validity: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'DAY',
  },
  brick_size: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '0.20',
  },
  timeframe: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '1minute',
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'BUY',
  },
  instrument_key: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NSE_EQ',
  },
  is_amo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  holidays: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  look_back_period: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  instrument_data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Configurations;