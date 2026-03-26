const express = require("express");
const { Login, Logout, Registers, GetOtherUser } = require("../controllers/userControllers.js");
const isAuth = require("../middleware/isAuth.js");
const router = express.Router();

router.route("/login").post(Login);
router.route("/logout").post(Logout);
router.route("/register").post(Registers);
router.route("/").get(isAuth,GetOtherUser);

module.exports = router;