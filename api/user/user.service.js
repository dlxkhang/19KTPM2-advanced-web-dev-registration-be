const bcrypt = require("bcrypt");
const { USER_ERROR_CODE } = require("../../common/error-code");
const userModel = require("./user.model");

class UserService {
  async createUser(user) {
    return userModel.create(user);
  }

  async getUserByEmail(email) {
    return userModel.findOne({ email });
  }
}

module.exports = new UserService();
