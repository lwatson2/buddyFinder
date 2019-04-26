const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  title: { type: String, trim: true },
  time: { type: String, trim: true },
  groupLimit: Number,
  currentGroupMembers: Number,
  gameName: { type: String, trim: true },
  gamertag: String,
  createdAt: { type: Date, default: Date.now() }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// Name, Title, Time, Member #, Game name, Gamertag, Created at.
