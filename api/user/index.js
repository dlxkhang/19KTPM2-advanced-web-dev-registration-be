const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const passport = require("../../auth/passport");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

module.exports = router;
