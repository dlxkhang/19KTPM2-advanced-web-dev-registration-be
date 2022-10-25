const bcrypt = require('bcrypt');
const userModel = require("./user.model");

class UserService {
  async createUser({ email, fullName, password }) {
    // Check if user already exists
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return userModel.create({
      email,
      fullName,
      password: hashedPassword,
    });
  }
}

module.exports = new UserService();
