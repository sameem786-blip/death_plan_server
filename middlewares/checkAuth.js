const jwt = require("jsonwebtoken");
const db = require("../models");
const UserDB = db.Users;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = UserDB.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json("Inavlid user requesting resources");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
