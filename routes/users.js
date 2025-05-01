const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");

router.post("/signup", userController.SignUp);
router.post("/login", userController.signIn);

module.exports = router;
