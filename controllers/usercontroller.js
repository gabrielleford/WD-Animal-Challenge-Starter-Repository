const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/create", async (req, res) => {
  let { username, password } = req.body.user;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, 13),
    });

    res.status(201).json({
      message: "User successfully created",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create user",
    });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body.user;
  try {
    const loginUser = await User.findOne({
      where: {
        username: username,
      },
    });
    if (loginUser) {
      res.status(200).json({
        user: loginUser,
        message: "User successfully logged in",
      });
    } else {
      res.status(401).json({
        message: "Login failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to log user in",
    });
  }
});

module.exports = router;
