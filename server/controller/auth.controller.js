const authService = require('../services/auth.service');
const logger = require('../config/logging');

const authController = {
  signup: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const result = await authService.signup(username, password, email);
      logger.info('User signed up successfully', { username });
      res.status(201).json({ message: 'User created successfully', user: result });
    } catch (err) {
      logger.error('Error in signup: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await authService.login(username, password);
      logger.info('User logged in successfully', { username });
      res.status(200).json({ username: result.username });
    } catch (err) {
      logger.error('Error in login: ' + err.message);
      res.status(401).json({ error: err.message });
    }
  },
};

module.exports = authController;