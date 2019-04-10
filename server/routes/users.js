const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

const saltRounds = 10;
//Registers user
router.post("/register", (req, res) => {
  const { username, password, gamertag, system } = req.body;

  //Checks if Username already exists
  User.findOne({ username }).then(user => {
    if (user) {
      res.json({
        err: true,
        msg: "User already exists"
      });
    } else {
      //If username doesn't exist create a new one
      const newuser = new User({
        username,
        password,
        gamertag,
        system
      });
      // Create a salt of the password to replace the plain text password to save to the database
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

// Route for user to login
router.post("/login", (req, res) => {
  // passport uses the local strategy in the /config/passport file
  passport.authenticate("local", (err, user, info) => {
    if (user) {
      // If there's a user sign a jsonwebtoken with their creds and send that back to the client
      jwt.sign({ user }, "mysecretkey", { expiresIn: "1d" }, (err, token) => {
        res.json({
          token,
          username: user.username
        });
      });
    } else {
      res.json({
        err: info
      });
    }
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.json({
    isLoggedOut: true
  });
});

// Route to get user info for post details
router.get("/getuser/:id", async (req, res) => {
  const { username } = req.body;
  // Find user by username and send that data back to the client
  const user = await User.findOne({ username });
  res.json({
    user
  });
});

module.exports = router;
