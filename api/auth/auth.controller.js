const authService = require("./auth.service");

class AuthController {
  async register(req, res) {
    try {
      const user = req.body;
      const newUser = await authService.register(user);
      res.json(newUser);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  }

  async login(req, res) {
    try {
      const loginDto = req.body;
      const user = await authService.login(loginDto);
      res.json(user);
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  }
}

module.exports = new AuthController();
