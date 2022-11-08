const bcrypt = require("bcrypt");
const { USER_ERROR_CODE } = require("../../common/error-code");
const userModel = require("./model/user.model");

class UserService {
  async createUser(user) {
    return userModel.create(user);
  }

  async getUserByEmail(email) {
    return userModel.findOne({ email });
  }

  async getUserById(_id) {
    return userModel.findById(_id);
  }

  async verifyUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) return false;
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched)
      return user;
  }

  async verifyTokenPayload(_id) {
    const user = await this.getUserById(_id);
    if (!user) return false;
    return user;
  }

  async getProfileById(_id) {
    const user = await this.getUserById(_id);
    if (!user) throw USER_ERROR_CODE.ID_NOT_FOUND;
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };
  }
}

module.exports = new UserService();
