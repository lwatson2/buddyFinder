const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post("/newpost", async (req, res) => {
  const {
    username,
    time,
    groupLimit,
    gameName,
    title,
    currentGroupMembers
  } = req.body;
  console.log(req.body);
  const user = await User.findOne({ username: username });
  const { gamertag, system } = user;
  const rando = "ChildishBambino";
  const newPost = new Post({
    username,
    time,
    groupLimit,
    gameName,
    title,
    currentGroupMembers: [username, rando],
    gamertag,
    system
  });
  /*  await newPost.save((err, post) => {
    if (err) {
      return res, json({ err: true });
    }
    return res.json({
      postCreated: true
    });
  }); */

  console.log(user);
  res.json({
    err: true
  });
});

module.exports = router;
