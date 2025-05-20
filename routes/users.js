const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const checkAuth = require("../middlewares/checkAuth");

router.post("/signup", userController.SignUp);
router.post("/login", userController.signIn);
router.put("/updateUser/:id", checkAuth, userController.updateUser);
router.get("/getUserById/:id", checkAuth, userController.getUserById);

module.exports = router;
