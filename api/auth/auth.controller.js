const authService = require("./auth.service");

class AuthController {
  async register(req, res) {
    const newUser = await authService.register('khang', 'sad', 'asda');
    res.json(newUser);
  }
}

module.exports = new AuthController();
