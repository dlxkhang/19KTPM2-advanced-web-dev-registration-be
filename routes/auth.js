const express = require("express");
const router = express.Router();
const authController = require("../api/auth/auth.controller");

router.get("/register", authController.register);

module.exports = router;
