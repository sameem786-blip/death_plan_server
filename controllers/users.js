const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dataBase = require("../models");
const UserDB = dataBase.Users;

exports.SignUp = async (req, res) => {
  try {
    const { firstName, lastName, password, avatar, email } = req.body;

    if (!firstName || !lastName || !password || !avatar || !email) {
      res.status(400).json("Missing fields");
    } else {
      const existingUser = await UserDB.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        return res.status(400).json("User with this email already exists");
      }
      const role = "user";
      const encryptedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.ENCRYPTION_SALT)
      );

      console.log("Pass", encryptedPassword);

      const newUser = await UserDB.create({
        firstName,
        lastName,
        avatar,
        email,
        role,
        encryptedPassword,
      });

      res.status(200).json({ message: "User created successfully", newUser });
    }
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json("Internal Server Error", error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Email not registered!" });
    }

    // Step 2: Compare password
    const isMatch = await bcrypt.compare(password, user.encryptedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Step 4: Generate a token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // Step 5: Return the response
    return res.status(200).json({
      message: "Sign-in successful",
    });
  } catch (error) {
    console.log("Error during signin");
    res.status(500).json("Internal Server Error", error);
  }
};
