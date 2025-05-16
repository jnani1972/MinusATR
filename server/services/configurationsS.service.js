const Configurations = require('../models/configurations');

const camelToSnake = (str) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const transformKeys = (obj) => {
  const transformed = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = camelToSnake(key);
    transformed[snakeKey] = value;
  }
  return transformed;
};

const sanitizeConfigData = (configData) => {
  const sanitized = { ...configData };
  if (!sanitized.total_orders_per_day) sanitized.total_orders_per_day = 0;
  if (!sanitized.total_trading_amount) sanitized.total_trading_amount = 10;
  if (!sanitized.per_script_trading_amount) sanitized.per_script_trading_amount = 10;
  if (!sanitized.brick_size) sanitized.brick_size = '0.20';
  return sanitized;
};

class ConfigurationsService {
  static async getConfigurations() {
    const config = await Configurations.findOne({ where: { id: 'config' } });
    if (!config) return {
      totalTradingAmount: 10,
      perScriptTradingAmount: 10,
      totalOrdersPerDay: 0,
      brickSize: '0.20',
    };
    return config.toJSON();
  }

  static async updateConfigurations(configData, instrumentData) {
    const transformedConfig = transformKeys(configData);
    const sanitizedConfig = sanitizeConfigData(transformedConfig);
    sanitizedConfig.instrument_data = instrumentData || [];
    const [updated] = await Configurations.upsert({ id: 'config', ...sanitizedConfig });
    return sanitizedConfig;
  }
}

module.exports = ConfigurationsService;