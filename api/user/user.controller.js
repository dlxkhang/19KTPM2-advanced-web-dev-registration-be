const userService = require("./user.service");

class UserController {

  async getProfile(req, res) {
    try {
      const { _id } = req.user;
      const userProfile = await userService.getProfileById(_id);
      res.json(userProfile);
    } catch (err) {
      res
        .status(err.statusCode ? err.statusCode : 500)
        .send(err.statusCode ? err.message : "Internal Server Error");
    }
  }
}

module.exports = new UserController();
