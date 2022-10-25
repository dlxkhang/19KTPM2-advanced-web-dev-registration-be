const userModel = require("./user.model");

class UserService {
  async createUser({ email, fullName, password }) {
    // Check if user already exists
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) throw new Error("User already exists");

    return userModel.create({
      email,
      fullName,
      password,
    });
  }
}

module.exports = new UserService();
