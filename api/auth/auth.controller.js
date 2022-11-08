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
      const { _id, email, fullName } = req.user;
      const session = await authService.generateTokens(_id, email, fullName);
      res.json({
        _id,
        email,
        fullName,
        session,
      });
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }

  async refreshAccessToken(req, res) {
    try {
      const { refreshToken } = req.body;
      const session = await authService.refreshAccessToken(refreshToken);
      res.json({ session });
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }
}

module.exports = new AuthController();
