const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const { AUTH_ERROR_CODE, USER_ERROR_CODE } = require("../../common/error-code");
const userService = require("../user/user.service");

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

  async login(loginDto) {
    const user = await userService.getUserByEmail(loginDto.email);
    if (!user) throw USER_ERROR_CODE.EMAIL_NOT_FOUND;
    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatch) throw AUTH_ERROR_CODE.WRONG_PROVIDED_PASSWORD;

    const token = uuidv4();
    return {
      token: token,
      fullName: user.fullName,
    };
  }
}

module.exports = new AuthService();
