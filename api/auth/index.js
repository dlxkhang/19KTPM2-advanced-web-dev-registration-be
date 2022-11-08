const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const passport = require("../../auth/passport");

router.post("/register", authController.register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.login
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  authController.getProfile
);


module.exports = router;
