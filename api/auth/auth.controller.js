const authService = require("./auth.service");

class AuthController {
  async register(req, res) {
    try {
      const user = req.body;
      const newUser = await authService.register(user);
      res.json(newUser);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = new AuthController();
