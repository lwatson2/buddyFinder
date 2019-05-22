const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const saltRounds = 10;

// Local Strategy for passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username"
    },
    (username, password, done) => {
      //Match user
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "That username is not registered."
            });
          }

          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password is incorrect." });
            }
          });
        })
        .catch(err => err);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // passport uses the local strategy in the /config/passport file

    if (user) {
      // If there's a user sign a jsonwebtoken with their creds and send that back to the client
      jwt.sign({ user }, "mysecretkey", { expiresIn: "1d" }, (err, token) => {
        res.json({
          token,
          user: {
            username: user.username,
            gamertag: user.gamertag,
            system: user.system,
            id: user._id
          }
        });
      });
    } else {
      res.json({
        err: info
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

// Route to get user info for post details
router.get("/getuser/:id", async (req, res) => {
  const { id } = req.params;
  // Find user by username and send that data back to the client
  const user = await User.findOne({ _id: id });
  res.json({
    user: {
      username: user.username,
      gamertag: user.gamertag,
      system: user.system,
      id: user._id
    }
  });
});
//Update notifications
router.post("/setMessage", async (req, res) => {
  const { postId, username, title, id } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { $push: { messages: { postId: postId, viewed: false, title: title } } },
    (err, doc) => console.log(err)
  );
  res.sendStatus(200);
});

router.get(`/getNotifications/:id`, async (req, res) => {
  const { id } = req.params;

  User.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, user) => {
    if (user.messages && user.messages.length > 0) {
      res.json({
        messages: user.messages
      });
    } else {
      res.json({
        messages: []
      });
    }
  });
});
router.post("/updateMessages", async (req, res) => {
  const { id, fullGroup } = req.body;
  const user = await User.findOne({ _id: id });
  user.messages.map(message => {
    fullGroup.map(group => {
      if (group.postId === message.postId) {
        message.viewed = true;
      }
    });
  });
  user.save();
  res.sendStatus(200);
});
router.post("/update/:id", async (req, res) => {
  const { username, gamertag, system } = req.body;
  const { id } = req.params;
  if (!username && !gamertag) {
    res.sendStatus(200);
    return User.update({ _id: id }, { $set: { system: system } });
  }
  if (!username && !system) {
    res.sendStatus(200);
    return User.update({ _id: id }, { $set: { gamertag: gamertag } });
  }
  if (!gamertag && !system) {
    res.sendStatus(200);
    return User.update({ _id: id }, { $set: { username: username } });
  }
  if (!username) {
    res.sendStatus(200);
    return User.update(
      { _id: id },
      { $set: { gamertag: gamertag, system: system } }
    );
  }
  if (!gamertag) {
    res.sendStatus(200);
    return User.update(
      { _id: id },
      { $set: { username: username, system: system } }
    );
  }
  if (!system) {
    res.sendStatus(200);
    return User.update(
      { _id: id },
      { $set: { username: username, gamertag: gamertag } }
    );
  }
  res.sendStatus(200);
  return User.update(
    { _id: id },
    { $set: { username: username, gamertag: gamertag, system: system } }
  );
});
module.exports = router;
