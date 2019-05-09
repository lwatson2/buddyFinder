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
    currentGroupMembers: [{ username, system, gamertag }],
    gamertag,
    system
  });
  await newPost.save((err, post) => {
    if (err) {
      return res.json({ err: true });
    }
    console.log(err);
    return res.json({
      postCreated: true
    });
  });
});

router.get("/getPosts", async (req, res) => {
  const posts = await Post.find({});
  res.json({
    posts: posts
  });
});

module.exports = router;
