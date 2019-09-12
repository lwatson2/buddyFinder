const express = require("express");
const router = express.Router();
const webpush = require("web-push");

const path = require("path");

webpush.setGCMAPIKey(process.env.GOOGLE_ACCESS_KEY);
webpush.setVapidDetails(
  "mailto:loganawatson2@gmail.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

module.exports = router;
