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
  const { gamertag, id, system } = currentGroupMembers;

  const newPost = new Post({
    username,
    time,
    groupLimit,
    gameName,
    title,
    currentGroupMembers: [{ username, system, gamertag, id }],
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
  const { parsedUser } = req.body;
  const { username, gamertag, system } = parsedUser;
  const { postId } = req.body;
  console.log(username);
  Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        currentGroupMembers: {
          username: username,
          system: system,
          gamertag: gamertag
        }
      }
    },
    (err, doc) => {
      if (err) {
        console.log(err);
      }
      res.sendStatus(200);
    }
  );
});

module.exports = router;
