const Users = require('../models/users');
const bcrypt = require('bcryptjs');

class AuthService {
  static async signup(username, password, email) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      password: hashedPassword,
      email,
    });
    return user;
  }

  static async login(username, password) {
    const user = await Users.findOne({ where: { username } });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }
    return user;
  }
}

module.exports = AuthService;