const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const checkAuth = require("../middlewares/checkAuth");

router.post("/signup", userController.SignUp);
router.post("/login", userController.signIn);
router.put("/updateUser/:id", checkAuth, userController.updateUser);
router.get("/getUserById/:id", checkAuth, userController.getUserById);
router.put("/markStarted", checkAuth, userController.markWillStarted);
router.put("/markOpened", checkAuth, userController.markOpened);
router.delete("/deleteWill", checkAuth, userController.deleteWill);
router.get("/fetchAllUsers", checkAuth, userController.fetchUsersForAdmin);
router.delete("/document", checkAuth, userController.deleteDocument);
router.post("/sendOTP", userController.sendOTP);
router.post("/matchOTP", userController.matchOTP);
router.post("/reset-password", userController.setNewPassword);
router.post(
  "/addAdditionalUpload",
  checkAuth,
  userController.addAdditionalUpload
);

module.exports = router;
