const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

const saltRounds = 10;

router.post("/register", (req, res) => {
  const { username, password, gamertag } = req.body;

  User.findOne({ username }).then(user => {
    if (user) {
      res.json({
        err: true,
        msg: "User already exists"
      });
    } else {
      const newuser = new User({
        username,
        password,
        gamertag
      });
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newuser.password, salt, async (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            newuser.password = hash;
            await newuser.save();
            res.json({
              isAuthenticated: true
            });
          }
        });
      });
    }
  });
});

module.exports = router;
