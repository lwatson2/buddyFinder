const mongoose = require("mongoose");
const currentGroupMembersSchema = new mongoose.Schema({
  username: String,
  gamertag: String,
  system: String,
  id: String
});
const PostSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  id: String,
  title: { type: String, trim: true },
  time: { type: String, trim: true },
  groupLimit: Number,
  currentGroupMembers: {
    type: [currentGroupMembersSchema],
    default: undefined
  },
  gameName: { type: String, trim: true },
  gamertag: String,
  system: String,
  createdAt: { type: Date, default: Date.now() }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// Name, Title, Time, Member #, Game name, Gamertag, Created at.
