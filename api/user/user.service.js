const bcrypt = require("bcrypt");
const { USER_ERROR_CODE } = require("../../common/error-code");
const userModel = require("./user.model");

class UserService {
  async createUser(user) {
    return userModel.create(user);
  }

  async getUserByEmail(email) {
    const user = await userModel.findOne({ email });
    if (!user) throw USER_ERROR_CODE.EMAIL_NOT_FOUND;
    return user;
  }
}

module.exports = new UserService();
