const authService = require("./auth.service");

class AuthController {
  async register(req, res) {
    try {
      const user = req.body;
      const newUser = await authService.register(user);
      res.json(newUser);
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }

  async login(req, res) {
    try {
      const loginDto = req.body;
      const user = await authService.login(loginDto);
      res.json(user);
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }
}

module.exports = new AuthController();
