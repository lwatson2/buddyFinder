const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { verifyToken } = require("../config/jwt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

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
            system: user.system
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
  const { username } = req.body;
  // Find user by username and send that data back to the client
  const user = await User.findOne({ username });
  res.json({
    user
  });
});
//Update notifications
router.post("/setMessage", async (req, res) => {
  const { postId, username, title } = req.body;

  console.log(req.body.title);
  User.findOneAndUpdate(
    { username: username },
    { $push: { messages: { postId: postId, viewed: false, title: title } } },
    (err, doc) => console.log(doc)
  );
}); /*   await User.findOneAndUpdate(
    { username: username },
    { $push: { notifications: { postId: postId, viewed: false } } },
    (err, doc) => {
      if (err) {
      }
      res.sendStatus(200);
    }
  ); */ /* else if (messagesArray.length <= 0) {
      console.log(messagesArray.length);
      messagesArray.push({ postId, viewed: false });
      console.log("boo");
      res.sendStatus(200);
      user.messages = messagesArray;
      await user.save();
    } */
/* if (err) {
    }
    if (user.messages && user.messages.length > 0) {
      user.messages.map(message => {
        if (message.postId != postId) {
          console.log("hi");
          user.messages.push(...message, {
            postId,
            viewed: false
          });
        }
      });
      res.sendStatus(200);
      await user.save();
    } */

router.get(`/getNotifications/:username`, async (req, res) => {
  const { username } = req.params;

  User.findOne({ username }, (err, user) => {
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
  const { username, fullGroup } = req.body;
  console.log(fullGroup);
  const user = await User.findOne({ username });
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
module.exports = router;
