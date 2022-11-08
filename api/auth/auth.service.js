const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_ERROR_CODE, USER_ERROR_CODE } = require("../../common/error-code");
const userService = require("../user/user.service");
const { Config } = require("../../config");

class AuthService {
  async register(user) {
    // Check if user already exists
    const existedUser = await userService.getUserByEmail(user.email);
    if (existedUser) throw USER_ERROR_CODE.EMAIL_ALREADY_EXIST;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return userService.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  generateAccessToken(_id, email, fullName) {
    return jwt.sign({ _id, email, fullName }, Config.JWT_SECRET, {
      expiresIn: "15m",
    });
  }
}

module.exports = new AuthService();
