const express = require("express");
const router = express.Router();
const webpush = require("web-push");
const googleKey = require("../config/keys").GOOGLE_ACCESS_KEY;
const publicKey = require("../config/keys").PUBLIC_KEY;
const privateKey = require("../config/keys").PRIVATE_KEY;
const path = require("path");

webpush.setGCMAPIKey(googleKey);
webpush.setVapidDetails(
  "mailto:loganawatson2@gmail.com",
  publicKey,
  privateKey
);

module.exports = router;
