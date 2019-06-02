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
  if (!system.includes("Playstation", "Xbox", "Switch", "Steam")) {
    return res.json({
      err: true,
      errorMessage: "Please only use prompted systems."
    });
  }
  if (groupLimit >= 10) {
    return res.json({
      err: true,
      errorMessage: "Please select number from prompted list"
    });
  }

  const newPost = new Post({
    username,
    time,
    groupLimit,
    gameName,
    title,
    id,
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
  const { username, gamertag, system, id } = parsedUser;
  const { postId } = req.body;
  Post.findOneAndUpdate(
    { _id: postId },
    {
      $push: {
        currentGroupMembers: {
          username: username,
          system: system,
          gamertag: gamertag,
          id: id
        }
      }
    },
    (err, doc) => {
      if (err) {
        params;
        console.log(err);
      }
      res.sendStatus(200);
    }
  );
});
router.get("/fetchUserPosts/:id", async (req, res) => {
  const { id } = req.params;
  const userPosts = await Post.find({ "currentGroupMembers.id": { $all: id } });
  res.json({
    posts: userPosts
  });
});

module.exports = router;
