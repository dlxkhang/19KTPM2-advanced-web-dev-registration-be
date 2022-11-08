const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AUTH_ERROR_CODE, USER_ERROR_CODE } = require("../../common/error-code");
const userService = require("../user/user.service");
const { Config } = require("../../config");
const userTokenModel = require("../user/model/user-token.model");

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

  async generateTokens(_id, email, fullName) {
    const accessToken = jwt.sign({ _id, email, fullName }, Config.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ _id, email, fullName }, Config.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Delete the refresh token of the previous login
    const userToken = await userTokenModel.findOne({ userId: _id });
    if (userToken) await userToken.remove();
    await userTokenModel.create({ userId: _id, token: refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken) {
    const userToken = await userTokenModel.findOne({ token: refreshToken });
    if (!userToken) throw AUTH_ERROR_CODE.INVALID_REFRESH_TOKEN;

    try {
      const { _id, email, fullName } = jwt.verify(
        refreshToken,
        Config.JWT_SECRET
      );
    } catch (err) {
      throw AUTH_ERROR_CODE.INVALID_REFRESH_TOKEN;
    }
    
    const newAccessToken = jwt.sign(
      { _id, email, fullName },
      Config.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return {
      accessToken: newAccessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthService();
