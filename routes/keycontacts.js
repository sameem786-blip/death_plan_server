const express = require("express");
const router = express.Router();

const KeyContactsRoute = require("../controllers/keycontacts");
const authMiddleware = require("../middlewares/checkAuth");

router.post("/save", authMiddleware, KeyContactsRoute.saveKeyContacts);

module.exports = router;
