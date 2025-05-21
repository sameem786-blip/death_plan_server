const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataBase = require("../models");
const { createNotification } = require("./notifications");

const UserDB = dataBase.Users;
const BeneficiaryDB = dataBase.Beneficiaries;
const SubscriptionsDB = dataBase.Subscriptions;
const NotificationDB = dataBase.Notifications;
const Land_RealEstate_EstateDB = dataBase.Land_RealEstate_Estates;
const VehicleRealEstateEstateDB = dataBase.Vehicle_RealEstate_Estates;

exports.SignUp = async (req, res) => {
  try {
    const { firstName, lastName, password, avatar, email } = req.body;

    if (!password || !email) {
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
        email,
        role,
        encryptedPassword,
      });

      await createNotification(
        newUser.id,
        "New User Sign Up",
        "You account was created successfully."
      );

      res.status(200).json({ message: "User created successfully", newUser });
    }
  } catch (error) {
    console.log("Error during signup", error);
    return res.status(500).json("Internal Server Error", error);
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

    const user = await UserDB.findOne({
      where: { email },
      include: [
        {
          model: BeneficiaryDB,
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "Email not registered!" });
    }

    const isMatch = await bcrypt.compare(password, user.encryptedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    const { encryptedPassword, ...userData } = user.toJSON();

    return res.status(200).json({
      message: "Sign-in successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.log("Error during signin", error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserDB.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: BeneficiaryDB,
        },
        {
          model: SubscriptionsDB,
        },
      ],
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log("User", req.body);

    await UserDB.update(req.body, { where: { id: userId } });

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.deleteWill = async (req, res) => {
  try {
    const user = await UserDB.findOne({
      where: {
        id: req.user.id,
      },
    });

    user.isWillComplete = false;
    user.isWillStarted = false;

    await user.save();

    await BeneficiaryDB.destroy({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json("Will destroyed");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.markWillStarted = async (req, res) => {
  try {
    await UserDB.update(
      { isWillStarted: true },
      { where: { id: req.user.id } }
    );

    return res.status(200).json("User's will is now marked as started.");
  } catch (error) {
    console.log("Error during signin", error);
    return res.status(500).json("Internal Server Error");
  }
};
exports.markWillComplete = async (req, res) => {
  try {
    await UserDB.update(
      { isWillComplete: true },
      { where: { id: req.user.id } }
    );

    return res.status(200).json("User's will is now complete.");
  } catch (err) {
    console.log("Error during signin", error);
    return res.status(500).json("Internal Server Error");
  }
};
