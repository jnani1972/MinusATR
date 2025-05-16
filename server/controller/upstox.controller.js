const upstoxService = require('../services/upstox.service');
const logger = require('../config/logging');

const upstoxController = {
  getAccessToken: async (req, res) => {
    try {
      const username = req.headers['x-username'] || req.query.username;
      if (!username) {
        throw new Error('Username not provided');
      }
      const result = await upstoxService.getAccessToken({ username });
      logger.info('Access token retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getAccessToken: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const { code } = req.body;
      const username = req.headers['x-username'] || req.body.username;
      if (!username) {
        throw new Error('Username not provided');
      }
      const result = await upstoxService.generateAccessToken({ code, username });
      logger.info('Access token generated successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in generateAccessToken: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  fullMarketQuote: async (req, res) => {
    try {
      const result = await upstoxService.fullMarketQuote(req);
      logger.info('Full market quote retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in fullMarketQuote: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getOrderBook: async (req, res) => {
    try {
      const result = await upstoxService.getOrderBook(req);
      logger.info('Order book retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getOrderBook: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  ltpQuotes: async (req, res) => {
    try {
      const result = await upstoxService.ltpQuotes(req.body);
      logger.info('LTP quotes retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in ltpQuotes: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  ohlcQuote: async (req, res) => {
    try {
      const result = await upstoxService.ohlcQuote(req.body);
      logger.info('OHLC quote retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in ohlcQuote: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  placeOrder: async (req, res) => {
    try {
      const result = await upstoxService.placeOrder(req.body);
      logger.info('Order placed successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in placeOrder: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  cancelOrder: async (req, res) => {
    try {
      const result = await upstoxService.cancelOrder(req.body);
      logger.info('Order cancelled successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in cancelOrder: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getTrades: async (req, res) => {
    try {
      const result = await upstoxService.getTrades(req);
      logger.info('Today\'s trades retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getTrades: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getActiveTrades: async (req, res) => {
    try {
      const result = await upstoxService.getActiveTrades(req);
      logger.info('Active trades retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getActiveTrades: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  closeTrade: async (req, res) => {
    try {
      const result = await upstoxService.closeTrade(req.body);
      logger.info('Trade closed successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in closeTrade: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  placeSingleOrder: async (req, res) => {
    try {
      const result = await upstoxService.placeSingleOrder(req.body);
      logger.info('Single order placed successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in placeSingleOrder: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getSymbols: async (req, res) => {
    try {
      const result = await upstoxService.getSymbols(req);
      logger.info('Symbols retrieved successfully');
      res.status(200).json(result);
    } catch (err) {
      logger.error('Error in getSymbols: ' + err.message);
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = upstoxController;