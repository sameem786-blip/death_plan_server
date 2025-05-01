const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataBase = require("../models");
const UserDB = dataBase.Users;
const NotificationDB = dataBase.Notifications;

exports.getAllUserNotifications = async (req, res) => {
  try {
    const notifications = await NotificationDB.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.log("Error fetching Notifications", error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.markRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    await NotificationDB.update(
      { isRead: true },
      { where: { id: notificationId } }
    );

    return res.status(200).json("Marked read");
  } catch (error) {
    console.log("Error marking Notifications", error);
    return res.status(500).json("Internal Server Error");
  }
};
