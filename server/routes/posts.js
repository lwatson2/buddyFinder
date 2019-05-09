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
router.post("/joinPost", async (req, res) => {
  const { username, system, gamertag } = req.body.user;
  const { postId } = req.body;
  const data = [username, system, gamertag];
  const update = {
    $push: { currentGroupMembers: [{ data }] }
  };
  Post.findOneAndUpdate(
    postId,
    {
      $push: { currentGroupMembers: [{ username, system, gamertag }] }
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      console.log(doc);
    }
  );
});

module.exports = router;
