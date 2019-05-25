const express = require("express");
const router = express.Router();
const webpush = require("web-push");
const googleKey = require("../config/keys").GOOGLE_ACCESS_KEY;
const publicKey = require("../config/keys").PUBLIC_KEY;
const privateKey = require("../config/keys").PRIVATE_KEY;
const path = require("path");

webpush.setGCMAPIKey(process.env.GOOGLE_ACCESS_KEY || googleKey);
webpush.setVapidDetails(
  "mailto:loganawatson2@gmail.com",
  process.env.PUBLIC_KEY || publicKey,
  process.env.PRIVATE_KEY || privateKey
);

module.exports = router;
