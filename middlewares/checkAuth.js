const jwt = require("jsonwebtoken");
const db = require("../models");
const UserDB = db.Users;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserDB.findOne({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json("Invalid user requesting resources");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
