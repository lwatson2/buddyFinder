const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  viewed: { type: Boolean, default: false },
  postId: { type: String },
  title: { type: String }
});

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  password: { type: String },
  gamertag: { type: String },
  system: { type: String },
  messages: { type: [messageSchema], default: undefined },
  created_at: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// username, pass, gamertag
