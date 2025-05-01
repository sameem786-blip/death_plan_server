const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/users");
const uploadRoutes = require("./routes/fileUpload");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/aws", uploadRoutes);

app.get("/", (req, res) => res.send("Death Plan APIs is running!"));

module.exports = app;
