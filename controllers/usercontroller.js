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

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({
      message: "User successfully created",
      user: user,
      sessionToken: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
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
    let passwordComparison = await bcrypt.compare(password, loginUser.password);
    if (passwordComparison) {
      let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!",
        sessionToken: token,
      });
    } else {
      res.status(401).json({
        message: "Login failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to log user in",
    });
  }
});

module.exports = router;
