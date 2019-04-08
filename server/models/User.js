const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  password: { type: String },
  gamertag: { type: String },
  created_at: { type: Date, default: Date.now() }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// username, pass, gamertag
