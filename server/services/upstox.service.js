const Configurations = require('../models/configurations');
const AccessTokens = require('../models/accessTokens');
const Users = require('../models/users');
const axios = require('axios');
require('dotenv').config();

class UpstoxService {
  static async getAccessToken(data) {
    const { username } = data;
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const token = await AccessTokens.findOne({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
    });
    if (!token) {
      return { message: 'No token found' };
    }

    // Validate token with Upstox API
    try {
      await axios.get(`${process.env.UPSTOX_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          Accept: 'application/json',
        },
      });
      return { access_token: token.access_token };
    } catch (err) {
      return { message: 'Invalid token' };
    }
  }

  static async generateAccessToken(data) {
    const { code, username } = data;
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }

    const url = `${process.env.UPSTOX_BASE_URL}/login/authorization/token`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    };
    const payload = {
      client_id: process.env.UPSTOX_API_KEY,
      client_secret: process.env.UPSTOX_API_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.UPSTOX_REDIRECT_URI,
    };


    const response = await axios.post(url, new URLSearchParams(payload).toString(), { headers });
    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in || 86400; // Default to 24 hours if not provided
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    // Check for existing token and update instead of creating a new one
    const existingToken = await AccessTokens.findOne({ where: { user_id: user.id } });
    if (existingToken) {
      await existingToken.update({
        access_token: accessToken,
        expires_at: expiresAt,
        updated_at: new Date(),
      });
    } else {
      await AccessTokens.create({
        user_id: user.id,
        access_token: accessToken,
        expires_at: expiresAt,
      });
    }

    return { access_token: accessToken };
  }

  static async fullMarketQuote(req) {
    return { message: 'Full market quote logic to be implemented' };
  }

  static async getOrderBook(req) {
    return { message: 'Order book logic to be implemented' };
  }

  static async ltpQuotes(data) {
    return { message: 'LTP quotes logic to be implemented' };
  }

  static async ohlcQuote(data) {
    return { message: 'OHLC quote logic to be implemented' };
  }

  static async placeOrder(data) {
    return { message: 'Place order logic to be implemented' };
  }

  static async cancelOrder(data) {
    return { message: 'Cancel order logic to be implemented' };
  }

  static async getTrades(req) {
    return { message: 'Get trades logic to be implemented' };
  }

  static async getActiveTrades(req) {
    return { message: 'Get active trades logic to be implemented' };
  }

  static async closeTrade(data) {
    return { message: 'Close trade logic to be implemented' };
  }

  static async placeSingleOrder(data) {
    return { message: 'Place single order logic to be implemented' };
  }

  static async getSymbols(req) {
    return { message: 'Get symbols logic to be implemented' };
  }
}

module.exports = UpstoxService;