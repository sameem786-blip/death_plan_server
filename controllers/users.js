const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dataBase = require("../models");
const { createNotification } = require("./notifications");
const CryptoJS = require("crypto-js");

const UserDB = dataBase.Users;
const BeneficiaryDB = dataBase.Beneficiaries;
const SubscriptionsDB = dataBase.Subscriptions;
const PackagesDB = dataBase.Packages;
const NotificationDB = dataBase.Notifications;
const EstatesDB = dataBase.UserEstates;
const DebtsDB = dataBase.UserDebts;
const InsuranceDB = dataBase.UserInsurances;
const MedicalEmergencyeDB = dataBase.UserMedicalEmergencies;
const AssetsAndAccountsDB = dataBase.UserAssetsAndAccounts;
const ObituaryDB = dataBase.UserObituaries;
const KeyContactsDB = dataBase.UserKeyContacts;
const TransactionsDB = dataBase.TransactionHistories;
const UploadsDB = dataBase.AdditionalUploads;

const encrypt = (text) =>
  text ? CryptoJS.AES.encrypt(text, process.env.CRYPTO_SECRET).toString() : "";

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
        {
          model: EstatesDB,
        },
        {
          model: DebtsDB,
        },
        {
          model: InsuranceDB,
        },
        {
          model: MedicalEmergencyeDB,
        },
        {
          model: AssetsAndAccountsDB,
        },
        {
          model: ObituaryDB,
        },
        {
          model: KeyContactsDB,
        },
        {
          model: UploadsDB,
        },
        {
          model: SubscriptionsDB,
          include: [
            {
              model: PackagesDB,
            },
          ],
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
          model: EstatesDB,
        },
        {
          model: DebtsDB,
        },
        {
          model: InsuranceDB,
        },
        {
          model: UploadsDB,
        },
        {
          model: MedicalEmergencyeDB,
        },
        {
          model: AssetsAndAccountsDB,
        },
        {
          model: ObituaryDB,
        },
        {
          model: KeyContactsDB,
        },
        {
          model: KeyContactsDB,
        },
        {
          model: TransactionsDB,
        },
        {
          model: SubscriptionsDB,
          include: [
            {
              model: PackagesDB,
            },
          ],
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

    const user = await UserDB.findByPk(userId);

    console.log("User", req.body);

    const userToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contact: req.body.contact,
      referralSource: req.body.referralSource,
      referralSourceSpecification: req.body.referralSourceSpecification,
      // gender: req.body.gender,
    };

    if (req.body.newPassword && req.body.currentPassword) {
      const isMatch = await bcrypt.compare(
        req.body.currentPassword,
        user.encryptedPassword
      );

      if (isMatch) {
        const encryptedPassword = await bcrypt.hash(
          req.body.newPassword,
          parseInt(process.env.ENCRYPTION_SALT)
        );

        userToUpdate.encryptedPassword = encryptedPassword;
      } else {
        return res.status(400).json("Password does not match");
      }
    }

    await UserDB.update(userToUpdate, { where: { id: userId } });

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
    user.financialEmergenciesOpened = false;
    user.medicalEmergenciesOpened = false;
    user.nextStepsOpened = false;

    await user.save();

    await BeneficiaryDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await ObituaryDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await EstatesDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await DebtsDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await AssetsAndAccountsDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await InsuranceDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await KeyContactsDB.destroy({
      where: {
        userId: user.id,
      },
    });
    await UploadsDB.destroy({
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

exports.markOpened = async (req, res) => {
  try {
    const userId = req.user.id;
    const cat = req.body.category;

    if (cat == "finance") {
      await UserDB.update(
        { financialEmergenciesOpened: true },
        { where: { id: req.user.id } }
      );
    } else if (cat === "medical") {
      await UserDB.update(
        { medicalEmergenciesOpened: true },
        { where: { id: req.user.id } }
      );
    } else {
      await UserDB.update(
        { nextStepsOpened: true },
        { where: { id: req.user.id } }
      );
    }

    return res.status(200).json("marked opened");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
};

exports.fetchUsersForAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    const admin = await UserDB.findOne({
      where: {
        id: userId,
        role: "admin",
      },
    });

    console.log("User", admin);
    if (!admin) {
      return res.status(403).json("Unauthorized access.");
    }

    const allUsers = await UserDB.findAll({
      where: {
        role: "user",
      },
      attributes: [
        "role",
        "id",
        "firstName",
        "lastName",
        "createdAt",
        "contact",
        "email",
        "avatar",
        "isWillStarted",
      ],
      include: [
        {
          model: SubscriptionsDB,
          include: [
            {
              model: PackagesDB,
            },
          ],
        },
      ],
    });

    return res.status(200).json({ allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error");
  }
};

exports.addAdditionalUpload = async (req, res) => {
  try {
    const urlArray = req.body.uploadedFiles;

    console.log("Re,", req.body);

    for (const url of urlArray) {
      await UploadsDB.create({
        userId: req.user.id,
        uploadUrl: url,
      });
    }

    res.status(200).json("file saved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error.");
  }
};
