const express = require("express");
const router = express.Router();

const NotificationController = require("../controllers/notifications");
const authMiddleware = require("../middlewares/checkAuth");

router.get("/", authMiddleware, NotificationController.getAllUserNotifications);
router.put(
  "/markRead/:notificationId",
  authMiddleware,
  NotificationController.markRead
);

module.exports = router;
