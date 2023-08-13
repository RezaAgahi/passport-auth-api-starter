const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authControllers");
const passport = require("passport");

router.route("/register").post(register);
router.route("/login").post(passport.authenticate("local", { failureRedirect: "/login-failure" }), login);
router.route("/logout").post(logout);

module.exports = router;
