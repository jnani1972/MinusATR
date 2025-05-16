const configurationsService = require('../services/configurationsService');
const logger = require('../config/logging');

const configurationsController = {
  getConfigurations: async (req, res) => {
    try {
      const result = await configurationsService.getConfigurations();
      logger.info('Configurations retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getConfigurations: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  updateConfigurations: async (req, res) => {
    try {
      const { configData, instrumentData } = req.body;
      const result = await configurationsService.updateConfigurations(configData, instrumentData);
      logger.info('Configurations updated successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in updateConfigurations: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = configurationsController;