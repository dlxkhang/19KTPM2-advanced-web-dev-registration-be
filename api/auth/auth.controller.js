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
      res.json({
        _id,
        email,
        fullName,
        accessToken: authService.generateAccessToken(_id, email, fullName),
      });
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }

  async getProfile(req, res) {
    try {
      const { _id } = req.user;
      const userProfile = await authService.getProfileById(_id);
      res.json(userProfile);
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }
}

module.exports = new AuthController();
